import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { EditIcon, XIcon } from "lucide-react";
import type { TaskDto } from "@/domaine/dtos";
import { Badge } from "../ui/badge";

export type TaskItemProps = {
	task: TaskDto;
	onUpdate?: (task: TaskDto) => void;
	onDelete?: (task: TaskDto) => void;
	onEdit?: (task: TaskDto) => void;
}
export default function TaskItem({ task, onUpdate, onDelete, onEdit }: TaskItemProps) {

	const onComplete = () => {
		console.log("onComplete", task.completedAt)
		onUpdate?.({ ...task, completedAt: task.completedAt ? null : new Date() })
	}

	const mapPriorityToBadgeVariant = (priority: string) => {
		switch (priority) {
			case "NONE":
				return "outline";
			case "LOW":
				return "default";
			case "MEDIUM":
				return "default";
			case "HIGH":
				return "destructive";
			default:
				return "default";
		}
	}

	return (
		<div className="group peer rounded-md p-1 transition-colors duration-200 ease-in-out hover:bg-gray-50">
			<div className="flex items-center gap-4 ">
				<Checkbox id={task.id!} className="cursor-pointer" checked={task.completedAt !== null} onCheckedChange={onComplete} />
				<p className="text-sm font-medium text-gray-700 group-hover:underline">
					{task.title}
				</p>

				<Badge variant={mapPriorityToBadgeVariant(task.priority ?? "NONE")}>
					{task.priority}
				</Badge>

				<div className="ml-auto gap-2 pt-1 	flex">
					<Button
						onClick={() => onDelete?.(task)}
						size="xs"
						variant="ghost"
						className="text-gray-500 hover:text-gray-800"
					>
						<XIcon scale={0.5} />
					</Button>
					<Button
						onClick={() => onEdit?.(task)}
						size="xs"
						variant="ghost"
						className="text-gray-500 hover:text-gray-800"
					>
						<EditIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{task.description && <p title={task.description} className="text-sm text-gray-500 ml-9 truncate mt-2">
				{task.description}
			</p>}
		</div>
	);
}

