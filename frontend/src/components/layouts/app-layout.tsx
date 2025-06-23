import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-layout/app-sidebar";


export function AppLayout() {
  const auth = useAuth();

  if (auth.isFetching) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/auth/signin" />;
  }

	return (
		<div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarProvider>
		</div>
	)
}
