import { Component } from "solid-js";
import { RegisterForm } from "../components/features/auth/RegisterForm";

const Register: Component = () => {
	return (
		<div class="container mx-auto px-4 py-16">
			<RegisterForm />
		</div>
	);
};

export default Register;
