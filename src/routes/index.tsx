import { Component } from "solid-js";
import { Route } from "@solidjs/router";
import { publicRoutes } from "./public/routes";
import { protectedRoutes } from "./protected/routes";
import { adminRoutes } from "./admin/routes";
import { AuthGuard, AdminGuard, PublicOnlyGuard } from "./guards";
import { AppRoute } from "./types";

const wrapRoute = (route: AppRoute) => {
	const RouteComponent = route.component;

	let WrappedComponent: Component = (props) => <RouteComponent {...props} />;

	if (route.requiresAdmin) {
		WrappedComponent = () => (
			<AdminGuard>
				<RouteComponent />
			</AdminGuard>
		);
	} else if (route.requiresAuth) {
		WrappedComponent = () => (
			<AuthGuard>
				<RouteComponent />
			</AuthGuard>
		);
	} else if (route.path === "/login" || route.path === "/register") {
		WrappedComponent = () => (
			<PublicOnlyGuard>
				<RouteComponent />
			</PublicOnlyGuard>
		);
	}

	return <Route {...route} component={WrappedComponent} />;
};

export const AppRoutes: Component = () => {
	return (
		<>{[...publicRoutes, ...protectedRoutes, ...adminRoutes].map(wrapRoute)}</>
	);
};
