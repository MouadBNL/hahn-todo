import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { authService } from "@/services"
import { SignInSchema, type SignInRequest } from "@/domaine/dtos"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { AuthUtils } from "@/lib/auth"

export default function SignIn() {

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const form = useForm<SignInRequest>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate: signIn, isPending } = useMutation({
		mutationFn: authService.signIn,
		onSuccess: (data) => {
			AuthUtils.saveToken(data.token)
			queryClient.invalidateQueries({ queryKey: ["auth"] })
			navigate("/app")
		},
		onError: (error) => {
			console.log(error)
		},
	});

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-[400px]">
				<CardHeader>
					<CardTitle>Sign in to your account</CardTitle>
					<CardDescription>Enter your details below to sign in to your account</CardDescription>
				</CardHeader>
				<Form {...form}>	
					<form onSubmit={form.handleSubmit((data) => signIn(data))}>
						<CardContent className="space-y-4">

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
							<Button type="submit" className="w-full" disabled={isPending}>
								{isPending ? <Loader2Icon className="w-4 h-4 mr-2" /> : null}
								Sign In
							</Button>
							<p className="text-sm text-gray-500">
								Don't have an account?{" "}
								<Link to="/auth/signup" className="text-primary hover:underline">
									Signup
								</Link>
							</p>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	)
}
