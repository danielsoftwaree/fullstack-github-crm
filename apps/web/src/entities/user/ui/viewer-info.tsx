import { Text, Group, Loader } from '@mantine/core'
import { useUserMe } from '../model/queries'

export const ViewerInfo = () => {
    const { data, isLoading } = useUserMe()

    if (isLoading) return <Loader size="xs" />
    if (!data) return null

    return (
        <Group gap="xs">
            <Text size="sm" fw={500}>
                {data.email}
            </Text>
        </Group>
    )
}
