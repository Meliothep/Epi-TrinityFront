import { Component } from "solid-js";
import { LoginForm } from "../components/features/auth/LoginForm";

const Login: Component = () => {
	return (
		<div class="container mx-auto px-4 py-16">
			<LoginForm />
		</div>
	);
};

export default Login;
