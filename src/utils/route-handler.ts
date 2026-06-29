import type { NextRequest } from 'next/server'
import { handleError } from '@/utils/error-handler'

type HandlerContext = {
    params?: Record<string, string>
}

type RouteHandlerFn = (
    req: NextRequest,
    ctx?: HandlerContext
) => Promise<Response>

export function RouteHandler(fn: RouteHandlerFn) {
    return async (
        req: NextRequest,
        ctx?: HandlerContext
    ): Promise<Response> => {
        try {
            return await fn(req, ctx)
        } catch (error: unknown) {
            return handleError(error)
        }
    }
}

/**
 * ? USAGE:
 
  export const GET = RouteHandler(async () => {
    return new Response(JSON.stringify({ success: true }));
  });

  export const DELETE = RouteHandler(
    async (
      req: NextRequest,
      { params }: { params: Promise<{ id: string }> }
    ) => {
      const { id } = await params;
      // logic
    }
  );

 */
