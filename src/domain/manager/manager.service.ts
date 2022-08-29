import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../util/prisma/prisma.service";
import { ENUM_USERROLE } from "../../type/manager.type";
import { ENUM_PROVIDER } from "../../type/user.type";
import * as bcrypt from "bcrypt";

@Injectable()
export class ManagerService {
  constructor(private readonly prisma: PrismaService) {}

  async checkAdminRoleById(user_id: number) {
    const manager = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    return manager?.role === ENUM_USERROLE.ADMIN;
  }

  async checkAdminRoleByEmail(email: string) {
    const manager = await this.prisma.user.findUnique({
      where: {
        provider_email: {
          provider: ENUM_PROVIDER.LOCAL,
          email,
        },
      },
    });
    return manager?.role === ENUM_USERROLE.ADMIN;
  }

  async getManagerLists() {
    return this.prisma.user.findMany({
      where: {
        role: ENUM_USERROLE.ADMIN,
      },
    });
  }

  async createAdminAccount(payload) {
    const hash = await bcrypt.hash(payload.password, 10);
    const newAdmin = await this.prisma.user.create({
      data: {
        email: payload.email,
        password: hash,
        provider: ENUM_PROVIDER.LOCAL,
        role: ENUM_USERROLE.ADMIN,
      },
    });
    return { ...newAdmin, verified: true, adminVerified: true };
  }

  async qualifyAdminRole(user_id: number, session) {
    const patchUser = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        role: ENUM_USERROLE.ADMIN,
      },
    });
    session.user = { ...patchUser, verified: true, adminVerified: true };
    return { ...patchUser, verified: true, adminVerified: true };
  }

  async getUserLists(page = 1) {
    const [users, count] = await Promise.all([
      this.prisma.user.findMany({
        take: 20,
        skip: 20 * (page - 1),
        orderBy: {
          user_id: "desc",
        },
      }),
      this.prisma.user.count(),
    ]);
    return {
      users,
      lastPage: Math.ceil(count / 20),
      currentPage: page,
    };
  }

  async createLecture(payload) {
    return;
  }

  async createCoupon(payload) {
    return;
  }
}
