import { ProjectService } from './services/project.service';
import { TRPCError } from '@trpc/server';
import { NotFoundException } from '@nestjs/common';
import { addProjectInputSchema, getProjectsInputSchema, deleteProjectInputSchema } from './dto/project.schema';
import { TrpcService } from '@server/trpc/trpc.service';

export const projectRouter = (trpc: TrpcService, projectService: ProjectService) => trpc.router({
    projects: {
        addProject: trpc.procedure
            .input(addProjectInputSchema)
            .mutation(async ({ input, ctx }) => {
                if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
                try {
                    const project = await projectService.addProjectFromGithub(input.repoPath, ctx.user.id);
                    return project;
                } catch (e) {
                    if (e instanceof NotFoundException) {
                        throw new TRPCError({ code: 'NOT_FOUND', message: e.message });
                    }
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Unknown error' });
                }
            }),
        getProjects: trpc.procedure
            .query(async ({ ctx }) => {
                if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
                return projectService.getProjectsByUser(ctx.user.id);
            }),
        deleteProject: trpc.procedure
            .input(deleteProjectInputSchema)
            .mutation(async ({ input, ctx }) => {
                if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
                return projectService.deleteProject(input.id, ctx.user.id);
            }),
    }
}); 