import * as session from "express-session";
import * as ConnectRedis from "connect-redis";
import Redis from "ioredis";

const RedisStore = ConnectRedis(session);
const redisClient = new Redis({
  port: 19124,
  host: process.env.REDIS_EP,
  username: "default",
  password: process.env.REDIS_PW,
  db: 0,
});

export const sessionOpt = {
  store: new RedisStore({
    client: redisClient,
    logErrors: true,
  }),
  saveUninitialized: true,
  secret: "hi",
  resave: false,
  secure: false,
  httpOnly: true,
  cookie: {
    httpOnly: true,
  },
};
