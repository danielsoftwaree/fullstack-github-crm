'use client'

import { Group, Flex, Paper, Container } from '@mantine/core'
import { Logo } from '@web/shared/ui/main-logo'
import { ViewerInfo } from '@web/entities/user/ui/viewer-info'
import { LogoutButton } from '@web/features/auth/ui/logout-button'

export const Header = () => (
    <Paper py="sm" radius={0} withBorder>
        <Container>
            <Flex align="center" justify="space-between">
                <Logo />
                <Group gap="md">
                    <ViewerInfo />
                    <LogoutButton />
                </Group>
            </Flex>
        </Container>
    </Paper>
)
