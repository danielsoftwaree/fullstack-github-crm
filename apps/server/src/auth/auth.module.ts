import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@server/user/user.service';
@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    }),],

  providers: [AuthService, PrismaService, Logger, UserService],
  exports: [JwtModule],
})
export class AuthModule { }
