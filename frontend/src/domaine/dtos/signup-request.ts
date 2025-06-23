import { z } from "zod";

export const SignUpSchema = z.object({
	fullName: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8),
})

export type SignUpRequest = z.infer<typeof SignUpSchema>