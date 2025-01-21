import { Component, onMount } from "solid-js";
import { Button } from "../../ui/Button";
import { Card } from "../../common/Card";
import { Input } from "../../forms/Input";
import { Header } from "../../layout/Header";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { RegisterForm } from "../auth/RegisterForm";
import { CartItem } from "../cart/CartItem";
import { CartSummary } from "../cart/CartSummary";
import { useProducts } from "../../../stores/products.store";
import { useCart } from "../../../stores/cart.store";
import { DemoNavigation } from "../../layout/DemoNavigation";

// Sample data for cart demo
const sampleProducts = [
	{
		id: "headphones-1",
		name: "Premium Wireless Headphones",
		price: 299.99,
		description: "High-end wireless headphones with noise cancellation",
	},
	{
		id: "speaker-1",
		name: "Smart Bluetooth Speaker",
		price: 199.99,
		description: "Portable speaker with 360° sound and voice control",
	},
	{
		id: "earbuds-1",
		name: "True Wireless Earbuds",
		price: 149.99,
		description: "Compact earbuds with premium sound quality",
	},
];

export const FeatureShowcase: Component = () => {
	const { setProducts } = useProducts();
	const { cartItems, addToCart, updateQuantity } = useCart();

	// Initialize mock data with multiple products
	onMount(() => {
		setProducts(sampleProducts);
		// Add initial cart items
		addToCart(sampleProducts[0].id);
		addToCart(sampleProducts[1].id);
		updateQuantity(sampleProducts[1].id, 2);
	});

	return (
		<div class="min-h-screen bg-background text-foreground">
			<DemoNavigation />
			<Header sticky />

			<main class="container mx-auto px-4 py-8 space-y-12">
				<div class="max-w-3xl mx-auto text-center space-y-4">
					<h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
						Feature Showcase
					</h1>
					<p class="text-muted-foreground">
						Real-world examples of components working together in common UI
						patterns.
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

				{/* Shopping Cart Feature */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Shopping Cart</h2>
						<p class="text-muted-foreground">
							Full-featured shopping cart with real-time updates and order
							summary.
						</p>
					</div>

					<div class="grid gap-6 lg:grid-cols-3">
						<div class="lg:col-span-2 space-y-4">
							<h3 class="text-lg font-medium">Cart Items</h3>
							{cartItems().length === 0 ? (
								<Card padding="md" class="text-center text-muted-foreground">
									Your cart is empty
								</Card>
							) : (
								cartItems().map((item) => (
									<CartItem itemId={item.id} quantity={item.quantity} />
								))
							)}
						</div>
						<div class="lg:col-span-1">
							<h3 class="text-lg font-medium mb-4">Order Summary</h3>
							<CartSummary />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};
