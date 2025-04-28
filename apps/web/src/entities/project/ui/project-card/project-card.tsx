import {
    Card,
    Avatar,
    Menu,
    MenuTarget,
    ActionIcon,
    MenuDropdown,
    MenuItem,
    Text,
} from '@mantine/core'
import {
    IconStar,
    IconGitFork,
    IconBug,
    IconDotsVertical,
    IconTrash,
} from '@tabler/icons-react'
import { formatNumber } from '@web/shared/lib/format-number'
import { unixToDate } from '@web/shared/lib/unix-to-date'
import { ProjectProps } from '../../model/project.types'
import { useDeleteProject } from '../../model/project.queries'

export const ProjectCard = ({ project }: { project: ProjectProps }) => {
    const { mutateAsync: deleteProject, isPending } = useDeleteProject()

    const handleDelete = async () => {
        await deleteProject({ id: project.id })
    }

    return (
        <Card key={project.id} shadow="xs" withBorder className="!p-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                <div className="flex flex-row items-center gap-3 flex-1">
                    <Avatar
                        src={project.imageUrl || undefined}
                        radius="xl"
                        size={40}
                        color="gray"
                    >
                        {project.owner[0].toUpperCase()}
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <Text fw={600} size="md" className="truncate">
                            <Text
                                component="a"
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'underline',
                                    color: 'inherit',
                                }}
                            >
                                {project.owner}/{project.name}
                            </Text>
                        </Text>
                        <Text size="xs" c="dimmed" className="truncate">
                            {project.url}
                        </Text>
                        <Text size="xs" c="dimmed">
                            Created: {unixToDate(project.createdAt)}
                        </Text>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-1">
                        <IconStar size={16} color="#fab005" />
                        <span className="text-sm">
                            {formatNumber(project.stars)}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IconGitFork size={16} color="#228be6" />
                        <span className="text-sm">
                            {formatNumber(project.forks)}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IconBug size={16} color="#fa5252" />
                        <span className="text-sm">
                            {formatNumber(project.issues)}
                        </span>
                    </div>
                    <Menu shadow="md" width={160} position="bottom-end">
                        <MenuTarget>
                            <ActionIcon variant="subtle" color="gray" size="md">
                                <IconDotsVertical size={18} />
                            </ActionIcon>
                        </MenuTarget>
                        <MenuDropdown>
                            <MenuItem
                                color="red"
                                leftSection={<IconTrash size={16} />}
                                onClick={handleDelete}
                                disabled={isPending}
                            >
                                Delete
                            </MenuItem>
                        </MenuDropdown>
                    </Menu>
                </div>
            </div>
        </Card>
    )
}
