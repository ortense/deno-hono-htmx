import type { ServerTiming } from "../middlewares/server-timing.ts";

export type GithubRepo = {
  name: string;
  url: string;
  description: string;
};

export async function getRepo(
  path: string,
  timing?: ServerTiming,
): Promise<GithubRepo> {
  const endTiming = timing?.startTiming("github-api");

  const url = `https://api.github.com/repos/${path}`;
  const response = await fetch(url);
  const data = await response.json();

  endTiming?.();

  if (!response.ok) {
    return {
      url: `${data.documentation_url || "#"}`,
      description: `${data.message || ""}`,
      name: `${data.message || "Error"}`,
    };
  }

  return {
    url: `${data.html_url}`,
    description: `${data.description}`,
    name: `${data.full_name}`,
  };
}
