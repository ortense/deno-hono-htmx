import { css, cx } from "hono/helper";
import { openKv } from "../kv.ts";
import { CounterDecrementButton } from "./CounterDecrementButton.tsx";
import { CounterIncrementButton } from "./CounterIncrementButton.tsx";
import { CounterDisplay } from "./CounterDisplay.tsx";
import { getValue } from "./counter.repository.ts";

const style = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  font-size: 2rem;
  .CounterDisplay { font-size: 3rem }
`;

export async function Counter() {
  const value = await openKv().then(getValue);
  return (
    <section class={cx("Counter", style)}>
      <CounterDecrementButton />
      <CounterDisplay value={value} />
      <CounterIncrementButton />
    </section>
  );
}
