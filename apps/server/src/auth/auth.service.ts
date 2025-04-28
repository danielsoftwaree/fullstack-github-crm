import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TRPCError } from '@trpc/server';
import { UserService } from '@server/user/user.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly logger: Logger
    ) { }



    async signIn(email: string, password: string): Promise<string> {
        this.logger.debug('Attempting to sign in user', { email });

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            this.logger.warn('Sign in failed: user not found', { email });
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
        }

        // Password validation simulation
        // TODO: replace with bcrypt
        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
            this.logger.warn('Sign in failed: invalid password', { email });
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
        }

        const payload = { sub: user.id, email: user.email };
        this.logger.debug('User authenticated successfully', { userId: user.id });
        return await this.jwtService.signAsync(payload);
    }

    async signUp(email: string, password: string, confirmPassword: string): Promise<string> {
        this.logger.debug('Attempting to sign up user', { email });

        if (password !== confirmPassword) {
            this.logger.warn('Sign up failed: passwords do not match', { email });
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Passwords do not match' });
        }

        await this.userService.findUserByEmailAndThrow(email);

        // TODO: hash password ^-^
        const user = await this.prisma.user.upsert({
            where: { email },
            update: { password },
            create: { email, password },
        });

        const payload = { sub: user.id, email: user.email };
        this.logger.debug('User created/updated successfully', { userId: user.id });
        return await this.jwtService.signAsync(payload);
    }

    async getUserFromToken(token: string) {
        this.logger.debug('Attempting to get user from token');

        if (!token) {
            this.logger.debug('No token provided');
            return null;
        }

        try {
            const decoded = this.jwtService.verify(token);
            this.logger.debug('Token verified successfully', { userId: decoded.sub });

            return this.prisma.user.findUnique({
                where: { id: decoded.sub },
            });
        } catch (error) {
            this.logger.error('Invalid token', { error });
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });
        }
    }
}
