import { createTRPCClient, createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from '@server/trpc/trpc.router'

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:4000/trpc',
            // You can pass any HTTP headers you wish here
            // async headers() {
            //     return {
            //         authorization: getAuthCookie(),
            //     };
            // },
        }),
    ],
})