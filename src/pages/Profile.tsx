import { Component, createSignal, createEffect, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Card } from "../components/common/Card";
import { Input } from "../components/forms/Input";
import { Button } from "../components/ui/Button";
import { Checkbox } from "../components/ui/Checkbox";
import { authStore } from "../stores/auth.store";
import { customerStore } from "../stores/customer.store";
import { FiCheck, FiAlertCircle } from "solid-icons/fi";
import type { UpdateCustomerInfoRequest } from "../types/customer.types";

interface ProfileForm {
	name: string;
	email: string;
	phone: string;
	addresses: {
		billing: {
			street: string;
			city: string;
			state: string;
			zipCode: string;
			country: string;
		};
		shipping: {
			street: string;
			city: string;
			state: string;
			zipCode: string;
			country: string;
		};
	};
	preferences: {
		newsletter: boolean;
		marketingEmails: boolean;
		orderNotifications: boolean;
		language: string;
		currency: string;
	};
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const Profile: Component = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = createSignal(false);
	const [successMessage, setSuccessMessage] = createSignal("");
	const [errorMessage, setErrorMessage] = createSignal("");
	const [formData, setFormData] = createSignal<ProfileForm>({
		name: authStore.currentUser?.name || "",
		email: authStore.currentUser?.email || "",
		phone: customerStore.currentInfo?.phone || "",
		addresses: {
			billing: customerStore.currentInfo?.addresses.billing || {
				street: "",
				city: "",
				state: "",
				zipCode: "",
				country: "",
			},
			shipping: customerStore.currentInfo?.addresses.shipping || {
				street: "",
				city: "",
				state: "",
				zipCode: "",
				country: "",
			},
		},
		preferences: customerStore.currentInfo?.preferences || {
			newsletter: false,
			marketingEmails: false,
			orderNotifications: true,
			language: "en",
			currency: "USD",
		},
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	// Load customer info when component mounts
	createEffect(async () => {
		if (authStore.currentUser?.id) {
			try {
				await customerStore.loadCustomerInfo(authStore.currentUser.id);
				// Update form data with loaded customer info
				setFormData((prev) => ({
					...prev,
					phone: customerStore.currentInfo?.phone || "",
					addresses: {
						billing:
							customerStore.currentInfo?.addresses.billing ||
							prev.addresses.billing,
						shipping:
							customerStore.currentInfo?.addresses.shipping ||
							prev.addresses.shipping,
					},
					preferences:
						customerStore.currentInfo?.preferences || prev.preferences,
				}));
			} catch (error) {
				setErrorMessage("Failed to load customer information");
			}
		}
	});

	const handleInputChange = (path: string, value: string | boolean) => {
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

		// Clear messages when user starts typing
		setSuccessMessage("");
		setErrorMessage("");
	};

	const validateForm = () => {
		if (!formData().name || !formData().email) {
			setErrorMessage("Name and email are required");
			return false;
		}

		if (formData().newPassword && formData().newPassword.length < 6) {
			setErrorMessage("New password must be at least 6 characters long");
			return false;
		}

		if (formData().newPassword !== formData().confirmPassword) {
			setErrorMessage("New passwords do not match");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (!validateForm() || !authStore.currentUser?.id) return;

		setIsLoading(true);
		setErrorMessage("");
		setSuccessMessage("");

		try {
			// Update auth profile (name and email)
			await authStore.updateProfile({
				name: formData().name,
				email: formData().email,
			});

			// Update customer info
			const customerUpdate: UpdateCustomerInfoRequest = {
				phone: formData().phone,
				addresses: {
					billing: formData().addresses.billing,
					shipping: formData().addresses.shipping,
				},
				preferences: formData().preferences,
			};

			await customerStore.updateCustomerInfo(
				authStore.currentUser.id,
				customerUpdate
			);

			// Handle password change if needed
			if (formData().currentPassword && formData().newPassword) {
				// Add password update logic here
			}

			setSuccessMessage("Profile updated successfully");
			setFormData((prev) => ({
				...prev,
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			}));
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Failed to update profile"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div class="container mx-auto px-4 py-8">
			<div class="max-w-2xl mx-auto space-y-8">
				<div>
					<h1 class="text-3xl font-bold">Profile</h1>
					<p class="text-muted-foreground mt-2">Manage your account settings</p>
				</div>

				<Show when={successMessage() || errorMessage()}>
					<div
						class={`p-4 rounded-lg ${
							successMessage()
								? "bg-green-500/10 text-green-500"
								: "bg-destructive/10 text-destructive"
						}`}
					>
						<div class="flex items-center gap-2">
							<Show
								when={successMessage()}
								fallback={<FiAlertCircle class="h-5 w-5" />}
							>
								<FiCheck class="h-5 w-5" />
							</Show>
							<p>{successMessage() || errorMessage()}</p>
						</div>
					</div>
				</Show>

				<Card class="p-6">
					<form class="space-y-8" onSubmit={handleSubmit}>
						{/* Personal Information */}
						<div class="space-y-4">
							<h2 class="text-xl font-semibold">Personal Information</h2>
							<Input
								label="Name"
								placeholder="Enter your name"
								value={formData().name}
								onChange={(e) =>
									handleInputChange("name", e.currentTarget.value)
								}
								required
							/>
							<Input
								label="Email"
								type="email"
								placeholder="Enter your email"
								value={formData().email}
								onChange={(e) =>
									handleInputChange("email", e.currentTarget.value)
								}
								required
							/>
							<Input
								label="Phone"
								type="tel"
								placeholder="Enter your phone number"
								value={formData().phone}
								onChange={(e) =>
									handleInputChange("phone", e.currentTarget.value)
								}
							/>
						</div>

						{/* Billing Address */}
						<div class="space-y-4">
							<h2 class="text-xl font-semibold">Billing Address</h2>
							<Input
								label="Street Address"
								placeholder="Enter your street address"
								value={formData().addresses.billing.street}
								onChange={(e) =>
									handleInputChange(
										"addresses.billing.street",
										e.currentTarget.value
									)
								}
							/>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input
									label="City"
									placeholder="Enter your city"
									value={formData().addresses.billing.city}
									onChange={(e) =>
										handleInputChange(
											"addresses.billing.city",
											e.currentTarget.value
										)
									}
								/>
								<Input
									label="State/Province"
									placeholder="Enter your state"
									value={formData().addresses.billing.state}
									onChange={(e) =>
										handleInputChange(
											"addresses.billing.state",
											e.currentTarget.value
										)
									}
								/>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input
									label="ZIP/Postal Code"
									placeholder="Enter your ZIP code"
									value={formData().addresses.billing.zipCode}
									onChange={(e) =>
										handleInputChange(
											"addresses.billing.zipCode",
											e.currentTarget.value
										)
									}
								/>
								<Input
									label="Country"
									placeholder="Enter your country"
									value={formData().addresses.billing.country}
									onChange={(e) =>
										handleInputChange(
											"addresses.billing.country",
											e.currentTarget.value
										)
									}
								/>
							</div>
						</div>

						{/* Shipping Address */}
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<h2 class="text-xl font-semibold">Shipping Address</h2>
								<Button
									type="button"
									variant="outline"
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											addresses: {
												...prev.addresses,
												shipping: { ...prev.addresses.billing },
											},
										}))
									}
								>
									Same as Billing
								</Button>
							</div>
							<Input
								label="Street Address"
								placeholder="Enter your street address"
								value={formData().addresses.shipping.street}
								onChange={(e) =>
									handleInputChange(
										"addresses.shipping.street",
										e.currentTarget.value
									)
								}
							/>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input
									label="City"
									placeholder="Enter your city"
									value={formData().addresses.shipping.city}
									onChange={(e) =>
										handleInputChange(
											"addresses.shipping.city",
											e.currentTarget.value
										)
									}
								/>
								<Input
									label="State/Province"
									placeholder="Enter your state"
									value={formData().addresses.shipping.state}
									onChange={(e) =>
										handleInputChange(
											"addresses.shipping.state",
											e.currentTarget.value
										)
									}
								/>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input
									label="ZIP/Postal Code"
									placeholder="Enter your ZIP code"
									value={formData().addresses.shipping.zipCode}
									onChange={(e) =>
										handleInputChange(
											"addresses.shipping.zipCode",
											e.currentTarget.value
										)
									}
								/>
								<Input
									label="Country"
									placeholder="Enter your country"
									value={formData().addresses.shipping.country}
									onChange={(e) =>
										handleInputChange(
											"addresses.shipping.country",
											e.currentTarget.value
										)
									}
								/>
							</div>
						</div>

						{/* Preferences */}
						<div class="space-y-4">
							<h2 class="text-xl font-semibold">Preferences</h2>
							<div class="space-y-4">
								<div class="flex items-center space-x-2">
									<Checkbox
										checked={formData().preferences.newsletter}
										onChange={(checked) =>
											handleInputChange("preferences.newsletter", checked)
										}
									/>
									<label class="text-sm">Subscribe to newsletter</label>
								</div>
								<div class="flex items-center space-x-2">
									<Checkbox
										checked={formData().preferences.marketingEmails}
										onChange={(checked) =>
											handleInputChange("preferences.marketingEmails", checked)
										}
									/>
									<label class="text-sm">Receive marketing emails</label>
								</div>
								<div class="flex items-center space-x-2">
									<Checkbox
										checked={formData().preferences.orderNotifications}
										onChange={(checked) =>
											handleInputChange(
												"preferences.orderNotifications",
												checked
											)
										}
									/>
									<label class="text-sm">Order notifications</label>
								</div>
							</div>
						</div>

						{/* Change Password */}
						<div class="space-y-4">
							<h2 class="text-xl font-semibold">Change Password</h2>
							<p class="text-sm text-muted-foreground">
								Leave blank if you don't want to change your password
							</p>
							<Input
								label="Current Password"
								type="password"
								placeholder="Enter current password"
								value={formData().currentPassword}
								onChange={(e) =>
									handleInputChange("currentPassword", e.currentTarget.value)
								}
							/>
							<Input
								label="New Password"
								type="password"
								placeholder="Enter new password"
								value={formData().newPassword}
								onChange={(e) =>
									handleInputChange("newPassword", e.currentTarget.value)
								}
							/>
							<Input
								label="Confirm New Password"
								type="password"
								placeholder="Confirm new password"
								value={formData().confirmPassword}
								onChange={(e) =>
									handleInputChange("confirmPassword", e.currentTarget.value)
								}
							/>
						</div>

						<div class="flex justify-end gap-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => navigate(-1)}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading()}>
								{isLoading() ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default Profile;
