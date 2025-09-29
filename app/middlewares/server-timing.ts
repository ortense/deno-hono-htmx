import type { Context, MiddlewareHandler, Next } from "hono";

interface TimingEntry {
  name: string;
  duration: number;
  description?: string;
}

export class ServerTiming {
  private timings: TimingEntry[] = [];
  private startTime: number = 0;

  constructor() {
    this.startTime = performance.now();
  }

  addTiming(name: string, duration: number, description?: string) {
    this.timings.push({ name, duration, description });
  }

  startTiming(name: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.addTiming(name, duration);
    };
  }

  getHeaderValue(): string {
    const totalDuration = performance.now() - this.startTime;
    this.addTiming("total", totalDuration, "Total request time");

    return this.timings
      .map((timing) => {
        const base = `${timing.name};dur=${timing.duration.toFixed(2)}`;
        return timing.description
          ? `${base};desc="${timing.description}"`
          : base;
      })
      .join(", ");
  }
}

export function serverTiming(): MiddlewareHandler {
  return async (ctx: Context, next: Next) => {
    const timing = new ServerTiming();

    // Adicionar timing ao contexto para uso em outros middlewares/rotas
    ctx.set("serverTiming", timing);

    await next();

    // Adicionar header de Server-Timing
    const headerValue = timing.getHeaderValue();
    ctx.header("Server-Timing", headerValue);
  };
}
