'use client'

import { Button, Stack, TextInput, Text, Space } from '@mantine/core'
import { Paper } from '@mantine/core'
import { IconLock, IconAt, IconLogin } from '@tabler/icons-react'
import { useLoginForm } from '../../model/use-login-form'

export function LoginForm() {
    const { form, handleSubmit, error, isPending } = useLoginForm()

    return (
        <Paper
            p="xl"
            radius={0}
            withBorder
            styles={{
                root: { borderTop: 'none' },
            }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        type="email"
                        leftSectionPointerEvents="none"
                        leftSection={<IconAt size={16} />}
                        label="E-mail"
                        placeholder="Your email"
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        type="password"
                        leftSectionPointerEvents="none"
                        leftSection={<IconLock size={16} />}
                        label="Password"
                        placeholder="Your password"
                        {...form.getInputProps('password')}
                    />

                    <Button
                        type="submit"
                        leftSection={<IconLogin size={16} />}
                        loading={isPending}
                    >
                        Login
                    </Button>
                </Stack>
                <Space h="xs" />
                <Text
                    c="red"
                    opacity={error ? 1 : 0}
                    className="text-center overflow-hidden text-ellipsis truncate"
                    maw={'100%'}
                >
                    {error ?? '_'}
                </Text>
            </form>
        </Paper>
    )
}
