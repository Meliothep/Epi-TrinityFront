import { Component, Show, createSignal, createEffect } from "solid-js";
import { Button } from "../../ui/Button";
import { CartItem } from "./CartItem";
import { cartStore } from "../../../stores/cart.store";
import { useProducts } from "../../../stores/products.store";
import { IoCartOutline, IoClose } from "solid-icons/io";
import { clsx } from "../../../lib/utils";

export const Cart: Component = () => {
	const [isOpen, setIsOpen] = createSignal(false);
	const [isAnimating, setIsAnimating] = createSignal(false);
	const { products } = useProducts();

	// Watch for cart changes and trigger animation
	createEffect(() => {
		const count = cartStore.getItemCount();
		if (count > 0) {
			setIsAnimating(true);
			setTimeout(() => setIsAnimating(false), 1000);
		}
	});

	return (
		<div class="relative">
			<button
				onClick={() => setIsOpen(!isOpen())}
				class="relative p-2 rounded-md hover:bg-accent"
				aria-label="Cart"
			>
				<IoCartOutline
					class={clsx(
						"w-5 h-5",
						isAnimating() && "animate-bounce text-primary"
					)}
				/>
				<Show when={cartStore.getItemCount() > 0}>
					<span class="absolute -top-1 -right-1 w-4 h-4 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
						{cartStore.getItemCount()}
					</span>
				</Show>
			</button>

			<Show when={isOpen()}>
				<div class="absolute right-0 top-12 w-80 md:w-96 bg-background border rounded-lg shadow-lg z-50">
					<div class="p-4 border-b flex items-center justify-between">
						<h2 class="font-semibold">Shopping Cart</h2>
						<button
							onClick={() => setIsOpen(false)}
							class="p-2 hover:bg-accent rounded-md"
							aria-label="Close cart"
						>
							<IoClose class="w-5 h-5" />
						</button>
					</div>

					<div class="p-4 max-h-96 overflow-auto">
						<Show
							when={cartStore.items().length > 0}
							fallback={
								<p class="text-center text-muted-foreground py-8">
									Your cart is empty
								</p>
							}
						>
							<div class="space-y-4">
								{cartStore.items().map((item) => (
									<CartItem itemId={item.id} quantity={item.quantity} />
								))}
							</div>
						</Show>
					</div>

					<Show when={cartStore.items().length > 0}>
						<div class="p-4 border-t space-y-4">
							<div class="flex items-center justify-between mb-4">
								<span class="font-medium">Total</span>
								<span class="font-medium">
									$
									{cartStore
										.items()
										.reduce((total, item) => {
											const product = products().find((p) => p.id === item.id);
											return total + (product?.price || 0) * item.quantity;
										}, 0)
										.toFixed(2)}
								</span>
							</div>

							<div class="grid gap-2">
								<Button
									class="w-full"
									onClick={() => {
										// TODO: Implement checkout
										console.log("Proceeding to checkout...");
										setIsOpen(false);
									}}
								>
									Checkout
								</Button>
								<Button
									variant="outline"
									class="w-full"
									onClick={() => setIsOpen(false)}
								>
									Continue Shopping
								</Button>
							</div>
						</div>
					</Show>
				</div>
			</Show>
		</div>
	);
};
