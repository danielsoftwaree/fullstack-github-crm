import { trpc } from '@web/shared/api/trpc';

export const useLogout = () => {
    const mutation = trpc.user.logout.useMutation({
        onSuccess: () => {
            window.location.reload();
        },
    });
    return mutation;
}; 