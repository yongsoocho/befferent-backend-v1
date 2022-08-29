import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "../util/prisma/prisma.module";
import * as redisStore from "cache-manager-redis-store";
import { ConfigModule } from "@nestjs/config";
import { PaymentModule } from "./payment/payment.module";
import { ManagerModule } from "./manager/manager.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    PaymentModule,
    ManagerModule,
    PrismaModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_EP,
      auth_pass: process.env.REDIS_PW,
      port: 19124,
      ttl: 60,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
