import { AppPage } from "@/components/layouts/app-layout/app-page"
import { AppPageTitle } from "@/components/layouts/app-layout/app-page-title"
import TaskForm from "@/components/blocks/TaskForm"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taskService } from "@/services"
import type { TaskDto } from "@/domaine/dtos"
import TaskItem from "@/components/blocks/TaskItem"
import { useState } from "react"

export function InboxPage() {

	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isEditingTask, setIsEditingTask] = useState<string | null>(null);

	const queryClient = useQueryClient();
	const { data: tasks } = useQuery({
		queryKey: ["tasks-inbox"],
		queryFn: () => taskService.inbox(),
	})

	const { mutate: createTask } = useMutation({
		mutationFn: taskService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks-inbox"] })
		}
	})

	const { mutate: deleteTask } = useMutation({
		mutationFn: taskService.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks-inbox"] })
		}
	})
	
	const { mutate: updateTask } = useMutation({
		mutationFn: taskService.update,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks-inbox"] })
		}
	})

	const onTaskCreate = (task: TaskDto) => {
		createTask(task)
		setIsAddingTask(false)
	}

	const onTaskDelete = (task: TaskDto) => {
		deleteTask(task)
	}

	const onTaskCompletedChange = (task: TaskDto) => {
		updateTask(task)	
	}

	const onTaskUpdate = (task: TaskDto) => {
		console.log("onTaskUpdate", task)
		updateTask(task)
		setIsEditingTask(null)
	}

	return (
		<AppPage>
			<AppPageTitle title="Inbox" />

			<div className="py-8">	
				<div className="grid grid-cols-1 gap-2 mb-8">
					{tasks?.map((task) => (
						isEditingTask === task.id ? (
							<TaskForm key={task.id!} task={task} onSubmit={onTaskUpdate} onCancel={() => setIsEditingTask(null)} />
						) : (
							<TaskItem key={task.id!} task={task} onDelete={onTaskDelete} onUpdate={onTaskCompletedChange} onEdit={(t) => setIsEditingTask(t.id!)} />
						)
					))}
				</div>

				{isAddingTask ? (
					<TaskForm onSubmit={onTaskCreate} onCancel={() => setIsAddingTask(false)} />
				) : (
					<AddTaskButton onClick={() => setIsAddingTask(true)} />
				)}
			</div>

		</AppPage>
	)
}


function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="my-4 flex cursor-pointer items-center justify-center text-gray-500 transition-opacity opacity-100"
      onClick={onClick}
    >
      <div className="h-[1px] flex-1 bg-gray-300"></div>
      <span className="block px-4 text-xs font-medium">Add Task</span>
      <div className="h-[1px] flex-1 bg-gray-300"></div>
    </div>
  );
}