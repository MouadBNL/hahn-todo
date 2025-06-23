
import { type AuthResponse, type SignInRequest, type SignUpRequest } from "@/domaine/dtos"
import type { AuthUser } from "@/domaine/entities"
import http from "@/lib/http"


export const authService = {
	signUp: async (data: SignUpRequest) => {
		const response = await http.post<AuthResponse>("/auth/signup", data)
		return response.data
	},
	signIn: async (data: SignInRequest) => {
		const response = await http.post<AuthResponse>("/auth/signin", data)
		return response.data
	},
	me: async () => {
		const response = await http.get<AuthUser>("/auth/me")
		return response.data
	}
}