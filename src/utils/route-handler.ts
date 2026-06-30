import type { NextRequest } from 'next/server'
import { handleError } from '@/utils/error-handler'

export function RouteHandler<T = Record<string, string | string[]>>(
    fn: (req: NextRequest, ctx: { params: Promise<T> }) => Promise<Response>
) {
    return async (
        req: NextRequest,
        ctx: { params: Promise<T> }
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
