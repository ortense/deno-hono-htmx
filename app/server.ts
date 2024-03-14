import { Hono } from "hono";
import { compress, serveStatic } from "hono/middleware";
import { openKv } from "./kv.ts";
import { cache } from "./middlewares/cache-control.ts";
import { counter } from "./counter/router.tsx";
import { RenderHome } from "./pages/Home.tsx";

await openKv();

export const server = new Hono();

server.use(compress());
server.use("/static/*", cache(3600), serveStatic({ root: "./" }));
server.get("/", cache(60), RenderHome);
server.route("/counter", counter);
