import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useProducts } from "../stores/products.store";
import { Card } from "../components/common/Card";
import { Input } from "../components/ui/Input";
import { getFallbackImageUrl } from "../lib/utils";

interface CategoryStats {
	name: string;
	count: number;
	products: string[];
	image?: string;
}

const Categories: Component = () => {
	const navigate = useNavigate();
	const { products, loading, error, fetchProducts } = useProducts();
	const [searchQuery, setSearchQuery] = createSignal("");

	// Get category statistics from products
	const categoryStats = () => {
		const stats = new Map<string, CategoryStats>();

		products().forEach((product) => {
			product.categories.forEach((category) => {
				const existing = stats.get(category) || {
					name: category,
					count: 0,
					products: [],
					image: undefined,
				};

				existing.count++;
				existing.products.push(product.id);

				// Use the first product's image as the category image if not set
				if (!existing.image && product.image_url) {
					existing.image = product.image_url;
				}

				stats.set(category, existing);
			});
		});

		return Array.from(stats.values());
	};

	// Filter categories based on search query
	const filteredCategories = () => {
		const query = searchQuery().toLowerCase();
		return categoryStats()
			.filter(
				(category) => !query || category.name.toLowerCase().includes(query)
			)
			.sort((a, b) => b.count - a.count); // Sort by count descending
	};

	createEffect(() => {
		fetchProducts();
	});

	return (
		<div class="container mx-auto px-4 py-8">
			{/* Search */}
			<div class="mb-8 space-y-4">
				<Input
					type="search"
					placeholder="Search categories..."
					value={searchQuery()}
					onInput={(e) => setSearchQuery(e.currentTarget.value)}
				/>
				<div class="text-sm text-muted-foreground">
					{filteredCategories().length} categories found
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
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<For each={Array(8)}>
						{() => (
							<Card class="animate-pulse">
								<div class="aspect-video bg-muted rounded-t-lg" />
								<div class="p-4 space-y-3">
									<div class="h-4 bg-muted rounded w-3/4" />
									<div class="h-4 bg-muted rounded w-1/4" />
								</div>
							</Card>
						)}
					</For>
				</div>
			</Show>

			{/* Categories grid */}
			<Show when={!loading() && !error()}>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<For each={filteredCategories()}>
						{(category) => (
							<Card
								class="cursor-pointer transition-transform hover:scale-[1.02]"
								onClick={() =>
									navigate(
										`/products?category=${encodeURIComponent(category.name)}`
									)
								}
							>
								<div class="aspect-video relative">
									<img
										src={category.image || getFallbackImageUrl(category.name)}
										alt={category.name}
										class="w-full h-full object-cover rounded-t-lg"
										onError={(e) => {
											(e.target as HTMLImageElement).src = getFallbackImageUrl(
												category.name
											);
										}}
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
									<div class="absolute bottom-0 left-0 right-0 p-4">
										<h3 class="text-white font-semibold text-lg line-clamp-1">
											{category.name}
										</h3>
									</div>
								</div>
								<div class="p-4">
									<p class="text-sm text-muted-foreground">
										{category.count}{" "}
										{category.count === 1 ? "product" : "products"}
									</p>
								</div>
							</Card>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
};

export default Categories;
