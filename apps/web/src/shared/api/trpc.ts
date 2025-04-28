import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@server/trpc/trpc.router';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClientOptions = () => ({
    links: [
        httpBatchLink({
            url: process.env.NEXT_PUBLIC_NESTJS_SERVER + '/trpc',
            fetch(url, opts) {
                return fetch(url, {
                    ...opts,
                    credentials: 'include',
                });
            },
        }),
    ],
});

export type { AppRouter }; 