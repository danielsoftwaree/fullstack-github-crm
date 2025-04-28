import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Minimum 4 characters'),
})

export const registerSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Minimum 4 characters'),
    confirmPassword: z.string().min(6, 'Minimum 4 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})
