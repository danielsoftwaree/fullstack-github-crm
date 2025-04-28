import { setAccessTokenCookie } from '@server/adapters/cookies';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';


export const authRouter = (trpc: TrpcService) => {
    return trpc.router({
        auth: {
            signIn: trpc.procedure.input(z.object({ email: z.string(), password: z.string() })).mutation(async ({ input, ctx }) => {
                const token = await ctx.authService.signIn(input.email, input.password);
                setAccessTokenCookie(ctx.res, token);
                return { ok: true };
            }),
            signUp: trpc.procedure.input(z.object({ email: z.string(), password: z.string(), confirmPassword: z.string() })).mutation(async ({ input, ctx }) => {
                const token = await ctx.authService.signUp(input.email, input.password, input.confirmPassword);
                setAccessTokenCookie(ctx.res, token);
                return { ok: true };
            }),
        }
    });
};
