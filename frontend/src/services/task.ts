import type { TaskDto } from "@/domaine/dtos/tasks"
import http from "@/lib/http"


export const taskService = {
	inbox: async () => {
		const response = await http.get<TaskDto[]>("/tasks")
		return response.data
	},
	create: async (task: TaskDto) => {
		const response = await http.post("/tasks", task)
		return response.data
	},
	update: async (task: TaskDto) => {
		const response = await http.put(`/tasks/${task.id}`, task)
		return response.data
	},
	delete: async (task: TaskDto) => {
		const response = await http.delete(`/tasks/${task.id}`)
		return response.data
	}
}
