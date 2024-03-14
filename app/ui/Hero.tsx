import { css, cx } from "hono/helper";

const style = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  @media (width <= 1200px) {
    flex-direction: column;
  }
`;

export function Hero() {
  return (
    <h1 class={cx("Hero", style)}>
      <img src="/static/img/deno.png" alt="Deno" />
      <span>+</span>
      <img src="/static/img/hono.png" alt="Hono" />
      <span>+</span>
      <img src="/static/img/htmx.png" alt="htmx" />
    </h1>
  );
}
