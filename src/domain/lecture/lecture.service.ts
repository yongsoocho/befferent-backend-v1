import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../util/prisma/prisma.service";
import { responseLecture } from "../../type/lecture.type";

@Injectable()
export class LectureService {
  constructor(private readonly prisma: PrismaService) {}

  async getLectureLists() {
    return;
  }

  async getLectureInfo(payload) {
    return;
  }
}
