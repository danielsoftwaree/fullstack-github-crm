import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GithubService } from './github.service';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService, private github: GithubService) { }

    async addProjectFromGithub(repoPath: string, userId: number) {
        const [owner, name] = repoPath.split('/');
        const existing = await this.prisma.project.findFirst({
            where: { owner, name, userId },
        });

        if (existing) return existing;

        const data = await this.github.fetchRepoData(repoPath);

        const project = await this.prisma.project.create({
            data: {
                ...data,
                userId,
            },
        });

        return project;
    }

    async getProjectsByUser(userId: number) {
        return this.prisma.project.findMany({ where: { userId } });
    }

    async deleteProject(id: number, userId: number) {
        return this.prisma.project.delete({ where: { id, userId } });
    }
} 