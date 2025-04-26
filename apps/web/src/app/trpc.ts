import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from '@server/trpc/trpc.router'

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
            // You can pass any HTTP headers you wish here
            // async headers() {
            //     return {
            //         authorization: getAuthCookie(),
            //     };
            // },
        }),
    ],
})