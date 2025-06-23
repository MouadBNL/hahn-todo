import { z } from "zod";


export const SignInSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(8),
})

export type SignInRequest = z.infer<typeof SignInSchema>
