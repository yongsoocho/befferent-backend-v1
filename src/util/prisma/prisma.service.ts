import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ENUM_PROVIDER, userResponse } from "../../type/user.type";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async findUserByUserId(user_id: number) {
    return await this.user.findUnique({
      where: {
        user_id,
      },
    });
  }

  async findUserByEmailAndProvider(email: string, provider: ENUM_PROVIDER) {
    return await this.user.findUnique({
      where: {
        provider_email: {
          email,
          provider,
        },
      },
      select: userResponse,
    });
  }
}
