import { server } from "./app/server.tsx";

Deno.serve(server.fetch);
