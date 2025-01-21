import { Component } from "solid-js";
import { Button } from "../../ui/Button";
import { useProducts } from "../../../stores/products.store";
import { cartStore } from "../../../stores/cart.store";

interface CartItemProps {
	itemId: string;
	quantity: number;
}

export const CartItem: Component<CartItemProps> = (props) => {
	const { products } = useProducts();
	const product = () => products().find((p) => p.id === props.itemId);

	return (
		<div class="flex items-center gap-4 py-4 border-b border-border last:border-0">
			{/* Product Image */}
			<div class="w-20 h-20 rounded-md overflow-hidden bg-accent/10">
				<img
					src={product()?.image || "https://via.placeholder.com/80"}
					alt={product()?.name}
					class="w-full h-full object-cover"
				/>
			</div>

			{/* Product Details */}
			<div class="flex-1 min-w-0">
				<h3 class="text-sm font-medium truncate">{product()?.name}</h3>
				<p class="text-sm text-muted-foreground mt-1">
					${product()?.price?.toFixed(2)}
				</p>
			</div>

			{/* Quantity Controls */}
			<div class="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						cartStore.updateQuantity(props.itemId, props.quantity - 1)
					}
					aria-label="Decrease quantity"
					class="h-8 w-8 p-0"
				>
					-
				</Button>

				<span class="w-8 text-center text-sm">{props.quantity}</span>

				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						cartStore.updateQuantity(props.itemId, props.quantity + 1)
					}
					aria-label="Increase quantity"
					class="h-8 w-8 p-0"
				>
					+
				</Button>

				<Button
					variant="ghost"
					size="l"
					class="text-destructive hover:text-destructive/90 h-8 w-8 p-0"
					onClick={() => cartStore.removeFromCart(props.itemId)}
					aria-label="Remove item"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-4 h-4"
					>
						<path
							fill-rule="evenodd"
							d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
							clip-rule="evenodd"
						/>
					</svg>
				</Button>
			</div>
		</div>
	);
};
