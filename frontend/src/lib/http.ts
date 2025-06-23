import axios from "axios"
import { AuthUtils } from "./auth";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
})

http.interceptors.request.use((config) => {
	const token = AuthUtils.getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
})

export default http

	