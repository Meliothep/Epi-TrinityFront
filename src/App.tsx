import { Component, lazy } from "solid-js";
import { Router, Route, RouteSectionProps } from "@solidjs/router";
import { Header } from "./components/layout/Header";

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Showcase = lazy(() => import("./pages/Showcase"));

// Root layout component
const RootLayout: Component<RouteSectionProps> = (props) => {
	return (
		<div class="min-h-screen bg-background text-foreground">
			<Header sticky />
			<main>{props.children}</main>
		</div>
	);
};

export const App: Component = () => {
	return (
		<Router root={RootLayout}>
			<Route path="/" component={Home} />
			<Route path="/products" component={Products} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/profile" component={Profile} />
			<Route path="/showcase" component={Showcase} />
			<Route path="*" component={NotFound} />
		</Router>
	);
};
