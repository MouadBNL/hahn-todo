import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ListTodoIcon } from "lucide-react";

export function AppSidebarHeader() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					asChild
					className="data-[slot=sidebar-menu-button]:!p-1.5"
				>
					<a href="#">
						<ListTodoIcon className="!size-5" />
						<span className="text-base font-semibold">Hahn Todo</span>
					</a>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}