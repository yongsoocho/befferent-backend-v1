import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private redis: Cache) {}

  async getHello(): Promise<string> {
    return await this.redis.get("hi2");
  }

  async getTest(): Promise<string> {
    await this.redis.set("hi2", "ok2");
    return "hi~";
  }

  async deleteCache() {
    return await this.redis.del("hi10");
  }

  async getHtml(): Promise<string> {
    const random = Math.random();
    return random > 0.5 ? "<h1>h1 tag</h1>" : "<p>p tag!!</p>";
  }

  async getSession3() {
    const test = await this.redis.get("hi4");
    console.log(typeof test);
    return test;
  }
}
