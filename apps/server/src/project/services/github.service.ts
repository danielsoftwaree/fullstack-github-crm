import { Injectable, NotFoundException } from '@nestjs/common';
import { GithubRepositoryDto } from '../dto/github.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface GithubRepoData {
    owner: string;
    name: string;
    url: string;
    imageUrl: string;
    stars: number;
    forks: number;
    issues: number;
    createdAt: number; // unix timestamp
}

@Injectable()
export class GithubService {
    constructor(private readonly httpService: HttpService) { }

    async fetchRepoData(repoPath: string): Promise<GithubRepoData> {
        const res = await firstValueFrom(
            this.httpService.get(
                `https://api.github.com/repos/${repoPath}`
            )
        )
        if (res.status !== 200) throw new NotFoundException('Repo not found');
        const data = res.data as GithubRepositoryDto;
        return {
            owner: data.owner.login,
            name: data.name,
            url: data.html_url,
            imageUrl: data.owner.avatar_url,
            stars: data.stargazers_count,
            forks: data.forks_count,
            issues: data.open_issues_count,
            createdAt: Math.floor(new Date(data.created_at).getTime() / 1000),
        };
    }
} 