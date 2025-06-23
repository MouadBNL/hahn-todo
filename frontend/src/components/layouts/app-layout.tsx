import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth";


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
			<pre>{JSON.stringify(auth.user, null, 2)}</pre>
			<Outlet />
		</div>
	)
}