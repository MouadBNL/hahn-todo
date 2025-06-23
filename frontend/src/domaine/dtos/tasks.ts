import { z } from "zod";


export const TaskSchema = z.object({
	id: z.string().uuid().optional(),
	title: z.string().min(1),
	description: z.string().optional().nullable(),
	priority: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]).default("NONE").optional(),
	completedAt: z.date().optional().nullable(),
});

export type TaskDto = z.infer<typeof TaskSchema>;
