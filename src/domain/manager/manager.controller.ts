import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { CreateAdminDto } from "./manager.dto";
import { AdminGuard } from "../../common/guards/admin.guard";

@Controller("manager")
@UseGuards(AdminGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  // 관리자 목록 불러오기
  @Get()
  getManagerLists() {
    return this.managerService.getManagerLists();
  }

  // 관리자 계정 생성
  @Post()
  createAdminAccount(@Body() body: CreateAdminDto) {
    return this.managerService.createAdminAccount(body);
  }

  // 관리자 권한 부여 (로컬계정만 가능)
  @Patch()
  qualifyAdminRole(
    @Body("userId", ParseIntPipe) user_id: number,
    @Session() session,
  ) {
    return this.managerService.qualifyAdminRole(user_id, session);
  }

  // 유저 목록 불러오기 - 페이지네이션
  @Get("user")
  getUserLists(@Query("page", ParseIntPipe) page: number) {
    return this.managerService.getUserLists(page);
  }

  // 강의 생성
  @Post("lecture")
  createLecture(@Body() body) {
    return this.managerService.createLecture(body);
  }

  // 쿠폰 생성
  createCoupon(@Body() body) {
    return this.managerService.createCoupon(body);
  }
}
