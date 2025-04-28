import { useForm, zodResolver } from '@mantine/form'
import { useRouter } from 'next/navigation'
import { loginSchema } from './schema'
import { TRPCClientError } from '@trpc/client'
import { useState } from 'react'
import { z } from 'zod'
import { useSignIn } from '@web/entities/user/model/queries'
type LoginFormValues = z.infer<typeof loginSchema>

export const useLoginForm = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const form = useForm<LoginFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(loginSchema),
    })

    const { mutateAsync: signIn, isPending } = useSignIn()

    const handleSubmit = async (values: LoginFormValues) => {
        setError(null)
        try {
            await signIn(values, {
                onSuccess: (data) => console.log(data),
            })
            router.push('/')
        } catch (err) {
            if (err instanceof TRPCClientError) {
                setError(err.message)
            } else {
                setError('Unexpected error occurred. Try again.')
                console.error(err)
            }
        }
    }

    return { form, handleSubmit, error, isPending }
}
