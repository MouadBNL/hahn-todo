import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, type ProjectDto } from "@/domaine/dtos";

export default function ProjectForm({
  onSubmit,
  onCancel,
  project,
}: {
  onSubmit: (data: ProjectDto) => void;
  onCancel?: () => void;
  project?: ProjectDto;
}) {
  const form = useForm<ProjectDto>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
      ...project,
    },
  });

  const handleSubmit = async (data: ProjectDto) => {
    await onSubmit(data);
  };
	
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
      </form>
    </Form>
  );
}
