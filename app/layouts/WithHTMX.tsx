import { css, Style } from "hono/helper";
import { HTML } from "./HTML.tsx";

const layoutStyle = css`
  :-hono-global {
    * {
      margin: 0; padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialised;
      -moz-osx-font-smoothing: gray-scale;
    }
    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;

        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    html { font-size: 62.5%; }
    body {}
    h1 { font-size: 3rem; }
  }
`;

export function WithHTMX({ children }: { children: unknown }) {
  return (
    <HTML>
      <head>
        <title>Deno + Hono + htmx</title>
        <Style />
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="A experiment with Deno, Hono and htmx"
        />
        <meta name="keywords" content="deno, hono, htmx, typescript" />
        <meta name="viewprt" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
      </head>
      <body class={layoutStyle}>
        {children}
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      </body>
    </HTML>
  );
}
