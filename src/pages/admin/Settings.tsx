import { Component, createSignal, Show } from "solid-js";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/forms/Input";
import { Checkbox } from "../../components/ui/Checkbox";
import { adminStore } from "../../stores/admin.store";
import { FiSave, FiAlertCircle } from "solid-icons/fi";

interface SystemSettings {
	siteName: string;
	siteDescription: string;
	contactEmail: string;
	supportPhone: string;
	currency: string;
	taxRate: number;
	orderPrefix: string;
	features: {
		enableRegistration: boolean;
		enableGuestCheckout: boolean;
		enableReviews: boolean;
		enableWishlist: boolean;
		enableNewsletter: boolean;
	};
	notifications: {
		orderConfirmation: boolean;
		orderStatusUpdate: boolean;
		newUserRegistration: boolean;
		lowStockAlert: boolean;
	};
	maintenance: {
		enableMaintenanceMode: boolean;
		maintenanceMessage: string;
	};
}

const Settings: Component = () => {
	const [isLoading, setIsLoading] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);
	const [successMessage, setSuccessMessage] = createSignal<string | null>(null);
	const [settings, setSettings] = createSignal<SystemSettings>({
		siteName: "Trinity",
		siteDescription: "Your healthy food marketplace",
		contactEmail: "contact@example.com",
		supportPhone: "+1 234 567 890",
		currency: "USD",
		taxRate: 10,
		orderPrefix: "ORD",
		features: {
			enableRegistration: true,
			enableGuestCheckout: false,
			enableReviews: true,
			enableWishlist: true,
			enableNewsletter: true,
		},
		notifications: {
			orderConfirmation: true,
			orderStatusUpdate: true,
			newUserRegistration: true,
			lowStockAlert: true,
		},
		maintenance: {
			enableMaintenanceMode: false,
			maintenanceMessage: "Site is under maintenance. Please check back later.",
		},
	});

	const handleSaveSettings = async () => {
		if (!adminStore.hasPermission("settings", "edit")) return;

		try {
			setIsLoading(true);
			setError(null);
			setSuccessMessage(null);

			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setSuccessMessage("Settings saved successfully");
		} catch (err) {
			setError("Failed to save settings");
			console.error("Error saving settings:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const updateSettings = <K extends keyof SystemSettings>(
		key: K,
		value: SystemSettings[K]
	) => {
		setSettings((prev) => ({ ...prev, [key]: value }));
	};

	const updateFeature = (
		key: keyof SystemSettings["features"],
		value: boolean
	) => {
		setSettings((prev) => ({
			...prev,
			features: { ...prev.features, [key]: value },
		}));
	};

	const updateNotification = (
		key: keyof SystemSettings["notifications"],
		value: boolean
	) => {
		setSettings((prev) => ({
			...prev,
			notifications: { ...prev.notifications, [key]: value },
		}));
	};

	return (
		<div class="space-y-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold">Settings</h1>
					<p class="text-muted-foreground">Manage system settings</p>
				</div>

				<Button
					onClick={handleSaveSettings}
					disabled={
						isLoading() || !adminStore.hasPermission("settings", "edit")
					}
				>
					<FiSave class="mr-2 h-4 w-4" />
					{isLoading() ? "Saving..." : "Save Changes"}
				</Button>
			</div>

			{/* Messages */}
			<Show when={successMessage() || error()}>
				<div
					class={cn(
						"p-4 rounded-lg",
						successMessage()
							? "bg-green-500/10 text-green-500"
							: "bg-destructive/10 text-destructive"
					)}
				>
					<div class="flex items-center gap-2">
						<Show
							when={successMessage()}
							fallback={<FiAlertCircle class="h-5 w-5" />}
						>
							<FiCheck class="h-5 w-5" />
						</Show>
						<p>{successMessage() || error()}</p>
					</div>
				</div>
			</Show>

			<div class="grid gap-8">
				{/* General Settings */}
				<Card class="p-6">
					<h2 class="text-xl font-semibold mb-6">General Settings</h2>
					<div class="grid gap-6">
						<div class="grid gap-4 md:grid-cols-2">
							<Input
								label="Site Name"
								value={settings().siteName}
								onChange={(e) =>
									updateSettings("siteName", e.currentTarget.value)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<Input
								label="Site Description"
								value={settings().siteDescription}
								onChange={(e) =>
									updateSettings("siteDescription", e.currentTarget.value)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
						</div>
						<div class="grid gap-4 md:grid-cols-2">
							<Input
								label="Contact Email"
								type="email"
								value={settings().contactEmail}
								onChange={(e) =>
									updateSettings("contactEmail", e.currentTarget.value)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<Input
								label="Support Phone"
								value={settings().supportPhone}
								onChange={(e) =>
									updateSettings("supportPhone", e.currentTarget.value)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
						</div>
						<div class="grid gap-4 md:grid-cols-3">
							<Input
								label="Currency"
								value={settings().currency}
								onChange={(e) =>
									updateSettings("currency", e.currentTarget.value)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<Input
								label="Tax Rate (%)"
								type="number"
								value={settings().taxRate.toString()}
								onChange={(e) =>
									updateSettings("taxRate", parseFloat(e.currentTarget.value))
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<Input
								label="Order Prefix"
								value={settings().orderPrefix}
								onChange={(e) =>
									updateSettings("orderPrefix", e.currentTarget.value)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
						</div>
					</div>
				</Card>

				{/* Features */}
				<Card class="p-6">
					<h2 class="text-xl font-semibold mb-6">Features</h2>
					<div class="grid gap-4">
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().features.enableRegistration}
								onChange={(checked) =>
									updateFeature("enableRegistration", checked)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Enable User Registration</label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().features.enableGuestCheckout}
								onChange={(checked) =>
									updateFeature("enableGuestCheckout", checked)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Enable Guest Checkout</label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().features.enableReviews}
								onChange={(checked) => updateFeature("enableReviews", checked)}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Enable Product Reviews</label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().features.enableWishlist}
								onChange={(checked) => updateFeature("enableWishlist", checked)}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Enable Wishlist</label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().features.enableNewsletter}
								onChange={(checked) =>
									updateFeature("enableNewsletter", checked)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Enable Newsletter</label>
						</div>
					</div>
				</Card>

				{/* Notifications */}
				<Card class="p-6">
					<h2 class="text-xl font-semibold mb-6">Notifications</h2>
					<div class="grid gap-4">
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().notifications.orderConfirmation}
								onChange={(checked) =>
									updateNotification("orderConfirmation", checked)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Order Confirmation Emails</label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().notifications.orderStatusUpdate}
								onChange={(checked) =>
									updateNotification("orderStatusUpdate", checked)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Order Status Update Notifications</label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().notifications.newUserRegistration}
								onChange={(checked) =>
									updateNotification("newUserRegistration", checked)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">New User Registration Notifications</label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().notifications.lowStockAlert}
								onChange={(checked) =>
									updateNotification("lowStockAlert", checked)
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Low Stock Alerts</label>
						</div>
					</div>
				</Card>

				{/* Maintenance Mode */}
				<Card class="p-6">
					<h2 class="text-xl font-semibold mb-6">Maintenance Mode</h2>
					<div class="space-y-4">
						<div class="flex items-center space-x-2">
							<Checkbox
								checked={settings().maintenance.enableMaintenanceMode}
								onChange={(checked) =>
									setSettings((prev) => ({
										...prev,
										maintenance: {
											...prev.maintenance,
											enableMaintenanceMode: checked,
										},
									}))
								}
								disabled={!adminStore.hasPermission("settings", "edit")}
							/>
							<label class="text-sm">Enable Maintenance Mode</label>
						</div>
						<Input
							label="Maintenance Message"
							value={settings().maintenance.maintenanceMessage}
							onChange={(e) =>
								setSettings((prev) => ({
									...prev,
									maintenance: {
										...prev.maintenance,
										maintenanceMessage: e.currentTarget.value,
									},
								}))
							}
							disabled={
								!settings().maintenance.enableMaintenanceMode ||
								!adminStore.hasPermission("settings", "edit")
							}
						/>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Settings;
