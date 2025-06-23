import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AppSidebarHeader } from "./header"
import { EllipsisIcon, InboxIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ProjectForm from "@/components/blocks/ProjectForm"
import { useState, type ReactNode } from "react"
import type { ProjectDto } from "@/domaine/dtos"
import { projectService } from "@/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AppSidebar() {

	const queryClient = useQueryClient()
	const { data: projects } = useQuery({
		queryKey: ["projects"],
		queryFn: projectService.index,
	});

	const { mutate: createProject } = useMutation({
		mutationFn: projectService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] })
		},
	});

	const { mutate: deleteProject } = useMutation({
		mutationFn: projectService.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] })
		},
	});

	return (
		<Sidebar>
			<SidebarHeader>
				<AppSidebarHeader />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent className="flex flex-col gap-2">
						{/* <SidebarMenu>
							<SidebarMenuItem className="flex items-center gap-2">
								<SidebarMenuButton
									tooltip="Quick Create"
									className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
								>
									<PlusIcon />
									<span>Quick Create</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu> */}
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild tooltip="Inbox">
									<Link to="/app/inbox">
										<InboxIcon />
										<span>Inbox</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex w-full items-center justify-between">
              <span>Projects</span>
              <ProjectCreateModal onCreate={createProject}>
                <Button size="xs" variant="ghost">
                  <PlusIcon />
                </Button>
              </ProjectCreateModal>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects &&
                projects.map((project) => (
                  <ProjectItem
                    project={project}
                    key={project.id}
                    onDelete={() => deleteProject(project.id!)}
                  />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}


export type ProjectItemProps = {
  project: ProjectDto;
  onDelete?: (id: string) => void;
};

function ProjectItem({ project, onDelete }: ProjectItemProps) {
  return (
    <SidebarMenuItem key={project.id}>
      <div className="group/project-item relative">
        <SidebarMenuButton asChild>
          <Link to={`/app/projects/${project.id}`}>
            {project.name}
          </Link>
        </SidebarMenuButton>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover/project-item:opacity-100 group-[&:has([aria-expanded=true])]/project-item:opacity-1000">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="xs" variant="ghost">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onDelete?.(project.id!)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </SidebarMenuItem>
  );
}

export type ProjectCreateModalProps = {
	children: ReactNode,
	onCreate: (id: ProjectDto) => void,
}
function ProjectCreateModal({ children, onCreate }: ProjectCreateModalProps) {
  const [open, setOpen] = useState(false);

	const onCreateClick = (data: ProjectDto) => {
		onCreate(data)
		setOpen(false)
	}

	return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-80 lg:w-[600px] lg:max-w-[600px] xl:w-[900px] xl:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
        </DialogHeader>
        <ProjectForm onCancel={() => setOpen(false)} onSubmit={onCreateClick} />
      </DialogContent>
    </Dialog>
  );
}