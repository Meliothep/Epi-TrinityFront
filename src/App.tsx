import { Component, lazy, Show } from "solid-js";
import {
	Router,
	Route,
	RouteSectionProps,
	Navigate,
	useLocation,
} from "@solidjs/router";
import { Header } from "./components/layout/Header";
import { AdminLayout } from "./components/layout/AdminLayout";
import { authStore } from "./stores/auth.store";
import { adminStore } from "./stores/admin.store";
import { Spinner } from "./components/ui/Spinner";

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Categories = lazy(() => import("./pages/Categories"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Showcase = lazy(() => import("./pages/Showcase"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const Checkout = lazy(() => import("./pages/Checkout"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

// Protected Route Component
const ProtectedRoute: Component<RouteSectionProps> = (props) => {
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

// Admin Route Component
const AdminRoute: Component<RouteSectionProps> = (props) => {
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

	return <AdminLayout>{props.children}</AdminLayout>;
};

// Public Only Route Component (for login/register)
const PublicOnlyRoute: Component<RouteSectionProps> = (props) => {
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
			<Route path="/categories" component={Categories} />
			<Route path="/products/:id" component={ProductDetail} />

			{/* Public Only Routes */}
			<Route
				path="/login"
				component={() => (
					<PublicOnlyRoute>
						<Login />
					</PublicOnlyRoute>
				)}
			/>
			<Route
				path="/register"
				component={() => (
					<PublicOnlyRoute>
						<Register />
					</PublicOnlyRoute>
				)}
			/>

			{/* Protected Routes */}
			<Route
				path="/dashboard"
				component={() => (
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				)}
			/>
			<Route
				path="/profile"
				component={() => (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				)}
			/>
			<Route
				path="/orders"
				component={() => (
					<ProtectedRoute>
						<OrderHistory />
					</ProtectedRoute>
				)}
			/>
			<Route
				path="/checkout"
				component={() => (
					<ProtectedRoute>
						<Checkout />
					</ProtectedRoute>
				)}
			/>

			{/* Admin Routes */}
			<Route
				path="/admin"
				component={() => (
					<AdminRoute>
						<AdminDashboard />
					</AdminRoute>
				)}
			/>
			<Route
				path="/admin/users"
				component={() => (
					<AdminRoute>
						<AdminUsers />
					</AdminRoute>
				)}
			/>
			<Route
				path="/admin/products"
				component={() => (
					<AdminRoute>
						<AdminProducts />
					</AdminRoute>
				)}
			/>
			<Route
				path="/admin/orders"
				component={() => (
					<AdminRoute>
						<AdminOrders />
					</AdminRoute>
				)}
			/>
			<Route
				path="/admin/settings"
				component={() => (
					<AdminRoute>
						<AdminSettings />
					</AdminRoute>
				)}
			/>

			<Route path="/showcase" component={Showcase} />
			<Route path="*" component={NotFound} />
		</Router>
	);
};
