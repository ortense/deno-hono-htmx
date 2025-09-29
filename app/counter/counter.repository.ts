import type { ServerTiming } from "../middlewares/server-timing.ts";

const COUNTER_VALUE = ["COUNTER", "value"] as const;

type Dependencies = {
  kv: Deno.Kv;
  timing?: ServerTiming;
};

export async function getValue({ kv, timing }: Dependencies) {
  const endTiming = timing?.startTiming("kv-read");
  const { value } = await kv.get<number>(COUNTER_VALUE);
  endTiming?.();
  return value as number;
}

export async function increment({ kv, timing }: Dependencies) {
  const endTiming = timing?.startTiming("kv-increment");
  const current = await getValue({ kv, timing });
  const updated = current + 1;

  await kv.set(COUNTER_VALUE, updated);
  endTiming?.();

  return updated;
}

export async function decrement({ kv, timing }: Dependencies) {
  const endTiming = timing?.startTiming("kv-decrement");
  const current = await getValue({ kv, timing });
  const updated = current - 1;

  await kv.set(COUNTER_VALUE, updated);
  endTiming?.();

  return updated;
}

export async function seed(kv: Deno.Kv) {
  const { value } = await kv.get<number>(COUNTER_VALUE);
  if (value === null) {
    await kv.set(COUNTER_VALUE, 0);
  }
}
