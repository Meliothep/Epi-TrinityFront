import { Component, createMemo } from "solid-js";
import { Button } from "../../ui/Button";
import { useProducts } from "../../../stores/products.store";
import { cartStore } from "../../../stores/cart.store";
import { Card } from "../../common/Card";
import { formatPrice } from "../../../lib/utils";

export const CartSummary: Component = () => {
	const { products } = useProducts();

	const subtotal = createMemo<number>(() => {
		const items = cartStore.items();
		const productList = products();
		return items.reduce((total, item) => {
			const product = productList.find((p) => p.id === item.id);
			return total + (product?.price || 0) * item.quantity;
		}, 0);
	});

	const shipping = 0; // Free shipping for now
	const total = createMemo<number>(() => subtotal() + shipping);

	return (
		<Card padding="lg" class="sticky top-4">
			<div class="space-y-4">
				<div class="flex justify-between text-sm">
					<span>Subtotal</span>
					<span>{formatPrice(subtotal())}</span>
				</div>

				<div class="flex justify-between text-sm">
					<span>Shipping</span>
					<span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
				</div>

				<div class="border-t border-border pt-4">
					<div class="flex justify-between font-medium">
						<span>Total</span>
						<span>{formatPrice(total())}</span>
					</div>
				</div>

				<Button
					class="w-full"
					disabled={cartStore.items().length === 0}
					onClick={() => {
						// TODO: Implement checkout
						console.log("Proceeding to checkout...");
					}}
				>
					Proceed to Checkout
				</Button>
			</div>
		</Card>
	);
};
