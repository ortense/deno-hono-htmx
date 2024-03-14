import { Hono } from "hono";
import { compress, serveStatic } from "hono/middleware";
import { openKv } from "./kv.ts";
import { counter } from "./counter/router.tsx";
import { RenderHome } from "./pages/Home.tsx";

await openKv();

export const server = new Hono();

server.use(compress());

server.use("/static/*", serveStatic({ root: "./" }));
server.get("/", RenderHome);
server.route("/counter", counter);
