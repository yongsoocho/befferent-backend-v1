import { Controller, Get, Req, Session } from "@nestjs/common";
import { AppService } from "./app.service";
import { s3 } from "../util/aws/s3";
import { response } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get("test")
  getTest(): Promise<string> {
    return this.appService.getTest();
  }

  @Get("delete")
  deleteCache() {
    return this.appService.deleteCache();
  }

  @Get("htmll")
  getHtml(): Promise<string> {
    return this.appService.getHtml();
  }

  @Get("session")
  getSession(@Session() session, @Req() req) {
    req.session.hey = {
      haha: "test",
      hi: "yews!!!",
    };
    return JSON.stringify(session);
  }

  @Get("session2")
  getSession2(@Session() session) {
    console.log(session.test);
    if (session.test) {
      console.log("if1");
    }
    if (!session.test) {
      console.log("if2");
    }
    return JSON.stringify(session);
  }

  @Get("session3")
  getSession3() {
    return this.appService.getSession3();
  }

  @Get("logout")
  logout(@Session() session) {
    return session.destroy();
  }

  @Get("video")
  async getVideoTest() {
    const data = await s3.getObject({
      Bucket: "yongsoo-study",
      Key: "grapefruit-slice-332-332.jpeg",
    });
    return data.createReadStream().on("open", (e) => console.log(e));
  }
}
