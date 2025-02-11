import { Component, createSignal, createEffect, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/forms/Input";
import { Spinner } from "../../components/ui/Spinner";
import { adminStore } from "../../stores/admin.store";
import { useProducts } from "../../stores/products.store";
import {
	getProductImageUrl,
	getFallbackImageUrl,
	formatPrice,
} from "../../lib/utils";
import type { Product } from "../../types/product.types";
import {
	FiEdit2,
	FiTrash2,
	FiPlus,
	FiAlertCircle,
	FiFilter,
} from "solid-icons/fi";

const Products: Component = () => {
	const navigate = useNavigate();
	const { products, loading, error, fetchProducts } = useProducts();
	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedCategory, setSelectedCategory] = createSignal<string>("");
	const [selectedNutritionGrade, setSelectedNutritionGrade] =
		createSignal<string>("");

	// Get unique categories from products
	const categories = () => {
		const uniqueCategories = new Set<string>();
		products().forEach((product) => {
			product.categories.forEach((category) => uniqueCategories.add(category));
		});
		return Array.from(uniqueCategories).sort();
	};

	// Filter products based on search and filters
	const filteredProducts = () => {
		let filtered = products();

		// Filter by search query
		if (searchQuery()) {
			const query = searchQuery().toLowerCase();
			filtered = filtered.filter(
				(product) =>
					product.product_name.toLowerCase().includes(query) ||
					product.brands.some((brand) => brand.toLowerCase().includes(query)) ||
					product.categories.some((category) =>
						category.toLowerCase().includes(query)
					)
			);
		}

		// Filter by category
		if (selectedCategory()) {
			filtered = filtered.filter((product) =>
				product.categories.includes(selectedCategory())
			);
		}

		// Filter by nutrition grade
		if (selectedNutritionGrade()) {
			filtered = filtered.filter(
				(product) => product.nutrition_grade === selectedNutritionGrade()
			);
		}

		return filtered;
	};

	const handleEditProduct = (productId: string) => {
		if (!adminStore.hasPermission("products", "edit")) return;
		navigate(`/admin/products/${productId}/edit`);
	};

	const handleDeleteProduct = async (productId: string) => {
		if (!adminStore.hasPermission("products", "delete")) return;

		if (!confirm("Are you sure you want to delete this product?")) return;

		try {
			// In a real app, this would be an API call
			// For now, we'll just reload the products
			await fetchProducts();
			// Show success message
		} catch (err) {
			// Show error message
			console.error("Error deleting product:", err);
		}
	};

	return (
		<div class="space-y-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold">Products</h1>
					<p class="text-muted-foreground">Manage product catalog</p>
				</div>

				<Show when={adminStore.hasPermission("products", "create")}>
					<Button onClick={() => navigate("/admin/products/new")}>
						<FiPlus class="mr-2 h-4 w-4" />
						Add Product
					</Button>
				</Show>
			</div>

			{/* Filters */}
			<Card class="p-4">
				<div class="grid gap-4 md:grid-cols-3">
					<Input
						placeholder="Search products..."
						value={searchQuery()}
						onInput={(e) => setSearchQuery(e.currentTarget.value)}
					/>
					<select
						value={selectedCategory()}
						onChange={(e) => setSelectedCategory(e.currentTarget.value)}
						class="px-3 py-1.5 rounded-md border bg-background"
						aria-label="Filter by category"
					>
						<option value="">All Categories</option>
						<For each={categories()}>
							{(category) => <option value={category}>{category}</option>}
						</For>
					</select>
					<select
						value={selectedNutritionGrade()}
						onChange={(e) => setSelectedNutritionGrade(e.currentTarget.value)}
						class="px-3 py-1.5 rounded-md border bg-background"
						aria-label="Filter by nutrition grade"
					>
						<option value="">All Grades</option>
						<option value="a">Grade A</option>
						<option value="b">Grade B</option>
						<option value="c">Grade C</option>
						<option value="d">Grade D</option>
						<option value="e">Grade E</option>
					</select>
				</div>
			</Card>

			{/* Loading State */}
			<Show when={loading()}>
				<div class="flex justify-center py-12">
					<Spinner size="lg" />
				</div>
			</Show>

			{/* Error State */}
			<Show when={error()}>
				<Card class="p-6">
					<div class="flex flex-col items-center text-center space-y-4">
						<div class="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
							<FiAlertCircle class="h-6 w-6 text-destructive" />
						</div>
						<div>
							<p class="text-destructive font-medium">{error()}</p>
							<Button
								variant="outline"
								class="mt-4"
								onClick={() => fetchProducts()}
							>
								Try Again
							</Button>
						</div>
					</div>
				</Card>
			</Show>

			{/* Products Grid */}
			<Show when={!loading() && !error()}>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Show
						when={filteredProducts().length > 0}
						fallback={
							<div class="col-span-full">
								<Card class="p-8 text-center text-muted-foreground">
									No products found
								</Card>
							</div>
						}
					>
						<For each={filteredProducts()}>
							{(product) => (
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
										{/* Nutrition Grade Badge */}
										<Show
											when={
												product.nutrition_grade &&
												product.nutrition_grade !== "not-applicable"
											}
										>
											<div class="absolute top-2 right-2">
												<span
													class={cn(
														"inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg text-white",
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
													)}
												>
													{product.nutrition_grade === "unknown"
														? "?"
														: product.nutrition_grade.toUpperCase()}
												</span>
											</div>
										</Show>
									</div>

									<div class="p-4">
										<div class="space-y-1 mb-4">
											<h3 class="font-semibold line-clamp-1">
												{product.product_name}
											</h3>
											<p class="text-sm text-muted-foreground line-clamp-1">
												{product.brands.join(", ")}
											</p>
											<p class="text-sm font-medium text-primary">
												{formatPrice(product.price)}
											</p>
										</div>

										<div class="flex justify-end gap-2">
											<Show when={adminStore.hasPermission("products", "edit")}>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleEditProduct(product.id)}
												>
													<FiEdit2 class="h-4 w-4" />
												</Button>
											</Show>
											<Show
												when={adminStore.hasPermission("products", "delete")}
											>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleDeleteProduct(product.id)}
													class="text-destructive hover:text-destructive/90"
												>
													<FiTrash2 class="h-4 w-4" />
												</Button>
											</Show>
										</div>
									</div>
								</Card>
							)}
						</For>
					</Show>
				</div>
			</Show>
		</div>
	);
};

export default Products;
