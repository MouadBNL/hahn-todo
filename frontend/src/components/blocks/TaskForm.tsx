import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { TaskSchema, type TaskDto } from "@/domaine/dtos/tasks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
export default function TaskForm({
  onSubmit,
  onCancel,
  task,
}: {
  onSubmit: (data: TaskDto) => void;
  onCancel?: () => void;
  task?: Partial<TaskDto>;
}) {

  const form = useForm<TaskDto>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: null,
      priority: "NONE",
      completedAt: null,
      projectId: null,
      ...task,
    },
  });

  const handleSubmit = async (data: TaskDto) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex gap-4">
          <div className="w-3/4">

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your task" {...field} autoFocus />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/4">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NONE">NONE</SelectItem>
                      <SelectItem value="LOW">LOW</SelectItem>
                      <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                      <SelectItem value="HIGH">HIGH</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="Enter your task description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-end gap-4">
            <Button
              variant="secondary"
              onClick={onCancel}
              type="button"
              size="sm"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              size="sm"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
