import { Component, createSignal } from "solid-js";
import { Button } from "../../ui/Button";
import { Input } from "../../forms/Input";
import { Card } from "../../common/Card";

export const LoginForm: Component = () => {
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [loading, setLoading] = createSignal(false);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setLoading(true);

		try {
			// TODO: Implement login logic
			console.log("Login attempt with:", {
				email: email(),
				password: password(),
			});
		} catch (error) {
			console.error("Login failed:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card class="w-full max-w-md mx-auto">
			<form onSubmit={handleSubmit} class="space-y-4">
				<h2 class="text-2xl font-bold text-center">Login</h2>

				<Input
					label="Email"
					type="email"
					value={email()}
					onInput={(e) => setEmail(e.currentTarget.value)}
					required
					placeholder="Enter your email"
				/>

				<Input
					label="Password"
					type="password"
					value={password()}
					onInput={(e) => setPassword(e.currentTarget.value)}
					required
					placeholder="Enter your password"
				/>

				<Button type="submit" class="w-full" disabled={loading()}>
					{loading() ? "Logging in..." : "Login"}
				</Button>
			</form>
		</Card>
	);
};
