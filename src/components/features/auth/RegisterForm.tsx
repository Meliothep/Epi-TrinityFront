import { Component, createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Card } from "../../common/Card";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { authStore } from "../../../stores/auth.store";
import { Spinner } from "../../ui/Spinner";

export const RegisterForm: Component = () => {
	const navigate = useNavigate();
	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [confirmPassword, setConfirmPassword] = createSignal("");
	const [error, setError] = createSignal<string | null>(null);
	const [isSubmitting, setIsSubmitting] = createSignal(false);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		// Validate passwords match
		if (password() !== confirmPassword()) {
			setError("Passwords do not match");
			setIsSubmitting(false);
			return;
		}

		try {
			// Register will handle the redirect after refresh
			await authStore.register({
				name: name(),
				email: email(),
				password: password(),
			});

			// Clear form
			setName("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to register");
			setIsSubmitting(false);
		}
	};

	return (
		<Card class="w-full max-w-md mx-auto p-6 space-y-6">
			<div class="space-y-2 text-center">
				<h1 class="text-2xl font-bold">Create an account</h1>
				<p class="text-sm text-muted-foreground">
					Enter your information to create your account
				</p>
			</div>

			<form onSubmit={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<label
						for="name"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Full Name
					</label>
					<Input
						id="name"
						type="text"
						value={name()}
						onInput={(e) => setName(e.currentTarget.value)}
						placeholder="John Doe"
						required
						disabled={isSubmitting()}
					/>
				</div>

				<div class="space-y-2">
					<label
						for="email"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Email
					</label>
					<Input
						id="email"
						type="email"
						value={email()}
						onInput={(e) => setEmail(e.currentTarget.value)}
						placeholder="m@example.com"
						required
						disabled={isSubmitting()}
					/>
				</div>

				<div class="space-y-2">
					<label
						for="password"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Password
					</label>
					<Input
						id="password"
						type="password"
						value={password()}
						onInput={(e) => setPassword(e.currentTarget.value)}
						placeholder="••••••••"
						required
						minLength={6}
						disabled={isSubmitting()}
					/>
				</div>

				<div class="space-y-2">
					<label
						for="confirm-password"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Confirm Password
					</label>
					<Input
						id="confirm-password"
						type="password"
						value={confirmPassword()}
						onInput={(e) => setConfirmPassword(e.currentTarget.value)}
						placeholder="••••••••"
						required
						minLength={6}
						disabled={isSubmitting()}
					/>
				</div>

				<Show when={error()}>
					<p class="text-sm text-destructive">{error()}</p>
				</Show>

				<Button
					type="submit"
					class="w-full"
					disabled={isSubmitting() || authStore.isLoading}
				>
					<Show
						when={isSubmitting() || authStore.isLoading}
						fallback="Create account"
					>
						<Spinner class="mr-2" size="sm" />
						Creating account...
					</Show>
				</Button>
			</form>

			<div class="text-center text-sm">
				<span class="text-muted-foreground">Already have an account? </span>
				<Button
					variant="link"
					class="p-0 h-auto font-normal"
					onClick={() => navigate("/login")}
					disabled={isSubmitting()}
				>
					Sign in
				</Button>
			</div>
		</Card>
	);
};
