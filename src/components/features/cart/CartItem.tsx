import { Component, Show } from "solid-js";
import { Button } from "../../ui/Button";
import { Card } from "../../common/Card";
import { useCart } from "../../../stores/cart.store";
import { useProducts } from "../../../stores/products.store";
import { Badge } from "../../ui/Badge";

interface CartItemProps {
	itemId: string;
	quantity: number;
}

export const CartItem: Component<CartItemProps> = (props) => {
	const { updateQuantity, removeFromCart } = useCart();
	const { products } = useProducts();

	const product = () => products().find((p) => p.id === props.itemId);

	const handleQuantityChange = (change: number) => {
		const newQuantity = props.quantity + change;
		if (newQuantity > 0) {
			updateQuantity(props.itemId, newQuantity);
		} else {
			removeFromCart(props.itemId);
		}
	};

	return (
		<Card padding="sm" class="hover:shadow-md transition-shadow">
			<div class="flex items-center gap-4">
				{/* Product Image Placeholder */}
				<div class="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-muted-foreground"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>

				{/* Product Details */}
				<div class="flex-grow">
					<Show when={product()}>
						{(item) => (
							<>
								<div class="flex items-start justify-between">
									<div>
										<h3 class="font-medium">{item.name}</h3>
										<p class="text-sm text-muted-foreground">
											{item.description}
										</p>
									</div>
									<Badge variant="outline" size="sm">
										${item.price.toFixed(2)}
									</Badge>
								</div>

								{/* Quantity Controls */}
								<div class="flex items-center gap-2 mt-2">
									<Button
										variant="outline"
										size="sm"
										class="h-8 w-8 p-0"
										onClick={() => handleQuantityChange(-1)}
									>
										-
									</Button>
									<span class="text-sm font-medium w-8 text-center">
										{props.quantity}
									</span>
									<Button
										variant="outline"
										size="sm"
										class="h-8 w-8 p-0"
										onClick={() => handleQuantityChange(1)}
									>
										+
									</Button>
									<Button
										variant="ghost"
										size="sm"
										class="text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
										onClick={() => removeFromCart(props.itemId)}
									>
										Remove
									</Button>
								</div>
							</>
						)}
					</Show>
				</div>
			</div>
		</Card>
	);
};
