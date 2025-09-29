import type { ServerTiming } from "../middlewares/server-timing.ts";

declare module "hono" {
  interface ContextVariableMap {
    serverTiming: ServerTiming;
  }
}
