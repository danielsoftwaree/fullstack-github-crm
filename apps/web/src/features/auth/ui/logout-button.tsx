import { Button } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useLogout } from '../model/use-logout'

export const LogoutButton = () => {
    const { mutate, isPending } = useLogout()
    return (
        <Button
            variant="subtle"
            color="red"
            size="xs"
            leftSection={<IconLogout size={16} />}
            onClick={() => mutate()}
            loading={isPending}
        >
            Logout
        </Button>
    )
}
