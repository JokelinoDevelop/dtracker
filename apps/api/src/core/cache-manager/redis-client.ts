import { createClient } from "@keyv/redis";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config());

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
  throw new Error("Missing REDIS_URL env variable! Please provide it.");
}

export const redisClient = createClient({
  url: REDIS_URL,
});
