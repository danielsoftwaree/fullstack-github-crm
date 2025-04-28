import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { PrismaService } from '../prisma/prisma.service';
import { GithubService } from './services/github.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [ProjectService, PrismaService, GithubService],
    exports: [ProjectService, GithubService],
})
export class ProjectModule { } 