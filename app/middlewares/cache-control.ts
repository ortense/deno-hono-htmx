import type { MiddlewareHandler } from "hono";

export function cache(maxAge: number): MiddlewareHandler {
  return async (ctx, next) => {
    await next();
    ctx.header("Cache-Control", `max-age=${maxAge}`);
  };
}
