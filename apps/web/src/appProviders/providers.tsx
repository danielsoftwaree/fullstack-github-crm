'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@web/shared/api/trpc'
import { createTRPCClient } from '@trpc/client'
import { useState } from 'react'
import { trpcClientOptions } from '@web/shared/api/trpc'
import type { AppRouter } from '@server/trpc/trpc.router'

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>(trpcClientOptions())
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
