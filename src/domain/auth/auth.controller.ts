import { Body, Controller, Get, Post, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  KaKaoAccessTokenDto,
  LocalJoinDto,
  LocalLoginDto,
  NaverAccessTokenDto,
} from "./auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 로컬 회원가입
  @Post("local-join")
  localUserJoin(@Body() body: LocalJoinDto, @Session() session) {
    return this.authService.localUserJoin(body, session);
  }

  // 네이버 회원가입
  // @Post("naver-join")
  // naverUserJoin(@Body() body, @Session() session) {
  //   return this.authService.naverUserJoin(body, session);
  // }

  // 카카오 회원가입
  // @Post("kakao-join")
  // kakaoUserJoin(@Body() body: KaKaoAccessTokenDto, @Session() session) {
  //   return this.authService.kakaoUserJoin(body, session);
  // }

  // 로컬 최초 로그인
  @Post("local-login")
  localUserLogin(@Body() body: LocalLoginDto, @Session() session) {
    return this.authService.localUserLogin(body, session);
  }

  // 네이버 최초 로그인
  @Post("naver-login")
  naverUserLogin(@Body() body: NaverAccessTokenDto, @Session() session) {
    return this.authService.naverUserLogin(body, session);
  }

  // 카카오 최초 로그인
  @Post("kakao-login")
  kakaoUserLogin(@Body() body: KaKaoAccessTokenDto, @Session() session) {
    return this.authService.kakaoUserLogin(body, session);
  }

  // 로그아웃
  @Get("logout")
  userLogout(@Session() session) {
    return this.authService.userLogout(session);
  }

  // 매니저 로그인
  @Post("manager-login")
  managerLogin(@Body() body: LocalLoginDto, @Session() session) {
    return this.authService.managerLogin(body, session);
  }

  // 로그인 갱신
  @Get()
  sessionLogin(@Session() session) {
    console.log(session);
    return this.authService.sessionLogin(session);
  }
}
