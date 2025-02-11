import { Component } from "solid-js";
import { Button } from "../../ui/Button";
import { useProducts } from "../../../stores/products.store";
import { cartStore } from "../../../stores/cart.store";
import {
	formatPrice,
	getProductImageUrl,
	getFallbackImageUrl,
} from "../../../lib/utils";
import { FiTrash2 } from "solid-icons/fi";

interface CartItemProps {
	itemId: string;
	quantity: number;
}

export const CartItem: Component<CartItemProps> = (props) => {
	const { products } = useProducts();
	const product = () => products().find((p) => p.id === props.itemId);

	const itemPrice = () => (product()?.price || 0) * props.quantity;

	return (
		<div class="flex items-center gap-4 py-4 border-b border-border last:border-0">
			{/* Product Image */}
			<div class="w-20 h-20 rounded-md overflow-hidden bg-accent/10">
				<img
					src={
						getProductImageUrl(product()?.code) ||
						getFallbackImageUrl(product()?.product_name || "Product")
					}
					alt={product()?.product_name}
					class="w-full h-full object-cover"
					onError={(e) => {
						(e.target as HTMLImageElement).src = getFallbackImageUrl(
							product()?.product_name || "Product"
						);
					}}
				/>
			</div>

			{/* Product Details */}
			<div class="flex-1 min-w-0">
				<h3 class="text-sm font-medium truncate">{product()?.product_name}</h3>
				<div class="flex items-center gap-2 mt-1">
					<p class="text-sm text-muted-foreground">
						{formatPrice(product()?.price || 0)} each
					</p>
					<span class="text-sm text-muted-foreground">×</span>
					<p class="text-sm font-medium">{props.quantity}</p>
				</div>
				<p class="text-sm font-semibold mt-1 text-primary">
					{formatPrice(itemPrice())}
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
					size="icon"
					class="text-destructive hover:text-destructive/90 h-8 w-8"
					onClick={() => cartStore.removeFromCart(props.itemId)}
					aria-label="Remove item"
				>
					<FiTrash2 class="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
