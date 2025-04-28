import { Group, Text } from '@mantine/core'
import Image from 'next/image'
export const Logo = () => (
    <Group gap={6} align="center">
        <Image
            src="/logo.png"
            alt="logo"
            width={32}
            height={32}
            className="rounded-md"
        />
        <Text
            fw={900}
            size="xl"
            c="#FFF"
            style={{ letterSpacing: 1 }}
            className="drop-shadow-[1px_1px_1px_rgba(255,87,18,0.5)]"
        >
            ForkBoard
        </Text>
    </Group>
)
