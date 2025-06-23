import axios from "axios"

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
})

export default http

