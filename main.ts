import { server } from "./app/server.ts";

Deno.serve(server.fetch);
