import type { Context, MiddlewareHandler, Next } from "hono";

export function cache(maxAge: number): MiddlewareHandler {
  return async (ctx: Context, next: Next) => {
    await next();
    ctx.header("Cache-Control", `max-age=${maxAge}`);
  };
}
