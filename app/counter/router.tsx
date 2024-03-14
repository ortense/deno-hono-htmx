import { Hono } from "hono";
import { openKv } from "../kv.ts";
import { decrement, getValue, increment } from "./counter.repository.ts";
import { CounterDisplay } from "./CounterDisplay.tsx";

export const counter = new Hono();

counter.get("/", async (ctx) => {
  const value = await openKv().then(getValue);
  return ctx.html(<CounterDisplay value={value} />);
});

counter.post("/increment", async (ctx) => {
  const value = await openKv().then(increment);
  return ctx.html(<CounterDisplay value={value} />);
});

counter.post("/decrement", async (ctx) => {
  const value = await openKv().then(decrement);
  return ctx.html(<CounterDisplay value={value} />);
});
