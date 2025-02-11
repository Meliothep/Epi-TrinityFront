import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { useProducts } from "../stores/products.store";
import { cartStore } from "../stores/cart.store";
import { Card } from "../components/common/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { useNavigate } from "@solidjs/router";
import {
	getProductImageUrl,
	getFallbackImageUrl,
	formatNutritionValue,
} from "../lib/utils";
import type { Product } from "../types/product.types";
import { ProductCard } from "../components/features/products/ProductCard";

const Products: Component = () => {
	const navigate = useNavigate();
	const { products, loading, error, fetchProducts, searchProducts } =
		useProducts();
	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedCategory, setSelectedCategory] = createSignal<string>("");
	const [selectedNutritionGrade, setSelectedNutritionGrade] =
		createSignal<string>("");
	const [selectedOrigin, setSelectedOrigin] = createSignal<string>("");
	const [selectedLabel, setSelectedLabel] = createSignal<string>("");

	// Get unique categories, origins, and labels from all products
	const categories = () => {
		const uniqueCategories = new Set<string>();
		products().forEach((product) => {
			product.categories.forEach((category) => uniqueCategories.add(category));
		});
		return Array.from(uniqueCategories).sort();
	};

	const origins = () => {
		const uniqueOrigins = new Set<string>();
		products().forEach((product) => {
			product.origins.forEach((origin) => uniqueOrigins.add(origin));
		});
		return Array.from(uniqueOrigins).sort();
	};

	const labels = () => {
		const uniqueLabels = new Set<string>();
		products().forEach((product) => {
			product.labels?.forEach((label) => uniqueLabels.add(label));
		});
		return Array.from(uniqueLabels).sort();
	};

	const filteredProducts = () => {
		let filtered = products();

		// Apply search filter
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

		// Apply category filter
		if (selectedCategory()) {
			filtered = filtered.filter((product) =>
				product.categories.includes(selectedCategory())
			);
		}

		// Apply nutrition grade filter
		if (selectedNutritionGrade()) {
			filtered = filtered.filter(
				(product) => product.nutrition_grade === selectedNutritionGrade()
			);
		}

		// Apply origin filter
		if (selectedOrigin()) {
			filtered = filtered.filter((product) =>
				product.origins.includes(selectedOrigin())
			);
		}

		// Apply label filter
		if (selectedLabel()) {
			filtered = filtered.filter((product) =>
				product.labels?.includes(selectedLabel())
			);
		}

		return filtered;
	};

	const handleSearch = (value: string) => {
		setSearchQuery(value);
		if (value.length >= 3) {
			searchProducts(value);
		} else if (value.length === 0) {
			fetchProducts();
		}
	};

	createEffect(() => {
		fetchProducts();
	});

	return (
		<div class="container mx-auto px-4 py-8">
			{/* Filters */}
			<div class="mb-8 space-y-4">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					<Input
						type="search"
						placeholder="Search products..."
						value={searchQuery()}
						onInput={(e) => handleSearch(e.currentTarget.value)}
					/>
					<Select
						value={selectedCategory()}
						onChange={(value) => setSelectedCategory(value)}
						options={categories().map((category) => ({
							label: category,
							value: category,
						}))}
						placeholder="Filter by category"
					/>
					<Select
						value={selectedNutritionGrade()}
						onChange={(value) => setSelectedNutritionGrade(value)}
						options={["a", "b", "c", "d", "e"].map((grade) => ({
							label: `Nutri-Score ${grade.toUpperCase()}`,
							value: grade,
						}))}
						placeholder="Filter by nutrition grade"
					/>
					<Select
						value={selectedOrigin()}
						onChange={(value) => setSelectedOrigin(value)}
						options={origins().map((origin) => ({
							label: origin,
							value: origin,
						}))}
						placeholder="Filter by origin"
					/>
					<Select
						value={selectedLabel()}
						onChange={(value) => setSelectedLabel(value)}
						options={labels().map((label) => ({
							label,
							value: label,
						}))}
						placeholder="Filter by label"
					/>
				</div>
				<div class="flex justify-between items-center">
					<div class="text-sm text-muted-foreground">
						{filteredProducts().length} products found
					</div>
					<Button
						variant="outline"
						onClick={() => {
							setSearchQuery("");
							setSelectedCategory("");
							setSelectedNutritionGrade("");
							setSelectedOrigin("");
							setSelectedLabel("");
							fetchProducts();
						}}
					>
						Clear filters
					</Button>
				</div>
			</div>

			{/* Error state */}
			<Show when={error()}>
				<div class="rounded-lg bg-destructive/10 p-4 text-destructive">
					{error()}
				</div>
			</Show>

			{/* Loading state */}
			<Show when={loading()}>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<For each={Array(8)}>
						{() => (
							<Card class="animate-pulse">
								<div class="aspect-square bg-muted rounded-t-lg" />
								<div class="p-4 space-y-3">
									<div class="h-4 bg-muted rounded w-3/4" />
									<div class="h-4 bg-muted rounded w-1/2" />
									<div class="h-4 bg-muted rounded w-1/4" />
								</div>
							</Card>
						)}
					</For>
				</div>
			</Show>

			{/* Product grid */}
			<Show when={!loading() && !error()}>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<For each={filteredProducts()}>
						{(product) => <ProductCard product={product} showQuickActions />}
					</For>
				</div>
			</Show>
		</div>
	);
};

export default Products;
