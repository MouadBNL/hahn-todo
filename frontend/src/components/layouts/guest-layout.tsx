import { Link } from "react-router";
import { useAuth } from "../auth"
import { Button } from "../ui/button";
import { ListTodoIcon } from "lucide-react";


export function GuestLayout({ children }: { children: React.ReactNode }) {
	const auth = useAuth();
	return (
		<div>
			<header className="bg-white shadow-sm fixed top-0 z-10 left-0 right-0">
				<div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
					<Link to="/">
						<h1 className="text-xl font-bold leading-tight text-gray-900 flex items-center gap-2">
							<ListTodoIcon className="!size-5" />
							Hahn Todo
						</h1>
					</Link>
					<div className="flex gap-4">
						{auth.user ? (
							<Button asChild>
								<Link to="/app">Dashboard</Link>
							</Button>
						) : (
							<>
								<Button asChild>
									<Link to="/auth/signin">Login</Link>
								</Button>
								<Button asChild variant="outline">
									<Link to="/auth/signup">Sign Up</Link>
								</Button>
							</>
						)}
					</div>
				</div>
				</header>
				<main>
					{children}
				</main>
		</div>
	)
}