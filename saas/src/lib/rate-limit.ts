import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";

const redis =
  env.REDIS_REST_URL && env.REDIS_REST_TOKEN
    ? new Redis({
        url: env.REDIS_REST_URL,
        token: env.REDIS_REST_TOKEN
      })
    : null;

const limiter =
  redis &&
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m")
  });

export async function enforceRateLimit(identifier: string) {
  if (!limiter) {
    return { success: true };
  }

  return limiter.limit(identifier);
}


