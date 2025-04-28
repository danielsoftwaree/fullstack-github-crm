import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { TRPCError } from '@trpc/server';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getUser(id: string) {

    }

    async findUserByEmailAndThrow(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'User already exists' });
        }
    }
}
