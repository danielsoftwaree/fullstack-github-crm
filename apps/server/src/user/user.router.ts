import { TrpcService } from '@server/trpc/trpc.service';

export const userRouter = (trpc: TrpcService) => trpc.router({
    user: {
        me: trpc.procedure.query(({ ctx }) => {
            if (!ctx.user) return null;
            const { id, email } = ctx.user;
            return { id, email };
        }),
        logout: trpc.procedure.mutation(({ ctx }) => {
            ctx.res.cookie('access_token', '', { httpOnly: true, expires: new Date(0) });
            return { ok: true };
        }),
    }
});
