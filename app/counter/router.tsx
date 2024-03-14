import { Hono } from "hono";
import { openKv } from "../kv.ts";
import * as repo from "./counter.repository.ts";
import { CounterDisplay } from "./CounterDisplay.tsx";

export const counter = new Hono();

counter.get("/", async (ctx) => {
  const kv = await openKv();
  const value = await repo.value(kv);
  return ctx.html(<CounterDisplay value={value} />);
});

counter.post("/increment", async (ctx) => {
  const kv = await openKv();
  const value = await repo.increment(kv);
  return ctx.html(<CounterDisplay value={value} />);
});

counter.post("/decrement", async (ctx) => {
  const kv = await openKv();
  const value = await repo.decrement(kv);
  return ctx.html(<CounterDisplay value={value} />);
});
