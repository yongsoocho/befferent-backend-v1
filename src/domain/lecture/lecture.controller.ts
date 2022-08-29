import { Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { LectureService } from "./lecture.service";

@Controller("lecture")
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get()
  getLectureLists() {
    return this.lectureService.getLectureLists();
  }

  @Get("/:lectureId")
  getLectureInfo(@Param("lectureId", ParseIntPipe) lecture_id: number) {
    return this.lectureService.getLectureInfo(lecture_id);
  }

  @Post()
  addLectureByManager() {
    return;
  }
}
