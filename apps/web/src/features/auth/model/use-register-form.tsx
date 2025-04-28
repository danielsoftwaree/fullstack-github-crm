import { useForm, zodResolver } from '@mantine/form'
import { useRouter } from 'next/navigation'
import { registerSchema } from './schema'
import { TRPCClientError } from '@trpc/client'
import { useState } from 'react'
import { z } from 'zod'
import { useSignUp } from '@web/entities/user/model/queries'

type RegisterFormValues = z.infer<typeof registerSchema>

export const useRegisterForm = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const form = useForm<RegisterFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: zodResolver(registerSchema),
    })

    const { mutateAsync: signUp, isPending } = useSignUp()

    const handleSubmit = async (values: RegisterFormValues) => {
        setError(null)
        try {
            await signUp(values, {
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
