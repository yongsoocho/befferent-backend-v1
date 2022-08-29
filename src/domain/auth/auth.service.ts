import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Cache } from "cache-manager";
import { PrismaService } from "../../util/prisma/prisma.service";
import {
  ENUM_PROVIDER,
  IKakaoInfo,
  INaverInfo,
  userResponse,
} from "../../type/user.type";
import { HttpService } from "@nestjs/axios";
import { catchError, lastValueFrom, map } from "rxjs";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private redis: Cache,
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async localUserJoin(payload, session) {
    const exUser = await this.prisma.findUserByEmailAndProvider(
      payload.email,
      ENUM_PROVIDER.LOCAL,
    );
    if (exUser) {
      throw new HttpException("user already joined", HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(payload.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: payload.email,
        password: hash,
        provider: ENUM_PROVIDER.LOCAL,
      },
      select: userResponse,
    });
    session.user = newUser;
    return { ...newUser, verified: true };
  }

  async naverUserJoin(payload, session) {
    const data: INaverInfo = await lastValueFrom(
      this.http
        .get(`https://openapi.naver.com/v1/nid/me`, {
          headers: {
            Authorization: `Bearer ${payload.access_token}`,
          },
        })
        .pipe(
          map((res) => res.data),
          catchError(() => {
            throw new HttpException("naver join error", HttpStatus.BAD_REQUEST);
          }),
        ),
    );
    const newUser = await this.prisma.user.create({
      data: {
        email: data?.response?.email,
        provider: ENUM_PROVIDER.NAVER,
        sns_id: data?.response?.id,
      },
      select: userResponse,
    });
    session.user = newUser;
    return { ...newUser, verified: true };
  }

  async kakaoUserJoin(payload, session) {
    const data: IKakaoInfo = await lastValueFrom(
      this.http
        .get(`https://kapi.kakao.com/v2/user/me`, {
          headers: {
            Authorization: `Bearer ${payload.access_token}`,
          },
        })
        .pipe(
          map((res) => res.data),
          catchError(() => {
            throw new HttpException("kakao join error", HttpStatus.BAD_REQUEST);
          }),
        ),
    );
    const newUser = await this.prisma.user.create({
      data: {
        email: data?.kakao_account?.email,
        provider: ENUM_PROVIDER.KAKAO,
        sns_id: data?.id.toString(),
      },
      select: userResponse,
    });
    session.user = newUser;
    return { ...newUser, verified: true };
  }

  async localUserLogin(payload, session) {
    if (session?.user && payload?.email === session?.user?.email) {
      return session.user;
    }
    const user = await this.prisma.user.findUnique({
      where: {
        provider_email: {
          provider: ENUM_PROVIDER.LOCAL,
          email: payload.email,
        },
      },
    });
    if (!user) {
      throw new HttpException("local user not found", HttpStatus.NOT_FOUND);
    }
    const result = await bcrypt.compare(payload.password, user.password);
    if (!result) {
      throw new HttpException(
        "local user invalid password",
        HttpStatus.BAD_REQUEST,
      );
    }
    delete user.sns_id;
    delete user.password;
    session.user = user;
    return user;
  }

  async naverUserLogin(payload, session) {
    if (session?.user) {
      return session.user;
    }
    const data: INaverInfo = await lastValueFrom(
      this.http
        .get(`https://openapi.naver.com/v1/nid/me`, {
          headers: {
            Authorization: `Bearer ${payload.access_token}`,
          },
        })
        .pipe(
          map((res) => res.data),
          catchError(() => {
            throw new HttpException(
              "naver login error",
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
    );
    const user = await this.prisma.findUserByEmailAndProvider(
      data?.response?.email,
      ENUM_PROVIDER.NAVER,
    );
    if (!user) {
      return this.naverUserJoin(
        { access_token: payload.access_token },
        session,
      );
    }
    session.user = user;
    return user;
  }

  async kakaoUserLogin(payload, session) {
    if (session?.user) {
      return session.user;
    }
    const data: IKakaoInfo = await lastValueFrom(
      this.http
        .get(`https://kapi.kakao.com/v2/user/me`, {
          headers: {
            Authorization: `Bearer ${payload.access_token}`,
          },
        })
        .pipe(
          map((res) => res.data),
          catchError(() => {
            throw new HttpException(
              "kakao login error",
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
    );
    const user = await this.prisma.findUserByEmailAndProvider(
      data?.kakao_account?.email,
      ENUM_PROVIDER.KAKAO,
    );
    if (!user) {
      return this.kakaoUserJoin(
        { access_token: payload.access_token },
        session,
      );
    }
    session.user = user;
    return user;
  }

  async userLogout(session) {
    session.destroy();
    return true;
  }

  async managerLogin(payload, session) {
    if (session?.user && session?.user?.adminVerified) {
      return session.user;
    }
    const admin = await this.prisma.user.findUnique({
      where: {
        provider_email: {
          provider: ENUM_PROVIDER.LOCAL,
          email: payload.email,
        },
      },
    });
    const result = await bcrypt.compare(payload.password, admin.password);
    if (!result) {
      throw new HttpException("admin only", HttpStatus.FORBIDDEN);
    }
    delete admin.password;
    session.user = { ...admin, verified: true, adminVerified: true };
    return { ...admin, verified: true, adminVerified: true };
  }

  async sessionLogin(session) {
    if (!session?.user) {
      // return false;
      return "로그인해라";
    }
    return session?.user;
  }
}
