import { Component, createEffect, createResource, Show } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { useProducts } from "../stores/products.store";
import { cartStore } from "../stores/cart.store";
import { favoritesStore } from "../stores/favorites.store";
import { Button } from "../components/ui/Button";
import { Card } from "../components/common/Card";
import {
	getProductImageUrl,
	getFallbackImageUrl,
	formatNutritionValue,
	formatPrice,
} from "../lib/utils";
import type { Product } from "../types/product.types";
import { FiHeart } from "solid-icons/fi";

const ProductDetail: Component = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { getProduct, retrying } = useProducts();

	const [product, { refetch }] = createResource(
		() => params.id,
		async (id: string) => {
			const data = await getProduct(id);
			if (!data) throw new Error("Product not found");
			return data as Product;
		}
	);

	createEffect(() => {
		if (product.state === "ready" && !product()) {
			navigate("/products", { replace: true });
		}
	});

	return (
		<div class="container mx-auto px-4 py-8">
			<Show
				when={!product.error}
				fallback={
					<div class="max-w-4xl mx-auto">
						<Button
							variant="ghost"
							class="mb-6"
							onClick={() => navigate("/products")}
						>
							← Back to Products
						</Button>
						<Card class="p-6">
							<div class="text-center py-8 space-y-4">
								<p class="text-destructive text-lg">
									{product.error?.message || "Error loading product"}
								</p>
								<Show when={retrying()}>
									<p class="text-muted-foreground">
										Attempting to reconnect...
									</p>
								</Show>
								<Button
									variant="outline"
									onClick={() => refetch()}
									disabled={retrying()}
								>
									Try Again
								</Button>
							</div>
						</Card>
					</div>
				}
			>
				<Show
					when={product()}
					keyed
					fallback={
						<div class="flex justify-center">
							<div class="animate-pulse space-y-8 w-full max-w-4xl">
								<div class="h-10 w-32 bg-muted rounded" />
								<Card class="p-6">
									<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div class="aspect-square bg-muted rounded-lg" />
										<div class="space-y-6">
											<div>
												<div class="h-8 bg-muted rounded w-3/4 mb-4" />
												<div class="h-4 bg-muted rounded w-full" />
												<div class="h-4 bg-muted rounded w-2/3 mt-2" />
											</div>
											<div class="h-8 bg-muted rounded w-1/3" />
											<div class="h-12 bg-muted rounded w-full" />
										</div>
									</div>
								</Card>
							</div>
						</div>
					}
				>
					{(data) => (
						<div class="max-w-4xl mx-auto">
							<Button
								variant="ghost"
								class="mb-6"
								onClick={() => navigate("/products")}
							>
								← Back to Products
							</Button>

							<Card class="p-6">
								<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
									{/* Product Image */}
									<div class="aspect-square relative">
										<img
											src={
												getProductImageUrl(data.code) ||
												getFallbackImageUrl(data.product_name)
											}
											alt={data.product_name}
											class="w-full h-full object-cover rounded-lg"
											onError={(e) => {
												(e.target as HTMLImageElement).src =
													getFallbackImageUrl(data.product_name);
											}}
										/>
										{/* Nutrition Grade Badge */}
										<Show
											when={
												data.nutrition_grade &&
												data.nutrition_grade !== "not-applicable"
											}
										>
											<div class="absolute top-2 right-2">
												<span
													class={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl text-white ${
														data.nutrition_grade === "unknown"
															? "bg-gray-500"
															: data.nutrition_grade === "a"
															? "bg-green-500"
															: data.nutrition_grade === "b"
															? "bg-lime-500"
															: data.nutrition_grade === "c"
															? "bg-yellow-500"
															: data.nutrition_grade === "d"
															? "bg-orange-500"
															: "bg-red-500"
													}`}
												>
													{data.nutrition_grade === "unknown"
														? "?"
														: data.nutrition_grade.toUpperCase()}
												</span>
											</div>
										</Show>
									</div>

									{/* Product Info */}
									<div class="space-y-6">
										{/* Basic Info */}
										<div>
											<h1 class="text-3xl font-bold mb-2">
												{data.product_name}
											</h1>
											<p class="text-muted-foreground">
												{data.generic_name || data.categories?.[0]}
											</p>
											<div class="mt-2 text-sm text-muted-foreground">
												{data.quantity}
											</div>
										</div>

										{/* Price and Actions */}
										<div class="space-y-4">
											<div class="flex items-center gap-4">
												<span class="text-3xl font-bold text-primary">
													{formatPrice(data.price)}
												</span>
												<Show when={data.quantity}>
													<span class="text-sm text-muted-foreground">
														per {data.quantity}
													</span>
												</Show>
											</div>
											<div class="flex gap-4">
												<Button
													size="lg"
													class="flex-1"
													onClick={() => cartStore.addToCart(data.id)}
												>
													Add to Cart
												</Button>
												<Button
													size="lg"
													variant="outline"
													class={`${
														favoritesStore.isFavorite(data.id)
															? "text-red-500"
															: ""
													}`}
													onClick={() => favoritesStore.toggleFavorite(data.id)}
													title="Add to Favorites"
												>
													<FiHeart
														class={`h-5 w-5 ${
															favoritesStore.isFavorite(data.id)
																? "fill-current"
																: ""
														}`}
													/>
												</Button>
											</div>
										</div>

										{/* Key Nutrition Facts */}
										<Show
											when={Object.values(data.nutrition).some(
												(value) => value > 0
											)}
										>
											<div class="space-y-4">
												<h2 class="font-semibold">
													Nutrition Facts (per 100g)
												</h2>
												<div class="grid grid-cols-2 gap-4">
													<Show when={data.nutrition.energy_kcal_100g > 0}>
														<div>
															<div class="text-muted-foreground text-sm">
																Energy
															</div>
															<div>
																{formatNutritionValue(
																	data.nutrition.energy_kcal_100g,
																	"kcal",
																	0
																)}
															</div>
														</div>
													</Show>
													<Show when={data.nutrition.proteins_100g > 0}>
														<div>
															<div class="text-muted-foreground text-sm">
																Proteins
															</div>
															<div>
																{formatNutritionValue(
																	data.nutrition.proteins_100g
																)}
															</div>
														</div>
													</Show>
													<Show when={data.nutrition.carbohydrates_100g > 0}>
														<div>
															<div class="text-muted-foreground text-sm">
																Carbohydrates
															</div>
															<div>
																{formatNutritionValue(
																	data.nutrition.carbohydrates_100g
																)}
															</div>
														</div>
													</Show>
													<Show when={data.nutrition.fat_100g > 0}>
														<div>
															<div class="text-muted-foreground text-sm">
																Fat
															</div>
															<div>
																{formatNutritionValue(data.nutrition.fat_100g)}
															</div>
														</div>
													</Show>
												</div>
											</div>
										</Show>

										{/* Ingredients */}
										<Show when={data.ingredients_text}>
											<div class="space-y-2">
												<h2 class="font-semibold">Ingredients</h2>
												<p class="text-sm text-muted-foreground">
													{data.ingredients_text}
												</p>
											</div>
										</Show>

										{/* Allergens */}
										<Show when={data.allergens?.length > 0}>
											<div class="bg-warning/20 p-4 rounded-lg">
												<h2 class="font-semibold text-warning-foreground mb-2">
													Allergen Warning
												</h2>
												<p class="text-sm text-warning-foreground">
													Contains: {data.allergens?.join(", ")}
												</p>
											</div>
										</Show>

										{/* Additional Info */}
										<div class="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4 border-t">
											<Show when={data.brands?.length > 0}>
												<div>
													<div class="font-medium text-foreground">Brand</div>
													<div>{data.brands?.join(", ")}</div>
												</div>
											</Show>
											<Show when={data.origins?.length > 0}>
												<div>
													<div class="font-medium text-foreground">Origin</div>
													<div>{data.origins?.join(", ")}</div>
												</div>
											</Show>
											<Show when={data.labels?.length > 0}>
												<div class="col-span-2">
													<div class="font-medium text-foreground">Labels</div>
													<div>{data.labels?.join(", ")}</div>
												</div>
											</Show>
										</div>
									</div>
								</div>
							</Card>
						</div>
					)}
				</Show>
			</Show>
		</div>
	);
};

export default ProductDetail;
