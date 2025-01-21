import { Component, createSignal, Show } from "solid-js";
import { Card } from "../../common/Card";
import { Input } from "../../forms/Input";
import { Button } from "../../ui/Button";

export const RegisterForm: Component = () => {
	const [isLoading, setIsLoading] = createSignal(false);
	const [formError, setFormError] = createSignal<string | null>(null);
	const [isPasswordVisible, setIsPasswordVisible] = createSignal(false);
	const [password, setPassword] = createSignal("");
	const [confirmPassword, setConfirmPassword] = createSignal("");

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setFormError(null);
		setIsLoading(true);

		// Basic validation
		if (password() !== confirmPassword()) {
			setFormError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		try {
			// TODO: Implement actual registration logic here
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			setPassword("");
			setConfirmPassword("");
			// TODO: Redirect to login or dashboard
		} catch (error) {
			setFormError("Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleTogglePassword = (e: MouseEvent) => {
		e.preventDefault();
		console.log("Toggle password visibility", { before: isPasswordVisible() });
		setIsPasswordVisible((prev) => !prev);
		console.log("After toggle:", { after: isPasswordVisible() });
	};

	const PasswordToggle = () => (
		<button
			type="button"
			onClick={handleTogglePassword}
			class="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm p-1"
			aria-label={isPasswordVisible() ? "Hide password" : "Show password"}
			title={isPasswordVisible() ? "Hide password" : "Show password"}
		>
			<Show
				when={isPasswordVisible()}
				fallback={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5"
						aria-hidden="true"
						role="img"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
					aria-hidden="true"
					role="img"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
					/>
				</svg>
			</Show>
		</button>
	);

	return (
		<Card class="w-full max-w-md mx-auto">
			<div class="space-y-6">
				<div class="text-center">
					<h1 class="text-2xl font-semibold">Create an Account</h1>
					<p class="text-sm text-muted-foreground mt-2">
						Enter your details below to create your account
					</p>
				</div>

				<form onSubmit={handleSubmit} class="space-y-4">
					{formError() && (
						<div
							class="bg-destructive/15 text-destructive text-sm p-3 rounded-md"
							role="alert"
						>
							{formError()}
						</div>
					)}

					<div class="grid gap-4 md:grid-cols-2">
						<Input
							label="First Name"
							name="firstName"
							required
							placeholder="John"
							autocomplete="given-name"
							aria-label="First name"
						/>
						<Input
							label="Last Name"
							name="lastName"
							required
							placeholder="Doe"
							autocomplete="family-name"
							aria-label="Last name"
						/>
					</div>

					<Input
						label="Email"
						name="email"
						type="email"
						required
						placeholder="you@example.com"
						autocomplete="email"
						aria-label="Email address"
					/>

					<div class="relative space-y-2">
						<div class="flex items-center justify-between">
							<label class="text-sm font-medium">Password</label>
							<button
								type="button"
								onClick={() => setIsPasswordVisible(!isPasswordVisible())}
								class="text-sm text-muted-foreground hover:text-foreground"
							>
								{isPasswordVisible() ? "Hide" : "Show"} password
							</button>
						</div>
						<input
							type={isPasswordVisible() ? "text" : "password"}
							value={password()}
							onInput={(e) => setPassword(e.currentTarget.value)}
							required
							placeholder="Create a password"
							minLength={8}
							autocomplete="new-password"
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						/>
						<p class="text-sm text-muted-foreground">
							Must be at least 8 characters
						</p>
					</div>

					<div class="relative space-y-2">
						<div class="flex items-center justify-between">
							<label class="text-sm font-medium">Confirm Password</label>
							<button
								type="button"
								onClick={() => setIsPasswordVisible(!isPasswordVisible())}
								class="text-sm text-muted-foreground hover:text-foreground"
							>
								{isPasswordVisible() ? "Hide" : "Show"} password
							</button>
						</div>
						<input
							type={isPasswordVisible() ? "text" : "password"}
							value={confirmPassword()}
							onInput={(e) => setConfirmPassword(e.currentTarget.value)}
							required
							placeholder="Confirm your password"
							autocomplete="new-password"
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</div>

					<div class="space-y-4">
						<label class="flex items-center gap-2">
							<input
								type="checkbox"
								name="terms"
								required
								class="rounded border-input bg-background"
							/>
							<span class="text-sm">
								I agree to the{" "}
								<Button
									variant="link"
									class="h-auto p-0"
									onClick={(e) => {
										e.preventDefault();
										// TODO: Open terms modal or navigate to terms page
									}}
								>
									Terms of Service
								</Button>{" "}
								and{" "}
								<Button
									variant="link"
									class="h-auto p-0"
									onClick={(e) => {
										e.preventDefault();
										// TODO: Open privacy modal or navigate to privacy page
									}}
								>
									Privacy Policy
								</Button>
							</span>
						</label>

						<Button
							type="submit"
							class="w-full"
							disabled={isLoading()}
							loading={isLoading()}
						>
							{isLoading() ? "Creating Account..." : "Create Account"}
						</Button>

						<p class="text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<Button
								variant="link"
								class="h-auto p-0"
								onClick={(e) => {
									e.preventDefault();
									// TODO: Navigate to login page
								}}
							>
								Sign in
							</Button>
						</p>
					</div>
				</form>
			</div>
		</Card>
	);
};
