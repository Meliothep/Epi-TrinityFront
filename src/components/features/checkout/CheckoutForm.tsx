import { Component, createEffect, createSignal, Show } from "solid-js";
import { Card } from "../../common/Card";
import { Input } from "../../forms/Input";
import { Button } from "../../ui/Button";
import { Checkbox } from "../../ui/Checkbox";
import { customerStore } from "../../../stores/customer.store";
import { authStore } from "../../../stores/auth.store";
import type { Address } from "../../../types/customer.types";

interface CheckoutFormProps {
	onSubmit: (data: CheckoutFormData) => void;
	isLoading: boolean;
}

export interface CheckoutFormData {
	shippingAddress: Address;
	billingAddress: Address;
	useShippingForBilling: boolean;
	email: string;
	phone: string;
}

export const CheckoutForm: Component<CheckoutFormProps> = (props) => {
	const [useShippingForBilling, setUseShippingForBilling] = createSignal(true);
	const [formData, setFormData] = createSignal<CheckoutFormData>({
		shippingAddress: {
			street: "",
			city: "",
			state: "",
			zipCode: "",
			country: "",
		},
		billingAddress: {
			street: "",
			city: "",
			state: "",
			zipCode: "",
			country: "",
		},
		useShippingForBilling: true,
		email: authStore.currentUser?.email || "",
		phone: customerStore.currentInfo?.phone || "",
	});

	// Load saved addresses when available
	createEffect(() => {
		if (customerStore.currentInfo?.addresses) {
			const { shipping, billing } = customerStore.currentInfo.addresses;
			setFormData((prev) => ({
				...prev,
				shippingAddress: shipping || prev.shippingAddress,
				billingAddress: billing || prev.billingAddress,
				phone: customerStore.currentInfo?.phone || prev.phone,
			}));
		}
	});

	const handleInputChange = (path: string, value: string) => {
		setFormData((prev) => {
			const newData = { ...prev };
			const parts = path.split(".");
			let current: any = newData;

			for (let i = 0; i < parts.length - 1; i++) {
				current = current[parts[i]];
			}

			current[parts[parts.length - 1]] = value;
			return newData;
		});
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const submitData = {
			...formData(),
			billingAddress: useShippingForBilling()
				? formData().shippingAddress
				: formData().billingAddress,
			useShippingForBilling: useShippingForBilling(),
		};
		props.onSubmit(submitData);
	};

	return (
		<form onSubmit={handleSubmit} class="space-y-8">
			{/* Shipping Address */}
			<Card class="p-6">
				<div class="space-y-4">
					<h2 class="text-xl font-semibold">Shipping Address</h2>
					<div class="grid grid-cols-1 gap-4">
						<Input
							label="Street Address"
							value={formData().shippingAddress.street}
							onChange={(e) =>
								handleInputChange(
									"shippingAddress.street",
									e.currentTarget.value
								)
							}
							required
						/>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label="City"
								value={formData().shippingAddress.city}
								onChange={(e) =>
									handleInputChange(
										"shippingAddress.city",
										e.currentTarget.value
									)
								}
								required
							/>
							<Input
								label="State/Province"
								value={formData().shippingAddress.state}
								onChange={(e) =>
									handleInputChange(
										"shippingAddress.state",
										e.currentTarget.value
									)
								}
								required
							/>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label="ZIP/Postal Code"
								value={formData().shippingAddress.zipCode}
								onChange={(e) =>
									handleInputChange(
										"shippingAddress.zipCode",
										e.currentTarget.value
									)
								}
								required
							/>
							<Input
								label="Country"
								value={formData().shippingAddress.country}
								onChange={(e) =>
									handleInputChange(
										"shippingAddress.country",
										e.currentTarget.value
									)
								}
								required
							/>
						</div>
					</div>
				</div>
			</Card>

			{/* Billing Address */}
			<Card class="p-6">
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-semibold">Billing Address</h2>
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={useShippingForBilling()}
								onChange={(checked) => setUseShippingForBilling(checked)}
							/>
							<label class="text-sm">Same as shipping</label>
						</div>
					</div>

					<Show when={!useShippingForBilling()}>
						<div class="grid grid-cols-1 gap-4">
							<Input
								label="Street Address"
								value={formData().billingAddress.street}
								onChange={(e) =>
									handleInputChange(
										"billingAddress.street",
										e.currentTarget.value
									)
								}
								required
							/>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input
									label="City"
									value={formData().billingAddress.city}
									onChange={(e) =>
										handleInputChange(
											"billingAddress.city",
											e.currentTarget.value
										)
									}
									required
								/>
								<Input
									label="State/Province"
									value={formData().billingAddress.state}
									onChange={(e) =>
										handleInputChange(
											"billingAddress.state",
											e.currentTarget.value
										)
									}
									required
								/>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input
									label="ZIP/Postal Code"
									value={formData().billingAddress.zipCode}
									onChange={(e) =>
										handleInputChange(
											"billingAddress.zipCode",
											e.currentTarget.value
										)
									}
									required
								/>
								<Input
									label="Country"
									value={formData().billingAddress.country}
									onChange={(e) =>
										handleInputChange(
											"billingAddress.country",
											e.currentTarget.value
										)
									}
									required
								/>
							</div>
						</div>
					</Show>
				</div>
			</Card>

			{/* Contact Information */}
			<Card class="p-6">
				<div class="space-y-4">
					<h2 class="text-xl font-semibold">Contact Information</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input
							label="Email"
							type="email"
							value={formData().email}
							onChange={(e) =>
								handleInputChange("email", e.currentTarget.value)
							}
							required
						/>
						<Input
							label="Phone"
							type="tel"
							value={formData().phone}
							onChange={(e) =>
								handleInputChange("phone", e.currentTarget.value)
							}
							required
						/>
					</div>
				</div>
			</Card>

			<div class="flex justify-end">
				<Button type="submit" disabled={props.isLoading}>
					{props.isLoading ? "Processing..." : "Continue to Payment"}
				</Button>
			</div>
		</form>
	);
};
