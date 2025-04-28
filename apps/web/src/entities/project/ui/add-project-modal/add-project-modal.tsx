import { useState } from 'react'
import { Modal, TextInput, Button, Group } from '@mantine/core'
import { useAddProject } from '../../model/project.queries'

export function AddProjectModal({
    opened,
    onClose,
}: {
    opened: boolean
    onClose: () => void
}) {
    const [repoPath, setRepoPath] = useState('')

    const { mutateAsync: addProject, isPending, error } = useAddProject()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await addProject({ repoPath })
        setRepoPath('')
        onClose()
    }

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Add repository"
            centered
        >
            <form onSubmit={handleSubmit}>
                <TextInput
                    data-autofocus
                    label="Repository path"
                    placeholder="user/repo"
                    value={repoPath}
                    onChange={(e) => setRepoPath(e.currentTarget.value)}
                    required
                />
                <Group mt="md" justify="flex-end">
                    <Button variant="default" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" loading={isPending}>
                        Add
                    </Button>
                </Group>
                {error && (
                    <div style={{ color: 'red', marginTop: 8 }}>
                        {error.message}
                    </div>
                )}
            </form>
        </Modal>
    )
}
