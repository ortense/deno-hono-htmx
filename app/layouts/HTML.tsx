import { html } from "hono/helper";

export function HTML({ children }: { children: unknown }) {
  return html`<!DOCTYPE html><html lang="pt-br">${children}</html>`;
}
