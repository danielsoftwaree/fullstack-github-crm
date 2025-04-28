import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import {
    ColorSchemeScript,
    mantineHtmlProps,
    MantineProvider,
} from '@mantine/core'

import './globals.css'
import '@mantine/core/styles.css'
import { Providers } from '@web/appProviders/providers'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'GitHub CRM',
    description: 'GitHub CRM',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <ColorSchemeScript
                    nonce="8IBTHwOdqNKAWeKl7plt8g=="
                    defaultColorScheme="dark"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <MantineProvider defaultColorScheme="dark">
                    <Providers>
                        <>{children}</>
                    </Providers>
                </MantineProvider>
            </body>
        </html>
    )
}
