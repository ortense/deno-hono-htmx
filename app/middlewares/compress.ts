import type { Context, MiddlewareHandler, Next } from "hono";

const ENCODING_TYPES = ["gzip", "deflate", "br"];

interface CompressOptions {
  encoding?: string;
}

export function compress(
  options?: CompressOptions,
): MiddlewareHandler {
  return async function compress(ctx: Context, next: Next) {
    await next();

    const accepted = ctx.req.header("Accept-Encoding");
    const encoding = options?.encoding ??
      ENCODING_TYPES.find((encoding) => accepted?.includes(encoding));

    if (!encoding || !ctx.res.body) {
      return;
    }

    // Get ServerTiming instance from context
    const serverTiming = ctx.get("serverTiming");

    if (serverTiming) {
      // Start compression timing
      const endCompressionTiming = serverTiming.startTiming("compress");

      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - CompressionStream is a Web Streams API that's not yet fully typed in Deno
        const stream = new CompressionStream(encoding);
        ctx.res = new Response(ctx.res.body.pipeThrough(stream), ctx.res);
        ctx.res.headers.delete("Content-Length");
        ctx.res.headers.set("Content-Encoding", encoding);

        // End compression timing
        endCompressionTiming();
      } catch (error) {
        // In case of compression error, still record the timing
        endCompressionTiming();
        console.error("Compression error:", error);
      }
    } else {
      // Fallback for compression without timing if ServerTiming is not available
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - CompressionStream is a Web Streams API that's not yet fully typed in Deno
      const stream = new CompressionStream(encoding);
      ctx.res = new Response(ctx.res.body.pipeThrough(stream), ctx.res);
      ctx.res.headers.delete("Content-Length");
      ctx.res.headers.set("Content-Encoding", encoding);
    }
  };
}
