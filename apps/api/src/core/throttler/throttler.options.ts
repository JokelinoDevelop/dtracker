import { minutes, seconds, ThrottlerOptions } from "@nestjs/throttler";

export const THROTTLER_OPTIONS: ThrottlerOptions[] = [
  {
    blockDuration: minutes(1),
    limit: 5,
    name: "short",
    ttl: seconds(10),
  },
  {
    blockDuration: minutes(2),
    limit: 20,
    name: "medium",
    ttl: seconds(30),
  },
  {
    blockDuration: minutes(5),
    limit: 100,
    name: "long",
    ttl: minutes(1),
  },
];
