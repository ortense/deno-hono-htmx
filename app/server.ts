import { Hono } from "hono";
import { serveStatic } from "hono/middleware";
import { openKv } from "./kv.ts";
import { cache } from "./middlewares/cache-control.ts";
import { serverTiming } from "./middlewares/server-timing.ts";
import { compress } from "./middlewares/compress.ts";
import { counter } from "./counter/router.tsx";
import { RenderHome } from "./pages/Home.tsx";
import "./types/hono.ts";

await openKv();

export const server = new Hono();

server.use(serverTiming());
server.use(compress());
server.use("/static/*", cache(3600), serveStatic({ root: "./" }));
server.get("/", cache(60), RenderHome);
server.route("/counter", counter);
