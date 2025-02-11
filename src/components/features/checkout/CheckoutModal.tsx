import { Component, Show, createSignal, createEffect, For } from "solid-js";
import { Card } from "../../common/Card";
import { Button } from "../../ui/Button";
import {
	checkoutService,
	type CheckoutSummary,
	type OrderDetails,
} from "../../../services/checkout.service";
import { formatPrice } from "../../../lib/utils";
import { Spinner } from "../../ui/Spinner";
import { FiCheck, FiX, FiCreditCard } from "solid-icons/fi";

interface CheckoutModalProps {
	isOpen: boolean;
	onClose: () => void;
}

type CheckoutStep = "summary" | "processing" | "success" | "error";

interface CheckoutItem {
	name: string;
	quantity: number;
	price: number;
}

export const CheckoutModal: Component<CheckoutModalProps> = (props) => {
	const [step, setStep] = createSignal<CheckoutStep>("summary");
	const [summary, setSummary] = createSignal<CheckoutSummary | null>(null);
	const [orderDetails, setOrderDetails] = createSignal<OrderDetails | null>(
		null
	);
	const [error, setError] = createSignal<string | null>(null);
	const [isLoading, setIsLoading] = createSignal(false);

	// Load checkout summary when modal opens
	createEffect(() => {
		if (props.isOpen) {
			loadCheckoutSummary();
		}
	});

	const loadCheckoutSummary = async () => {
		try {
			setIsLoading(true);
			const data = await checkoutService.getCheckoutSummary();
			setSummary(data);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to load checkout summary"
			);
			setStep("error");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCheckout = async () => {
		try {
			setStep("processing");
			setError(null);

			// Initialize checkout
			const order = await checkoutService.initializeCheckout();

			// Process approval (in real implementation, this would redirect to PayPal)
			await checkoutService.processApproval(order.id);

			// Complete checkout
			const details = await checkoutService.completeCheckout(order.id);
			setOrderDetails(details);
			setStep("success");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Checkout failed");
			setStep("error");
		}
	};

	const handleClose = () => {
		setStep("summary");
		setError(null);
		props.onClose();
	};

	return (
		<Show when={props.isOpen}>
			<div class="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
				{/* Backdrop */}
				<div
					class="fixed inset-0 bg-black/50 backdrop-blur-sm"
					onClick={handleClose}
					aria-hidden="true"
				/>

				{/* Dialog Container */}
				<div class="fixed inset-0 flex items-center justify-center overflow-y-auto">
					<div class="relative flex min-h-full items-center justify-center p-4">
						{/* Dialog Content */}
						<div class="relative w-full max-w-lg">
							<Card class="w-full shadow-lg">
								{/* Header */}
								<div class="flex items-center justify-between p-6 border-b">
									<h2 class="text-lg font-semibold">
										{step() === "summary" && "Checkout"}
										{step() === "processing" && "Processing Payment"}
										{step() === "success" && "Payment Successful"}
										{step() === "error" && "Payment Failed"}
									</h2>
									<Button
										variant="ghost"
										size="icon"
										onClick={handleClose}
										disabled={step() === "processing"}
										class="rounded-full"
										aria-label="Close"
									>
										<FiX class="h-4 w-4" />
									</Button>
								</div>

								{/* Content */}
								<div class="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
									<Show
										when={!isLoading()}
										fallback={
											<div class="flex justify-center py-8">
												<Spinner size="lg" />
											</div>
										}
									>
										<Show
											when={step() === "summary"}
											fallback={
												<div class="space-y-4">
													<Show when={step() === "processing"}>
														<div class="flex flex-col items-center py-8 space-y-4">
															<Spinner size="lg" />
															<p class="text-muted-foreground">
																Processing your payment...
															</p>
														</div>
													</Show>

													<Show when={step() === "success"}>
														<div class="flex flex-col items-center py-8 space-y-4">
															<div class="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
																<FiCheck class="h-6 w-6 text-green-500" />
															</div>
															<div class="text-center">
																<h3 class="text-lg font-semibold">
																	Payment Successful
																</h3>
																<p class="text-muted-foreground">
																	Order ID: {orderDetails()?.orderId}
																</p>
															</div>
														</div>
													</Show>

													<Show when={step() === "error"}>
														<div class="flex flex-col items-center py-8 space-y-4">
															<div class="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
																<FiX class="h-6 w-6 text-destructive" />
															</div>
															<div class="text-center">
																<h3 class="text-lg font-semibold">
																	Payment Failed
																</h3>
																<p class="text-destructive">{error()}</p>
															</div>
														</div>
													</Show>
												</div>
											}
										>
											<div class="space-y-6">
												{/* Order Summary */}
												<div class="space-y-4">
													<h3 class="font-medium">Order Summary</h3>
													<div class="space-y-2">
														<Show when={summary()?.items.length === 0}>
															<p class="text-muted-foreground">
																Your cart is empty
															</p>
														</Show>
														<For each={summary()?.items}>
															{(item: CheckoutItem) => (
																<div class="flex justify-between text-sm">
																	<span>
																		{item.name} (x{item.quantity})
																	</span>
																	<span class="font-medium">
																		{formatPrice(item.price * item.quantity)}
																	</span>
																</div>
															)}
														</For>
													</div>
												</div>

												{/* Totals */}
												<div class="space-y-2 pt-4 border-t">
													<div class="flex justify-between text-sm">
														<span>Subtotal</span>
														<span>{formatPrice(summary()?.subtotal || 0)}</span>
													</div>
													<div class="flex justify-between text-sm">
														<span>Tax</span>
														<span>{formatPrice(summary()?.tax || 0)}</span>
													</div>
													<div class="flex justify-between font-medium">
														<span>Total</span>
														<span>{formatPrice(summary()?.total || 0)}</span>
													</div>
												</div>
											</div>
										</Show>
									</Show>
								</div>

								{/* Footer */}
								<div class="flex justify-end gap-4 p-6 border-t">
									<Show
										when={step() === "summary"}
										fallback={
											<Show when={step() !== "processing"}>
												<Button onClick={handleClose}>Close</Button>
											</Show>
										}
									>
										<Button
											variant="outline"
											onClick={handleClose}
											disabled={step() === "processing"}
										>
											Cancel
										</Button>
										<Button
											onClick={handleCheckout}
											disabled={
												isLoading() ||
												step() === "processing" ||
												!summary()?.items.length
											}
										>
											{isLoading() ? (
												<>
													<Spinner class="mr-2" size="sm" />
													Loading...
												</>
											) : (
												<>
													<FiCreditCard class="mr-2 h-4 w-4" />
													Pay {formatPrice(summary()?.total || 0)}
												</>
											)}
										</Button>
									</Show>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</Show>
	);
};
