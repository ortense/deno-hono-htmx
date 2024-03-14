const COUNTER_VALUE = ["COUNTER", "value"] as const;

export async function value(kv: Deno.Kv) {
  const { value } = await kv.get<number>(COUNTER_VALUE);
  return value as number;
}

export async function increment(kv: Deno.Kv) {
  const current = await value(kv);
  const updated = current + 1;

  await kv.set(COUNTER_VALUE, updated);

  return updated;
}

export async function decrement(kv: Deno.Kv) {
  const current = await value(kv);
  const updated = current - 1;

  await kv.set(COUNTER_VALUE, updated);

  return updated;
}

export async function seed(kv: Deno.Kv) {
  const { value } = await kv.get<number>(COUNTER_VALUE);
  if (value === null) {
    await kv.set(COUNTER_VALUE, 0);
  }
}
