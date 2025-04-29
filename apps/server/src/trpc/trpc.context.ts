// import { User } from '../prisma/generated/prisma';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';

export interface TrpcContext {
    authService: AuthService;
    req: Request;
    res: Response;
    user: User | null;
}

// DI
export function createTrpcContextFactory(authService: AuthService) {
    return async ({ req, res }: { req: Request; res: Response }): Promise<TrpcContext> => {
        let user = null;
        let token = null;

        try {
            token = req.cookies['access_token'];
        } catch (e) {
            console.error(e);
        }

        if (token) {
            try {
                user = await authService.getUserFromToken(token);
            } catch (e) {
                user = null;
                console.error(e);
            }
        }

        return { authService, req, res, user };
    };
}
