import { AuthForm } from '@web/features/auth/ui/auth-form/auth-form'
import { Center, Space, Stack, Title } from '@mantine/core'

export default function AuthPage() {
    return (
        <Center>
            <Stack>
                <Space h="xl" />
                <Title order={1} className="text-center">
                    GitHub CRM
                </Title>
                <AuthForm />
            </Stack>
        </Center>
    )
}
