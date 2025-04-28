import { Stack, Text } from '@mantine/core'
import { AddProjectButton } from '../add-project-button/add-project-button'

export const ProjectEmpty = ({ openModal }: { openModal: () => void }) => {
    const handleClick = () => {
        openModal()
    }
    return (
        <>
            <Stack>
                <Text c="gray" w={'100%'} ta={'center'}>
                    No projects
                </Text>
                <AddProjectButton onClick={handleClick}>
                    Add Project
                </AddProjectButton>
            </Stack>
        </>
    )
}
