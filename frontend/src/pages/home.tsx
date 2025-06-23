import { GuestLayout } from "@/components/layouts/guest-layout";
import { Link } from "react-router";
import HeroImage from "@/assets/hahn-todo.png";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<GuestLayout>
			<section className="pt-32 h-screen overflow-y-hidden">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center gap-12">
						<div className="flex-1 space-y-6">
							<h1 className="text-3xl font-bold text-center">
								Manage Your Projects With Ease
							</h1>
							<p className="text-base text-center text-gray-600 w-2/3 mx-auto">
								A simple and intuitive project management tool that helps you stay organized and collaborate effectively with your team. Track tasks, manage deadlines, and achieve your goals seamlessly.
							</p>
							<div className="flex justify-center gap-4">
								<Button asChild>
									<Link 
										to="/auth/signup" 
									>
										Get Started
									</Link>
								</Button>
								<Button asChild variant="outline">
									<Link
										to="/about"
									>
										Learn More
									</Link>
								</Button>
							</div>
						</div>
						<div className="flex-1">
							<img 
								src={HeroImage} 
								alt="Project Management Dashboard"
								className="w-full h-auto rounded-lg shadow-xl border		"
							/>
						</div>
					</div>
				</div>
			</section>
		</GuestLayout>
	)
}