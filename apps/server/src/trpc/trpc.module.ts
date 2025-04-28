import { Module, Logger } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { AuthService } from '@server/auth/auth.service';
import { AuthModule } from '@server/auth/auth.module';
import { PrismaService } from '@server/prisma/prisma.service';
import { UserService } from '@server/user/user.service';
import { UserModule } from '@server/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from '@server/project/project.module';
@Module({
    imports: [AuthModule, UserModule, ConfigModule, ProjectModule],
    controllers: [],
    providers: [TrpcService, TrpcRouter, AuthService, PrismaService, Logger, UserService],
})
export class TrpcModule { }

