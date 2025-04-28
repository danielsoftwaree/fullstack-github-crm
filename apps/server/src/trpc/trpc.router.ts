import { TRPCError } from '@trpc/server';
import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
// Services
import { AuthService } from '@server/auth/auth.service';
import { TrpcService } from './trpc.service';
// Context
import { createTrpcContextFactory } from './trpc.context';
// Routers
import { authRouter } from '@server/auth/auth.router';
import { userRouter } from '@server/user/user.router';
import { projectRouter } from '@server/project/project.router';
import { ProjectService } from '@server/project/services/project.service';

@Injectable()
export class TrpcRouter {
    constructor(
        private readonly trpc: TrpcService,
        private readonly authService: AuthService,
        private readonly projectService: ProjectService,
    ) { }

    appRouterMerged = this.trpc.mergeRouters(
        authRouter(this.trpc),
        userRouter(this.trpc),
        projectRouter(this.trpc, this.projectService),
    )

    async applyMiddleware(app: INestApplication) {
        app.use(
            `/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouterMerged,
                createContext: createTrpcContextFactory(this.authService),
            }),
        );
    }

    isAuthenticated = this.trpc.procedure.use(({ ctx, next }) => {
        if (!ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
        }
        return next();
    });
}

export type AppRouter = TrpcRouter['appRouterMerged'];
