import { Component } from "solid-js";
import { Navigate, useLocation } from "@solidjs/router";
import { authStore } from "../stores/auth.store";
import { adminStore } from "../stores/admin.store";
import { Spinner } from "../components/ui/Spinner";

interface GuardProps {
	children: any;
}

export const AuthGuard: Component<GuardProps> = (props) => {
	const location = useLocation();

	// Show loading state while auth is being initialized
	if (!authStore.isInitialized) {
		return (
			<div class="flex items-center justify-center min-h-[60vh]">
				<Spinner size="lg" />
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!authStore.isAuthenticated) {
		return <Navigate href="/login" state={{ from: location.pathname }} />;
	}

	return <>{props.children}</>;
};

export const AdminGuard: Component<GuardProps> = (props) => {
	const location = useLocation();

	// Show loading state while auth is being initialized
	if (!authStore.isInitialized) {
		return (
			<div class="flex items-center justify-center min-h-[60vh]">
				<Spinner size="lg" />
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!authStore.isAuthenticated) {
		return <Navigate href="/login" state={{ from: location.pathname }} />;
	}

	// Redirect to home if not admin
	if (!adminStore.isAdmin()) {
		return <Navigate href="/" />;
	}

	return <>{props.children}</>;
};

export const PublicOnlyGuard: Component<GuardProps> = (props) => {
	const location = useLocation();
	const from = (location.state as any)?.from || "/dashboard";

	// Show loading state while auth is being initialized
	if (!authStore.isInitialized) {
		return (
			<div class="flex items-center justify-center min-h-[60vh]">
				<Spinner size="lg" />
			</div>
		);
	}

	// Redirect to previous location or dashboard if authenticated
	if (authStore.isAuthenticated) {
		return <Navigate href={from} />;
	}

	return <>{props.children}</>;
};
