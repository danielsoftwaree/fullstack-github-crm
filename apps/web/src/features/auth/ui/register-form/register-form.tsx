'use client'

import { Button, Stack, TextInput, Text, Space } from '@mantine/core'
import { Paper } from '@mantine/core'
import { IconLock, IconAt, IconUserPlus } from '@tabler/icons-react'
import { useRegisterForm } from '../../model/use-register-form'

export function RegisterForm() {
    const { form, handleSubmit, error, isPending } = useRegisterForm()

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
                        leftSectionPointerEvents="none"
                        leftSection={<IconAt size={16} />}
                        label="E-mail"
                        placeholder="Your email"
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={<IconLock size={16} />}
                        label="Password"
                        placeholder="Your password"
                        type="password"
                        {...form.getInputProps('password')}
                    />
                    <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={<IconLock size={16} />}
                        label="Confirm password"
                        placeholder="Confirm password"
                        type="password"
                        {...form.getInputProps('confirmPassword')}
                    />
                    <Button
                        type="submit"
                        leftSection={<IconUserPlus size={16} />}
                        loading={isPending}
                    >
                        Register
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
