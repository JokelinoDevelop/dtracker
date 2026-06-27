import { createClient } from "@keyv/redis";

import { env } from "@/env";

export const redisClient = createClient({
  url: env.REDIS_URL,
});
