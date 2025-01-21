import { Component, createEffect, Show } from "solid-js";
import { useProducts } from "../stores/products.store";
import { cartStore } from "../stores/cart.store";
import { Card } from "../components/common/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/forms/Input";

const Products: Component = () => {
	const { products, loading, error, fetchProducts, searchProducts } =
		useProducts();

	// Fetch products on mount
	createEffect(() => {
		fetchProducts();
	});

	return (
		<div class="container mx-auto px-4 py-8">
			<div class="space-y-8">
				<div>
					<h1 class="text-3xl font-bold">Products</h1>
					<p class="text-muted-foreground mt-2">
						Browse our collection of products
					</p>
				</div>

				{/* Search */}
				<div class="flex gap-4">
					<Input
						placeholder="Search products..."
						onChange={(e) => searchProducts(e.currentTarget.value)}
						class="max-w-sm"
					/>
				</div>

				<Show
					when={!loading()}
					fallback={
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array(6)
								.fill(0)
								.map(() => (
									<Card padding="lg">
										<div class="aspect-square mb-4 bg-muted animate-pulse rounded-md" />
										<div class="space-y-3">
											<div class="h-4 bg-muted animate-pulse rounded w-3/4" />
											<div class="h-4 bg-muted animate-pulse rounded w-1/2" />
											<div class="h-8 bg-muted animate-pulse rounded w-full mt-4" />
										</div>
									</Card>
								))}
						</div>
					}
				>
					<Show
						when={!error()}
						fallback={
							<div class="text-center py-8 text-destructive">
								Error: {error()}
							</div>
						}
					>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{products().map((product) => (
								<Card padding="lg">
									<div class="aspect-square mb-4">
										<img
											src={product.image || "https://via.placeholder.com/400"}
											alt={product.name}
											class="w-full h-full object-cover rounded-md"
										/>
									</div>
									<h2 class="text-xl font-semibold mb-2">{product.name}</h2>
									<p class="text-muted-foreground mb-4">
										{product.description}
									</p>
									<div class="flex items-center justify-between">
										<span class="text-lg font-bold">
											${product.price.toFixed(2)}
										</span>
										<Button onClick={() => cartStore.addToCart(product.id)}>
											Add to Cart
										</Button>
									</div>
								</Card>
							))}
						</div>
					</Show>
				</Show>
			</div>
		</div>
	);
};

export default Products;
