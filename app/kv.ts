import type { ServerTiming } from "./middlewares/server-timing.ts";

let kv: Deno.Kv;

export async function openKv(timing?: ServerTiming) {
  const endOpenKvTiming = timing?.startTiming("kv-open");

  if (!kv) {
    kv = await Deno.openKv().catch((err) => {
      console.error(err);
      Deno.exit(1);
    });
  }

  endOpenKvTiming?.();
  return { kv, timing };
}
