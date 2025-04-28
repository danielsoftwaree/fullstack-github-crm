import { trpc } from '@web/shared/api/trpc'

export const useSignIn = () => trpc.auth.signIn.useMutation();

export const useSignUp = () => trpc.auth.signUp.useMutation();

export const useUserMe = () => trpc.user.me.useQuery();

