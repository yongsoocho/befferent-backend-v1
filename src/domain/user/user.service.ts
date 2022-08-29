import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../util/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyPage(session) {
    // return await this.prisma.user.findUnique({});
    return;
  }
}
