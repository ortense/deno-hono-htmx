import { css, cx } from "hono/helper";
import { getRepo } from "./api.ts";

const style = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  max-width: 900px;
  padding: 0 0.5rem;
`;

const lintStyle = css`
  color: #f8f8f8;
  text-decoration: underline;

  img {
    width: 1em;
  }
`;

export async function GitHub({ path }: { path: string }) {
  const repo = await getRepo(path);

  return (
    <section class={cx("Github", style)}>
      <p>{repo.description}</p>
      <p>
        See the source code at{" "}
        <a
          class={cx("GithubLink", lintStyle)}
          href={repo.url}
          alt="github repository"
        >
          <img src="/static/img/github.png" alt="github icon" />
          /{repo.name}
        </a>
      </p>
    </section>
  );
}
