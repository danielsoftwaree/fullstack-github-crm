import { Space, Stack, Title } from '@mantine/core'

import { Container } from '@mantine/core'
import { Header } from '@web/widgets/header/ui/header'
import { ProjectList } from '@web/widgets/project-list/ui/project-list'

export default function DashboardPage() {
    return (
        <>
            <Header />
            <Container>
                <Space h="xl" />
                <Stack gap="xs">
                    <Title order={3} fw={400}>
                        Repositories
                    </Title>
                    <ProjectList />
                </Stack>
            </Container>
        </>
    )
}
