import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AppSidebarHeader } from "./header"
import { InboxIcon } from "lucide-react"
import { Link } from "react-router"

export function AppSidebar() {
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
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}