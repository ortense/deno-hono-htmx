import { Hono } from "hono";
import { openKv } from "../kv.ts";
import { decrement, getValue, increment } from "./counter.repository.ts";
import { CounterDisplay } from "./CounterDisplay.tsx";
import "../types/hono.ts";

export const counter = new Hono();

counter.get("/", async (ctx) => {
  const timing = ctx.get("serverTiming");
  const endRenderTiming = timing?.startTiming("render-counter");

  const value = await openKv(timing).then(getValue);
  const html = <CounterDisplay value={value} />;

  endRenderTiming?.();
  return ctx.html(html);
});

counter.post("/increment", async (ctx) => {
  const timing = ctx.get("serverTiming");
  const endRenderTiming = timing?.startTiming("render-increment");

  const value = await openKv(timing).then(increment);
  const html = <CounterDisplay value={value} />;

  endRenderTiming?.();
  return ctx.html(html);
});

counter.post("/decrement", async (ctx) => {
  const timing = ctx.get("serverTiming");
  const endRenderTiming = timing?.startTiming("render-decrement");

  const value = await openKv(timing).then(decrement);

  const html = <CounterDisplay value={value} />;

  endRenderTiming?.();
  return ctx.html(html);
});
