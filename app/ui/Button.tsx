import { css, cx } from "hono/helper";

const style = css`
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }
  &:focus, &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export type ButtonProps = Hono.ButtonHTMLAttributes;

export function Button({ class: className = "", ...props }: ButtonProps) {
  return <button {...props} class={cx(style, className)} />;
}
