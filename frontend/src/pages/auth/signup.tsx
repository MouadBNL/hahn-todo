import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { authService } from "@/services"

export default function SignUp() {

	const schema = z.object({
		fullName: z.string().min(3),
		email: z.string().email(),
		username: z.string().min(3),
		password: z.string().min(8),
	})

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			fullName: "",
			email: "",
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof schema>) => {
		const response = await authService.signUp(data)
		console.log(response)
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-[400px]">
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>Enter your details below to create your account</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardContent className="space-y-4">

							<FormField control={form.control} name="fullName" render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="fullName">Full Name</FormLabel>
									<FormControl>
										<Input
											id="fullName"
											type="text"
											placeholder="Enter your full name"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)} />

							<FormField control={form.control} name="username" render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="username">Username</FormLabel>
									<FormControl>
										<Input
											id="username"
											type="text"
											placeholder="Enter your username"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)} />

							<FormField control={form.control} name="email" render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">Email</FormLabel>
									<FormControl>
										<Input
											id="email"
											type="email"
											placeholder="Enter your email"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)} />

							<FormField control={form.control} name="password" render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="password">Password</FormLabel>
									<FormControl>
										<Input
											id="password"
											type="password"
											placeholder="Enter your password"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)} />

						</CardContent>

						<CardFooter className="flex flex-col space-y-4 mt-4">
							<Button type="submit" className="w-full">
								Sign Up
							</Button>
							<p className="text-sm text-gray-500">
								Already have an account?{" "}
								<Link to="/auth/signin" className="text-primary hover:underline">
									Signin
								</Link>
							</p>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	)
}
