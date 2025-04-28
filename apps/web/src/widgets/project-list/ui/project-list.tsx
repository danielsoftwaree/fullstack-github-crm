'use client'

import { Space, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useProjects } from '@web/entities/project/model/project.queries'
import {
    AddProjectButton,
    AddProjectModal,
    ProjectCard,
    ProjectEmpty,
} from '@web/entities/project/ui'
import { Loader } from '@web/shared/ui'

export const ProjectList = () => {
    const [opened, { open, close }] = useDisclosure(false)
    const { data: projects, isLoading } = useProjects()

    if (isLoading)
        return (
            <>
                <Space h="xl" />
                <Loader />
            </>
        )

    return (
        <>
            <Stack>
                {projects?.length ? (
                    <>
                        <AddProjectButton onClick={open}>
                            Add Project
                        </AddProjectButton>
                        {projects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </>
                ) : (
                    <ProjectEmpty openModal={open} />
                )}
            </Stack>
            <AddProjectModal opened={opened} onClose={close} />
        </>
    )
}
