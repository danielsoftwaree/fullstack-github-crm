import { z } from 'zod';

export const repoPathSchema = z.string().regex(/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/, 'Invalid repo path');

export const addProjectInputSchema = z.object({
    repoPath: repoPathSchema
});

export const getProjectsInputSchema = z.object({
    userId: z.number(),
});

export const deleteProjectInputSchema = z.object({
    id: z.number()
});

export type AddProjectInput = z.infer<typeof addProjectInputSchema>;
export type GetProjectsInput = z.infer<typeof getProjectsInputSchema>;
export type DeleteProjectInput = z.infer<typeof deleteProjectInputSchema>;

