import { Component, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Button } from "../components/ui/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/forms/Input";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { RegisterForm } from "../components/features/auth/RegisterForm";
import { CartItem } from "../components/features/cart/CartItem";
import { CartSummary } from "../components/features/cart/CartSummary";
import { useProducts } from "../stores/products.store";
import { cartStore } from "../stores/cart.store";
import { getProductImageUrl, getFallbackImageUrl } from "../lib/utils";
import { authStore } from "../stores/auth.store";
import { adminStore } from "../stores/admin.store";
import { Spinner } from "../components/ui/Spinner";
import { Show } from "solid-js/web";

const Showcase: Component = () => {
	const navigate = useNavigate();
	const { products, fetchProducts } = useProducts();

	// Load products on mount
	createEffect(() => {
		fetchProducts();
	});

	// Test user credentials
	const testUsers = [
		{
			title: "Super Admin",
			email: "admin@trinity.com",
			password: "admin123",
			description: "Full access to all admin features",
		},
		{
			title: "Store Admin",
			email: "manager@trinity.com",
			password: "manager123",
			description: "Limited admin access",
		},
		{
			title: "Regular User",
			email: "user@trinity.com",
			password: "user123",
			description: "Standard user access",
		},
		{
			title: "Inactive User",
			email: "inactive@trinity.com",
			password: "inactive123",
			description: "Account disabled",
		},
	];

	const handleTestLogin = async (email: string, password: string) => {
		try {
			await authStore.login({ email, password, remember: false });
			// The page will refresh automatically
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div class="container mx-auto px-4 py-8 space-y-12">
			<div class="max-w-3xl mx-auto text-center space-y-4">
				<h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
					Component Showcase
				</h1>
				<p class="text-muted-foreground">
					A demonstration of our components and functionality
				</p>
			</div>

			{/* Theme Toggle Feature */}
			<section class="space-y-6">
				<div class="flex flex-col items-center text-center space-y-2">
					<h2 class="text-2xl font-semibold">Theme Customization</h2>
					<p class="text-muted-foreground">
						Dynamic theme switching with smooth transitions and persistent
						preferences.
					</p>
				</div>
				<Card class="overflow-hidden">
					<div class="p-6 flex justify-center">
						<ThemeToggle />
					</div>
				</Card>
			</section>

			{/* Authentication Forms */}
			<section class="space-y-6">
				<div class="flex flex-col items-center text-center space-y-2">
					<h2 class="text-2xl font-semibold">Authentication Forms</h2>
					<p class="text-muted-foreground">
						Secure and user-friendly authentication with validation.
					</p>
				</div>

				<div class="grid gap-6 md:grid-cols-2">
					{/* Login Form */}
					<Card class="hover:shadow-xl transition-shadow">
						<div class="space-y-4">
							<h3 class="text-xl font-medium text-center">Login</h3>
							<form class="space-y-4">
								<Input
									label="Email"
									type="email"
									required
									placeholder="Enter your email"
								/>
								<Input
									label="Password"
									type="password"
									required
									placeholder="Enter your password"
								/>
								<div class="flex items-center justify-between">
									<Button variant="outline" size="sm">
										Forgot password?
									</Button>
									<Button type="submit">Login</Button>
								</div>
							</form>
						</div>
					</Card>

					{/* Registration Form */}
					<Card class="hover:shadow-xl transition-shadow">
						<div class="space-y-4">
							<h3 class="text-xl font-medium text-center">Register</h3>
							<RegisterForm />
						</div>
					</Card>
				</div>
			</section>

			{/* Product Display Demo */}
			<section class="space-y-8">
				<div class="text-center space-y-2">
					<h2 class="text-2xl font-semibold">Product Display</h2>
					<p class="text-muted-foreground">
						Example of how products are displayed in our application
					</p>
				</div>

				<div class="grid gap-6 lg:grid-cols-3">
					{/* Product List */}
					<div class="lg:col-span-2 space-y-4">
						<h3 class="text-lg font-medium">Available Products</h3>
						<div class="grid gap-4 sm:grid-cols-2">
							{products()
								.slice(0, 4)
								.map((product) => (
									<Card class="overflow-hidden">
										<div class="aspect-square relative">
											<img
												src={
													getProductImageUrl(product.code) ||
													getFallbackImageUrl(product.product_name)
												}
												alt={product.product_name}
												class="w-full h-full object-cover"
												onError={(e) => {
													(e.target as HTMLImageElement).src =
														getFallbackImageUrl(product.product_name);
												}}
											/>
											{product.nutrition_grade && (
												<div class="absolute top-2 right-2">
													<span
														class={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg text-white ${
															product.nutrition_grade === "unknown"
																? "bg-gray-500"
																: product.nutrition_grade === "a"
																? "bg-green-500"
																: product.nutrition_grade === "b"
																? "bg-lime-500"
																: product.nutrition_grade === "c"
																? "bg-yellow-500"
																: product.nutrition_grade === "d"
																? "bg-orange-500"
																: "bg-red-500"
														}`}
													>
														{product.nutrition_grade === "unknown"
															? "?"
															: product.nutrition_grade.toUpperCase()}
													</span>
												</div>
											)}
										</div>
										<div class="p-4">
											<h4 class="text-lg font-semibold mb-2">
												{product.product_name}
											</h4>
											<p class="text-muted-foreground text-sm mb-4">
												{product.generic_name || product.categories[0]}
											</p>
											<div class="flex items-center justify-between">
												<span class="text-sm text-muted-foreground">
													{product.quantity}
												</span>
												<Button
													variant="default"
													onClick={(e) => {
														e.stopPropagation();
														cartStore.addItem(product);
													}}
												>
													Add to Cart
												</Button>
											</div>
										</div>
									</Card>
								))}
						</div>
					</div>

					{/* Cart Summary */}
					<div>
						<h3 class="text-lg font-medium mb-4">Your Cart</h3>
						<CartSummary />
					</div>
				</div>
			</section>

			{/* Role Testing Section */}
			<section class="space-y-6">
				<div class="flex flex-col items-center text-center space-y-2">
					<h2 class="text-2xl font-semibold">Role Testing</h2>
					<p class="text-muted-foreground">
						Test different user roles and access levels
					</p>
				</div>

				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<For each={testUsers}>
						{(user) => (
							<Card class="p-6 space-y-4">
								<div class="space-y-2">
									<h3 class="text-lg font-semibold">{user.title}</h3>
									<p class="text-sm text-muted-foreground">
										{user.description}
									</p>
								</div>
								<div class="space-y-2">
									<p class="text-sm">
										<span class="font-medium">Email:</span> {user.email}
									</p>
									<p class="text-sm">
										<span class="font-medium">Password:</span> {user.password}
									</p>
								</div>
								<Button
									class="w-full"
									onClick={() => handleTestLogin(user.email, user.password)}
									disabled={authStore.isLoading}
								>
									<Show
										when={!authStore.isLoading}
										fallback={
											<>
												<Spinner class="mr-2" size="sm" />
												Signing in...
											</>
										}
									>
										Test Login
									</Show>
								</Button>
							</Card>
						)}
					</For>
				</div>

				<Show when={authStore.isAuthenticated}>
					<Card class="p-6">
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<div>
									<h3 class="text-lg font-semibold">Current User</h3>
									<p class="text-sm text-muted-foreground">
										Logged in as {authStore.currentUser?.name}
									</p>
								</div>
								<Button
									variant="destructive"
									onClick={() => authStore.logout()}
								>
									Sign Out
								</Button>
							</div>

							<div class="space-y-2">
								<p class="text-sm">
									<span class="font-medium">Role:</span>{" "}
									{authStore.currentUser?.role}
								</p>
								<p class="text-sm">
									<span class="font-medium">Status:</span>{" "}
									{authStore.currentUser?.isActive ? "Active" : "Inactive"}
								</p>
								<p class="text-sm">
									<span class="font-medium">Is Admin:</span>{" "}
									{adminStore.isAdmin() ? "Yes" : "No"}
								</p>
								<p class="text-sm">
									<span class="font-medium">Is Super Admin:</span>{" "}
									{adminStore.isSuperAdmin() ? "Yes" : "No"}
								</p>
							</div>

							<div class="space-y-2">
								<h4 class="font-medium">Available Routes:</h4>
								<div class="grid gap-2">
									<Button
										variant="outline"
										onClick={() => navigate("/profile")}
									>
										Profile Page
									</Button>
									<Show when={adminStore.isAdmin()}>
										<Button
											variant="outline"
											onClick={() => navigate("/admin")}
										>
											Admin Dashboard
										</Button>
									</Show>
								</div>
							</div>
						</div>
					</Card>
				</Show>
			</section>
		</div>
	);
};

export default Showcase;
