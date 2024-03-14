import { Context } from "hono";
import { css } from "hono/helper";
import { WithHTMX } from "../layouts/WithHTMX.tsx";
import { Counter } from "../counter/Counter.tsx";
import { Hero } from "../ui/Hero.tsx";
import { GitHub } from "../github/Github.tsx";

const style = css`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  h1 { font-size: 6rem }

.description {
  display: flex;
  flex-direction: column;
  gap: 1em;
  font-size: 1.6rem;
  font-family: monospace;
  max-width: 600px;
  border-left: .5rem solid #f8f8f8;
  padding-left: 1rem;
}
`;

export function Home() {
  return (
    <WithHTMX>
      <section id="Home" class={style}>
        <Hero />
        <GitHub path="ortense/deno-hono-htmx" />
        <Counter />
        <section class="description">
          <p>
            This page looks very simple, because it is, but to be displayed the
            server accesses a database (Deno kv), makes a request to the github
            API, serves static files from the file system (without CDN) and
            renders jsx components (on the server) then the generated HTML is
            sent to your browser.
          </p>
          <p>
            If you click on "+" or "-" button a new request is made to the
            server, the counter value will be updated on the database and a new
            component is rendered and sent to client, in HTML not JSON, to
            replace the component that displays the counter value.
          </p>
        </section>
      </section>
    </WithHTMX>
  );
}

export function RenderHome(ctx: Context) {
  return ctx.html(<Home />);
}
