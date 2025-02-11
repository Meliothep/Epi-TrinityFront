import {
	Component,
	Show,
	createSignal,
	createEffect,
	createMemo,
	For,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Button } from "../../ui/Button";
import { CartItem } from "./CartItem";
import { cartStore } from "../../../stores/cart.store";
import { useProducts } from "../../../stores/products.store";
import { FiShoppingCart, FiX } from "solid-icons/fi";
import { cn } from "../../../lib/utils";
import { formatPrice } from "../../../lib/utils";
import { Card } from "../../common/Card";

export const Cart: Component = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = createSignal(false);
	const [isAnimating, setIsAnimating] = createSignal(false);
	const { products } = useProducts();

	// Calculate total price using createMemo for better performance
	const totalPrice = createMemo(() => {
		return cartStore.items().reduce((total, item) => {
			const product = products().find((p) => p.id === item.id);
			return total + (product?.price || 0) * item.quantity;
		}, 0);
	});

	// Watch for cart changes and trigger animation
	createEffect(() => {
		const count = cartStore.getItemCount();
		if (count > 0) {
			setIsAnimating(true);
			setTimeout(() => setIsAnimating(false), 1000);
		}
	});

	const handleCheckout = () => {
		setIsOpen(false); // Close cart
		navigate("/checkout"); // Navigate to checkout page
	};

	return (
		<div class="relative">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setIsOpen(!isOpen())}
				class="rounded-full relative"
				title="Shopping Cart"
			>
				<FiShoppingCart
					class={cn("h-5 w-5", isAnimating() && "animate-bounce")}
				/>
				<Show when={cartStore.getItemCount() > 0}>
					<span class="absolute -top-1 -right-1 w-4 h-4 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
						{cartStore.getItemCount()}
					</span>
				</Show>
			</Button>

			<Show when={isOpen()}>
				<Card class="absolute right-0 top-12 w-80 md:w-96 z-[200]">
					<div class="flex items-center justify-between p-4 border-b">
						<h2 class="font-semibold">Shopping Cart</h2>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsOpen(false)}
							class="rounded-full"
							title="Close cart"
						>
							<FiX class="h-5 w-5" />
						</Button>
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
								<For each={cartStore.items()}>
									{(item) => (
										<CartItem itemId={item.id} quantity={item.quantity} />
									)}
								</For>
							</div>
						</Show>
					</div>

					<Show when={cartStore.items().length > 0}>
						<div class="p-4 border-t space-y-4">
							<div class="flex justify-between items-center">
								<span class="font-medium">Total</span>
								<span class="font-medium">{formatPrice(totalPrice())}</span>
							</div>

							<div class="grid gap-2">
								<Button
									class="w-full"
									onClick={handleCheckout}
									disabled={cartStore.items().length === 0}
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
				</Card>
			</Show>
		</div>
	);
};
