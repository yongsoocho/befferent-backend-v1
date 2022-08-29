import { NestFactory } from "@nestjs/core";
import { AppModule } from "./domain/app.module";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import { sessionOpt } from "./util/redis";
import helmet from "helmet";
import * as morgan from "morgan";
import * as csurf from "csurf";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  app.use(helmet());
  app.use(cookieParser());
  app.use(session(sessionOpt));
  app.use(morgan("dev"));
  // app.use(csurf());
  await app.listen(process.env.PORT);
}
bootstrap();
