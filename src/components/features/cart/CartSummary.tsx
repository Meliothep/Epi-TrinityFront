import { Component, createMemo } from "solid-js";
import { Button } from "../../ui/Button";
import { Card } from "../../common/Card";
import { useCart } from "../../../stores/cart.store";
import { useProducts } from "../../../stores/products.store";
import { Alert } from "../../ui/Alert";

export const CartSummary: Component = () => {
	const { cartItems } = useCart();
	const { products } = useProducts();

	const subtotal = createMemo(() => {
		return cartItems().reduce((total, item) => {
			const product = products().find((p) => p.id === item.id);
			return total + (product?.price || 0) * item.quantity;
		}, 0);
	});

	const shipping = 5.99; // Fixed shipping cost
	const tax = createMemo(() => subtotal() * 0.1); // 10% tax
	const total = createMemo(() => subtotal() + shipping + tax());

	const handleCheckout = () => {
		// TODO: Implement checkout logic
		console.log("Proceeding to checkout...");
	};

	return (
		<Card padding="md" shadow class="sticky top-4">
			<h2 class="text-xl font-semibold mb-4">Order Summary</h2>

			<div class="space-y-3">
				<div class="flex justify-between text-sm">
					<span class="text-muted-foreground">Subtotal</span>
					<span>${subtotal().toFixed(2)}</span>
				</div>

				<div class="flex justify-between text-sm">
					<span class="text-muted-foreground">Shipping</span>
					<span>${shipping.toFixed(2)}</span>
				</div>

				<div class="flex justify-between text-sm">
					<span class="text-muted-foreground">Tax (10%)</span>
					<span>${tax().toFixed(2)}</span>
				</div>

				<div class="h-px bg-border my-2" />

				<div class="flex justify-between font-medium">
					<span>Total</span>
					<span>${total().toFixed(2)}</span>
				</div>

				<Button
					class="w-full mt-4"
					disabled={cartItems().length === 0}
					onClick={handleCheckout}
				>
					Proceed to Checkout
				</Button>

				{cartItems().length === 0 && (
					<Alert
						variant="warning"
						title="Empty Cart"
						description="Add some items to your cart to proceed with checkout."
						class="mt-4"
					/>
				)}
			</div>
		</Card>
	);
};
