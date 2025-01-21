import { Component, createEffect } from "solid-js";
import { Button } from "../components/ui/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/forms/Input";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { RegisterForm } from "../components/features/auth/RegisterForm";
import { CartItem } from "../components/features/cart/CartItem";
import { CartSummary } from "../components/features/cart/CartSummary";
import { useProducts } from "../stores/products.store";
import { cartStore } from "../stores/cart.store";

const Showcase: Component = () => {
	const { products, fetchProducts } = useProducts();

	// Load products on mount
	createEffect(() => {
		fetchProducts();
	});

	return (
		<div class="container mx-auto px-4 py-8 space-y-12">
			<div class="max-w-3xl mx-auto text-center space-y-4">
				<h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
					Component Showcase
				</h1>
				<p class="text-muted-foreground">
					A demonstration of our cart functionality and components
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

			{/* Shopping Cart Demo */}
			<section class="space-y-8">
				<div class="text-center space-y-2">
					<h2 class="text-2xl font-semibold">Shopping Cart</h2>
					<p class="text-muted-foreground">
						Try adding some products to the cart and see how it works
					</p>
				</div>

				<div class="grid gap-6 lg:grid-cols-3">
					{/* Product List */}
					<div class="lg:col-span-2 space-y-4">
						<h3 class="text-lg font-medium">Available Products</h3>
						<div class="grid gap-4 sm:grid-cols-2">
							{products().map((product) => (
								<Card padding="lg">
									<div class="aspect-square mb-4">
										<img
											src={product.image}
											alt={product.name}
											class="w-full h-full object-cover rounded-md"
										/>
									</div>
									<h4 class="text-lg font-semibold mb-2">{product.name}</h4>
									<p class="text-muted-foreground text-sm mb-4">
										{product.description}
									</p>
									<div class="flex items-center justify-between">
										<span class="font-medium">${product.price.toFixed(2)}</span>
										<Button
											variant="default"
											onClick={() => cartStore.addToCart(product.id)}
										>
											Add to Cart
										</Button>
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
		</div>
	);
};

export default Showcase;
