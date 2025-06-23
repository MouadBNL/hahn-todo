import type { ProjectDto, TaskDto } from "@/domaine/dtos"
import http from "@/lib/http"

export const projectService = {
	index: async () => {
		const response = await http.get<ProjectDto[]>("/projects")
		return response.data
	},
	show: async (id: string) => {
		const response = await http.get<ProjectDto>(`/projects/${id}`)
		return response.data
	},
	create: async (project: ProjectDto) => {
		const response = await http.post<ProjectDto>("/projects", project)
		return response.data
	},
	delete: async (id: string) => {
		const response = await http.delete(`/projects/${id}`)
		return response.data
	},
	tasks: async (id: string) => {
		const response = await http.get<TaskDto[]>(`/projects/${id}/tasks`)
		return response.data
	}
}
