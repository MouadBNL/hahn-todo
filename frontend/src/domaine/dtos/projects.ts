import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3).max(255),
});

export type ProjectDto = z.infer<typeof ProjectSchema>;