let kv: Deno.Kv;

export async function openKv() {
  if (!kv) {
    kv = await Deno.openKv().catch((err) => {
      console.error(err);
      Deno.exit(1);
    });
  }

  return kv;
}
