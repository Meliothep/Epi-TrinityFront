import { Component, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Card } from "../../common/Card";
import { Button } from "../../ui/Button";
import { cartStore } from "../../../stores/cart.store";
import { favoritesStore } from "../../../stores/favorites.store";
import {
	getProductImageUrl,
	getFallbackImageUrl,
	formatPrice,
} from "../../../lib/utils";
import type { Product } from "../../../types/product.types";
import { FiHeart, FiShoppingCart } from "solid-icons/fi";

interface ProductCardProps {
	product: Product;
	showQuickActions?: boolean;
}

export const ProductCard: Component<ProductCardProps> = (props) => {
	const navigate = useNavigate();

	const handleAddToCart = (e: MouseEvent) => {
		e.stopPropagation(); // Prevent navigation when clicking the cart button
		cartStore.addToCart(props.product.id);
	};

	const handleFavorite = (e: MouseEvent) => {
		e.stopPropagation(); // Prevent navigation when clicking the favorite button
		favoritesStore.toggleFavorite(props.product.id);
	};

	return (
		<Card
			class="cursor-pointer transition-transform hover:scale-[1.02] group relative"
			onClick={() => navigate(`/products/${props.product.id}`)}
		>
			<div class="aspect-square relative">
				<img
					src={
						getProductImageUrl(props.product.code) ||
						getFallbackImageUrl(props.product.product_name)
					}
					alt={props.product.product_name}
					class="w-full h-full object-cover rounded-t-lg"
					onError={(e) => {
						(e.target as HTMLImageElement).src = getFallbackImageUrl(
							props.product.product_name
						);
					}}
				/>

				{/* Price Tag */}
				<div class="absolute top-2 left-2">
					<span class="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
						{formatPrice(props.product.price)}
					</span>
				</div>

				{/* Nutrition Grade Badge */}
				<Show
					when={
						props.product.nutrition_grade &&
						props.product.nutrition_grade !== "not-applicable"
					}
				>
					<div class="absolute top-2 right-2">
						<span
							class={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg text-white ${
								props.product.nutrition_grade === "unknown"
									? "bg-gray-500"
									: props.product.nutrition_grade === "a"
									? "bg-green-500"
									: props.product.nutrition_grade === "b"
									? "bg-lime-500"
									: props.product.nutrition_grade === "c"
									? "bg-yellow-500"
									: props.product.nutrition_grade === "d"
									? "bg-orange-500"
									: "bg-red-500"
							}`}
						>
							{props.product.nutrition_grade === "unknown"
								? "?"
								: props.product.nutrition_grade.toUpperCase()}
						</span>
					</div>
				</Show>

				{/* Quick Actions */}
				<Show when={props.showQuickActions}>
					<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
						<Button
							variant="secondary"
							size="icon"
							onClick={handleAddToCart}
							title="Add to Cart"
						>
							<FiShoppingCart class="h-5 w-5" />
						</Button>
						<Button
							variant="secondary"
							size="icon"
							onClick={handleFavorite}
							title="Add to Favorites"
							class={
								favoritesStore.isFavorite(props.product.id)
									? "text-red-500"
									: ""
							}
						>
							<FiHeart
								class={`h-5 w-5 ${
									favoritesStore.isFavorite(props.product.id)
										? "fill-current"
										: ""
								}`}
							/>
						</Button>
					</div>
				</Show>
			</div>

			<div class="p-4 space-y-2">
				<h3 class="font-semibold line-clamp-2">{props.product.product_name}</h3>
				<p class="text-sm text-muted-foreground line-clamp-1">
					{props.product.brands.join(", ")}
				</p>
				<p class="text-sm text-muted-foreground">{props.product.quantity}</p>
			</div>
		</Card>
	);
};
