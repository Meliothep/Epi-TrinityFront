import { Component, createSignal, createEffect, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Card } from "../components/common/Card";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { FiCheck, FiX, FiArrowLeft } from "solid-icons/fi";
import { customerStore } from "../stores/customer.store";
import { authStore } from "../stores/auth.store";
import {
	checkoutService,
	type CheckoutSummary,
	type OrderDetails,
} from "../services/checkout.service";
import {
	CheckoutForm,
	type CheckoutFormData,
} from "../components/features/checkout/CheckoutForm";
import { formatPrice } from "../lib/utils";

type CheckoutStep = "details" | "processing" | "success" | "error";

const Checkout: Component = () => {
	const navigate = useNavigate();
	const [step, setStep] = createSignal<CheckoutStep>("details");
	const [summary, setSummary] = createSignal<CheckoutSummary | null>(null);
	const [orderDetails, setOrderDetails] = createSignal<OrderDetails | null>(
		null
	);
	const [error, setError] = createSignal<string | null>(null);
	const [isLoading, setIsLoading] = createSignal(false);

	// Load customer info and checkout summary when component mounts
	createEffect(async () => {
		if (authStore.currentUser?.id) {
			try {
				await customerStore.loadCustomerInfo(authStore.currentUser.id);
				await loadCheckoutSummary();
			} catch (error) {
				setError("Failed to load checkout information");
			}
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

	const handleCheckoutSubmit = async (formData: CheckoutFormData) => {
		try {
			setStep("processing");
			setError(null);

			// Save address information if user is logged in
			if (authStore.currentUser?.id) {
				await customerStore.updateCustomerInfo(authStore.currentUser.id, {
					phone: formData.phone,
					addresses: {
						shipping: formData.shippingAddress,
						billing: formData.useShippingForBilling
							? formData.shippingAddress
							: formData.billingAddress,
					},
				});
			}

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

	return (
		<div class="container mx-auto px-4 py-8">
			<div class="max-w-4xl mx-auto">
				{/* Back Button */}
				<Button variant="ghost" onClick={() => navigate(-1)} class="mb-6">
					<FiArrowLeft class="mr-2 h-4 w-4" />
					Back
				</Button>

				{/* Order Summary */}
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="md:col-span-2">
						<Show
							when={!isLoading()}
							fallback={
								<div class="flex justify-center py-8">
									<Spinner size="lg" />
								</div>
							}
						>
							<Show
								when={step() === "details"}
								fallback={
									<div class="space-y-4">
										<Show when={step() === "processing"}>
											<Card class="p-6">
												<div class="flex flex-col items-center py-8 space-y-4">
													<Spinner size="lg" />
													<p class="text-muted-foreground">
														Processing your payment...
													</p>
												</div>
											</Card>
										</Show>

										<Show when={step() === "success"}>
											<Card class="p-6">
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
														<Button
															class="mt-4"
															onClick={() => navigate("/orders")}
														>
															View Order
														</Button>
													</div>
												</div>
											</Card>
										</Show>

										<Show when={step() === "error"}>
											<Card class="p-6">
												<div class="flex flex-col items-center py-8 space-y-4">
													<div class="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
														<FiX class="h-6 w-6 text-destructive" />
													</div>
													<div class="text-center">
														<h3 class="text-lg font-semibold">
															Payment Failed
														</h3>
														<p class="text-destructive">{error()}</p>
														<Button
															variant="outline"
															class="mt-4"
															onClick={() => setStep("details")}
														>
															Try Again
														</Button>
													</div>
												</div>
											</Card>
										</Show>
									</div>
								}
							>
								<CheckoutForm
									onSubmit={handleCheckoutSubmit}
									isLoading={isLoading()}
								/>
							</Show>
						</Show>
					</div>

					{/* Order Summary Card */}
					<div class="md:col-span-1">
						<Card class="p-6 sticky top-8">
							<div class="space-y-6">
								<h2 class="text-xl font-semibold">Order Summary</h2>

								<Show when={summary()?.items.length === 0}>
									<div class="text-center py-8">
										<p class="text-muted-foreground mb-4">Your cart is empty</p>
										<Button
											variant="outline"
											onClick={() => navigate("/products")}
										>
											Continue Shopping
										</Button>
									</div>
								</Show>

								<Show when={summary()?.items.length}>
									<div class="space-y-4">
										<div class="space-y-2">
											<For each={summary()?.items}>
												{(item) => (
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

										<div class="border-t pt-4 space-y-2">
											<div class="flex justify-between text-sm">
												<span>Subtotal</span>
												<span>{formatPrice(summary()?.subtotal || 0)}</span>
											</div>
											<div class="flex justify-between text-sm">
												<span>Tax</span>
												<span>{formatPrice(summary()?.tax || 0)}</span>
											</div>
											<div class="flex justify-between font-medium text-lg">
												<span>Total</span>
												<span>{formatPrice(summary()?.total || 0)}</span>
											</div>
										</div>
									</div>
								</Show>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
