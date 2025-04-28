import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaService } from "@server/prisma/prisma.service";

@Module({
    providers: [UserService, PrismaService],
})
export class UserModule { }

