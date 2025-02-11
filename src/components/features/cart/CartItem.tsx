import { Component, Show, createMemo } from "solid-js";
import { Button } from "../../ui/Button";
import { useProducts } from "../../../stores/products.store";
import { useCart } from "../../../stores/cart.store";
import { formatCurrency } from "../../../lib/format";
import { getFallbackImageUrl, cn } from "../../../lib/utils";

interface CartItemProps {
	itemId: string;
	quantity: number;
}

export const CartItem: Component<CartItemProps> = (props) => {
	const { getProduct, products } = useProducts();
	const cart = useCart();

	// Create memoized product data
	const product = createMemo(() => {
		const currentProducts = products();
		if (!currentProducts) return null;
		return currentProducts.find((p) => p.id === props.itemId);
	});

	// Create memoized price calculation
	const price = createMemo(() => {
		const currentProduct = product();
		if (!currentProduct?.price) return 0;
		return currentProduct.price * props.quantity;
	});

	const handleDecrement = () => {
		cart.updateQuantity(props.itemId, props.quantity - 1);
	};

	const handleIncrement = () => {
		cart.updateQuantity(props.itemId, props.quantity + 1);
	};

	const handleRemove = () => {
		cart.removeFromCart(props.itemId);
	};

	return (
		<div
			class={cn(
				"flex items-center space-x-4 py-4",
				"motion-safe:hover:bg-accent/5 rounded-lg transition-colors duration-200",
				"motion-safe:animate-fade-in motion-safe:animate-duration-300"
			)}
		>
			<div
				class={cn(
					"relative h-16 w-16 overflow-hidden rounded-lg border bg-muted",
					"motion-safe:hover:scale-105 transition-transform duration-200"
				)}
			>
				<Show
					when={product()}
					fallback={
						<div class="h-full w-full bg-muted flex items-center justify-center motion-safe:animate-pulse">
							<span class="text-muted-foreground text-xs">Loading...</span>
						</div>
					}
				>
					<img
						src={product()?.image || getFallbackImageUrl("Product")}
						alt={product()?.name || "Product"}
						class={cn(
							"h-full w-full object-cover",
							"motion-safe:animate-fade-in motion-safe:animate-duration-500"
						)}
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.src = getFallbackImageUrl(product()?.name || "Product");
						}}
					/>
				</Show>
			</div>
			<div class="flex-1">
				<Show
					when={product()}
					fallback={
						<div class="space-y-2">
							<div class="h-4 w-24 bg-muted rounded motion-safe:animate-pulse" />
							<div class="h-4 w-16 bg-muted rounded motion-safe:animate-pulse" />
						</div>
					}
				>
					<h3 class="font-medium motion-safe:animate-fade-down motion-safe:animate-duration-500">
						{product()?.name}
					</h3>
					<div class="flex items-center space-x-2 motion-safe:animate-fade-up motion-safe:animate-duration-500 motion-safe:animate-delay-100">
						<p class="text-sm text-muted-foreground">
							{formatCurrency(product()?.price || 0)} × {props.quantity}
						</p>
						<p class="text-sm font-medium">= {formatCurrency(price())}</p>
					</div>
				</Show>
				<div class="mt-2 flex items-center space-x-2">
					<Button
						variant="outline"
						size="icon"
						class={cn(
							"h-8 w-8",
							"motion-safe:hover:scale-110 motion-safe:active:scale-95",
							"transition-transform duration-200"
						)}
						onClick={handleDecrement}
						disabled={props.quantity <= 1}
					>
						<span class="sr-only">Decrease quantity</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M5 12h14" />
						</svg>
					</Button>
					<span class="w-8 text-center motion-safe:animate-fade-in motion-safe:animate-duration-200">
						{props.quantity}
					</span>
					<Button
						variant="outline"
						size="icon"
						class={cn(
							"h-8 w-8",
							"motion-safe:hover:scale-110 motion-safe:active:scale-95",
							"transition-transform duration-200"
						)}
						onClick={handleIncrement}
					>
						<span class="sr-only">Increase quantity</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M12 5v14M5 12h14" />
						</svg>
					</Button>
				</div>
			</div>
			<Button
				variant="ghost"
				size="icon"
				class={cn(
					"h-8 w-8",
					"motion-safe:hover:bg-destructive/10 motion-safe:hover:text-destructive",
					"motion-safe:hover:rotate-90 transition-all duration-200"
				)}
				onClick={handleRemove}
			>
				<span class="sr-only">Remove item</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</Button>
		</div>
	);
};
