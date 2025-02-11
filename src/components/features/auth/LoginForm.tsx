import { Component, createSignal, Show, createEffect } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import { Card } from "../../common/Card";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Checkbox } from "../../ui/Checkbox";
import { authStore } from "../../../stores/auth.store";
import { Spinner } from "../../ui/Spinner";

export const LoginForm: Component = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [remember, setRemember] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);
	const [isSubmitting, setIsSubmitting] = createSignal(false);

	// Store return URL when component mounts
	createEffect(() => {
		const returnUrl = (location.state as any)?.from || "/dashboard";
		sessionStorage.setItem("returnUrl", returnUrl);
	});

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			// Login will handle the redirect after refresh
			await authStore.login({
				email: email(),
				password: password(),
				remember: remember(),
			});

			// Clear form
			setEmail("");
			setPassword("");
			setRemember(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to login");
			setIsSubmitting(false);
		}
	};

	return (
		<Card class="w-full max-w-md mx-auto p-6 space-y-6">
			<div class="space-y-2 text-center">
				<h1 class="text-2xl font-bold">Welcome back</h1>
				<p class="text-sm text-muted-foreground">
					Enter your credentials to access your account
				</p>
			</div>

			<form onSubmit={handleSubmit} class="space-y-4">
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

				<div class="flex items-center space-x-2">
					<Checkbox
						id="remember"
						checked={remember()}
						onChange={(checked) => setRemember(checked)}
						disabled={isSubmitting()}
					/>
					<label
						for="remember"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Remember me
					</label>
				</div>

				<Show when={error()}>
					<p class="text-sm text-destructive">{error()}</p>
				</Show>

				<Button
					type="submit"
					class="w-full"
					disabled={isSubmitting() || authStore.isLoading}
				>
					<Show when={isSubmitting() || authStore.isLoading} fallback="Sign in">
						<Spinner class="mr-2" size="sm" />
						Signing in...
					</Show>
				</Button>
			</form>

			<div class="text-center text-sm">
				<span class="text-muted-foreground">Don't have an account? </span>
				<Button
					variant="link"
					class="p-0 h-auto font-normal"
					onClick={() => navigate("/register")}
					disabled={isSubmitting()}
				>
					Sign up
				</Button>
			</div>
		</Card>
	);
};
