import {
	Component,
	Show,
	createSignal,
	createEffect,
	createMemo,
	For,
} from "solid-js";
import { Portal } from "solid-js/web";
import { useNavigate } from "@solidjs/router";
import { Button } from "../../ui/Button";
import { CartItem } from "./CartItem";
import { useProducts } from "../../../stores/products.store";
import { FiShoppingCart, FiX } from "solid-icons/fi";
import { cn } from "../../../lib/utils";
import { CartSummary } from "./CartSummary";
import useCheckout from "../../../hooks/useCheckout";
import { useCart } from "../../../stores/cart.store";
import { formatCurrency } from "../../../lib/format";

export const Cart: Component = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = createSignal(false);
	const [isAnimating, setIsAnimating] = createSignal(false);
	const [isClosing, setIsClosing] = createSignal(false);
	const { products } = useProducts();
	const checkout = useCheckout;
	const cart = useCart();

	// Calculate total price using createMemo for better performance
	const totalPrice = createMemo(() => {
		const items = cart.items();
		const currentProducts = products();
		if (!items || !currentProducts) return 0;

		return items.reduce((total, item) => {
			const product = currentProducts.find((p) => p.id === item.id);
			return total + (product?.price || 0) * item.quantity;
		}, 0);
	});

	// Watch for cart changes and trigger animation
	createEffect(() => {
		const count = cart.itemCount();
		if (count > 0) {
			setIsAnimating(true);
			setTimeout(() => setIsAnimating(false), 1000);
		}
	});

	const handleClose = () => {
		setIsClosing(true);
		// Wait for animation to complete before fully closing
		setTimeout(() => {
			setIsClosing(false);
			setIsOpen(false);
		}, 200); // Match the duration of the exit animation
	};

	const handleCheckout = () => {
		handleClose();
		checkout.openCheckout();
	};

	const cartItems = createMemo(() => cart.items());
	const itemCount = createMemo(() => cart.itemCount());

	return (
		<div class="relative">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setIsOpen(!isOpen())}
				class={cn(
					"rounded-full relative",
					"motion-safe:hover:scale-105 motion-safe:active:scale-95",
					"transition-transform duration-200"
				)}
				title="Shopping Cart"
			>
				<FiShoppingCart
					class={cn("h-5 w-5", isAnimating() && "motion-safe:animate-bounce")}
				/>
				<Show when={itemCount() > 0}>
					<span
						class={cn(
							"absolute -top-1 -right-1 w-4 h-4 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center",
							"motion-opacity-in-0 motion-duration-300"
						)}
					>
						{itemCount()}
					</span>
				</Show>
			</Button>

			<Show when={isOpen() || isClosing()}>
				<Portal>
					<div
						class={cn(
							"fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
							"motion-opacity-in-0 motion-duration-200",
							isClosing() && "motion-opacity-out-0 motion-duration-200"
						)}
						onClick={handleClose}
					>
						<div
							class={cn(
								"fixed right-0 top-0 h-[100dvh] w-full max-w-md border-l bg-background p-6 shadow-lg",
								"motion-translate-x-in-100 motion-duration-300 motion-ease-spring-smooth",
								isClosing() && "motion-translate-x-out-100 motion-duration-200"
							)}
							onClick={(e) => e.stopPropagation()}
						>
							<div class="flex h-full flex-col">
								<div class="flex items-center justify-between">
									<h2 class="text-2xl font-semibold motion-translate-y-in-25 motion-duration-500">
										Shopping Cart
									</h2>
									<Button
										variant="ghost"
										size="icon"
										onClick={handleClose}
										class="motion-rotate-in-180 motion-duration-200 hover:motion-rotate-out-180"
									>
										<span class="sr-only">Close</span>
										<FiX class="h-6 w-6" />
									</Button>
								</div>

								<Show when={cartItems().length > 0}>
									<div class="mt-8 flex-1 overflow-auto">
										<For each={cartItems()}>
											{(item, index) => (
												<div
													class={cn(
														"motion-translate-y-in-25 motion-duration-300",
														"motion-delay-[var(--delay)]"
													)}
													style={{ "--delay": `${index() * 100}ms` }}
												>
													<CartItem itemId={item.id} quantity={item.quantity} />
												</div>
											)}
										</For>
									</div>

									<div class="mt-8 border-t pt-8 motion-translate-y-in-25 motion-duration-500">
										<CartSummary />
										<Button
											class={cn(
												"mt-8 w-full",
												"motion-scale-in-95 motion-duration-200"
											)}
											onClick={handleCheckout}
											disabled={cartItems().length === 0}
										>
											Checkout ({formatCurrency(totalPrice())})
										</Button>
									</div>
								</Show>

								<Show when={cartItems().length === 0}>
									<div class="flex h-full flex-col items-center justify-center motion-opacity-in-0 motion-duration-500">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-16 w-16 text-muted-foreground motion-translate-y-in-25 motion-duration-700"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
										<p class="mt-4 text-lg font-medium motion-translate-y-in-25 motion-delay-300">
											Your cart is empty
										</p>
										<p class="mt-2 text-sm text-muted-foreground motion-translate-y-in-25 motion-delay-500">
											Add items to your cart to see them here
										</p>
									</div>
								</Show>
							</div>
						</div>
					</div>
				</Portal>
			</Show>
		</div>
	);
};
