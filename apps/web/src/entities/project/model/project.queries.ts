import { trpc } from '@web/shared/api/trpc'

export const useProjects = () => trpc.projects.getProjects.useQuery();

export function useAddProject() {
    const utils = trpc.useUtils()
    return trpc.projects.addProject.useMutation({
        onSuccess: () => {
            utils.projects.getProjects.invalidate()
        },
    })
}

export function useDeleteProject() {
    const utils = trpc.useUtils()
    return trpc.projects.deleteProject.useMutation({
        onSuccess: () => {
            utils.projects.getProjects.invalidate()
        },
    })
}