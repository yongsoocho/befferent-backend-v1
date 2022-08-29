import { Controller, Get, Patch, Session } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("my-page")
  getMyPage(@Session() session) {
    return this.userService.getMyPage(session);
  }

  @Patch("my-page")
  patchUserProfile() {
    return;
  }

  @Get("my-class")
  getMyClass() {
    return;
  }
}
