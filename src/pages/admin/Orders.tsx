import { Component, createSignal, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/forms/Input";
import { Spinner } from "../../components/ui/Spinner";
import { adminStore, useAdminStore } from "../../stores/admin.store";
import { formatPrice, cn } from "../../lib/utils";
import {
	FiChevronDown,
	FiChevronUp,
	FiClock,
	FiAlertCircle,
	FiFilter,
} from "solid-icons/fi";

const Orders: Component = () => {
	const navigate = useNavigate();
	const { setupOrdersEffect } = useAdminStore();
	const [expandedOrderId, setExpandedOrderId] = createSignal<string | null>(
		null
	);
	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedStatus, setSelectedStatus] = createSignal<string>("all");
	const [dateRange, setDateRange] = createSignal<{
		start: Date | null;
		end: Date | null;
	}>({ start: null, end: null });

	// Set up the orders effect to handle pagination, filtering, and sorting
	setupOrdersEffect();

	// Filter orders based on selected criteria
	const filteredOrders = () => {
		let orders = adminStore.orders.items;

		// Filter by search query
		if (searchQuery()) {
			const query = searchQuery().toLowerCase();
			orders = orders.filter(
				(order) =>
					order.customerName?.toLowerCase().includes(query) ||
					order.customerEmail?.toLowerCase().includes(query) ||
					order.orderId.toLowerCase().includes(query)
			);
		}

		// Filter by status
		if (selectedStatus() !== "all") {
			orders = orders.filter((order) => order.status === selectedStatus());
		}

		// Filter by date range
		if (dateRange().start && dateRange().end) {
			orders = orders.filter((order) => {
				const orderDate = new Date(order.createdAt);
				return orderDate >= dateRange().start! && orderDate <= dateRange().end!;
			});
		}

		return orders;
	};

	const toggleOrderExpansion = (orderId: string) => {
		setExpandedOrderId((current) => (current === orderId ? null : orderId));
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-500/20 text-green-500";
			case "pending":
				return "bg-yellow-500/20 text-yellow-500";
			case "failed":
				return "bg-red-500/20 text-red-500";
			default:
				return "bg-gray-500/20 text-gray-500";
		}
	};

	return (
		<div class="space-y-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold">Orders</h1>
					<p class="text-muted-foreground">Manage customer orders</p>
				</div>
			</div>

			{/* Filters */}
			<Card class="p-4">
				<div class="grid gap-4 md:grid-cols-4">
					<Input
						placeholder="Search orders..."
						value={searchQuery()}
						onInput={(e) => setSearchQuery(e.currentTarget.value)}
					/>
					<select
						value={selectedStatus()}
						onChange={(e) => setSelectedStatus(e.currentTarget.value)}
						class="px-3 py-1.5 rounded-md border bg-background"
						aria-label="Filter orders by status"
					>
						<option value="all">All Orders</option>
						<option value="completed">Completed</option>
						<option value="pending">Pending</option>
						<option value="failed">Failed</option>
					</select>
					<input
						type="date"
						value={dateRange().start?.toISOString().split("T")[0] || ""}
						onChange={(e) =>
							setDateRange((prev) => ({
								...prev,
								start: e.currentTarget.value
									? new Date(e.currentTarget.value)
									: null,
							}))
						}
						class="px-3 py-1.5 rounded-md border bg-background"
						aria-label="Filter orders from date"
					/>
					<input
						type="date"
						value={dateRange().end?.toISOString().split("T")[0] || ""}
						onChange={(e) =>
							setDateRange((prev) => ({
								...prev,
								end: e.currentTarget.value
									? new Date(e.currentTarget.value)
									: null,
							}))
						}
						class="px-3 py-1.5 rounded-md border bg-background"
						aria-label="Filter orders to date"
					/>
				</div>
			</Card>

			{/* Loading State */}
			<Show when={adminStore.orders.loading}>
				<div class="flex justify-center py-12">
					<Spinner size="lg" />
				</div>
			</Show>

			{/* Error State */}
			<Show when={adminStore.orders.error}>
				<Card class="p-6">
					<div class="flex flex-col items-center text-center space-y-4">
						<div class="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
							<FiAlertCircle class="h-6 w-6 text-destructive" />
						</div>
						<div>
							<p class="text-destructive font-medium">
								{adminStore.orders.error}
							</p>
							<Button
								variant="outline"
								class="mt-4"
								onClick={() => adminStore.loadOrders()}
							>
								Try Again
							</Button>
						</div>
					</div>
				</Card>
			</Show>

			{/* Orders List */}
			<div class="space-y-4">
				<Show
					when={filteredOrders().length > 0}
					fallback={
						<Card class="p-8 text-center text-muted-foreground">
							No orders found
						</Card>
					}
				>
					<For each={filteredOrders()}>
						{(order) => (
							<Card class="overflow-hidden">
								{/* Order Header */}
								<div
									class="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50"
									onClick={() => toggleOrderExpansion(order.orderId)}
								>
									<div class="space-y-1">
										<div class="flex items-center gap-2">
											<span class="font-medium">Order #{order.orderId}</span>
											<span
												class={cn(
													"px-2 py-0.5 text-xs rounded-full",
													getStatusColor(order.status)
												)}
											>
												{order.status.charAt(0).toUpperCase() +
													order.status.slice(1)}
											</span>
										</div>
										<div class="text-sm text-muted-foreground flex items-center gap-2">
											<FiClock class="h-4 w-4" />
											{formatDate(order.createdAt)}
										</div>
									</div>
									<div class="flex items-center gap-4">
										<span class="font-medium">{formatPrice(order.total)}</span>
										{expandedOrderId() === order.orderId ? (
											<FiChevronUp class="h-5 w-5" />
										) : (
											<FiChevronDown class="h-5 w-5" />
										)}
									</div>
								</div>

								{/* Order Details */}
								<Show when={expandedOrderId() === order.orderId}>
									<div class="border-t">
										{/* Items */}
										<div class="p-4 space-y-4">
											<h3 class="font-medium">Order Items</h3>
											<div class="space-y-2">
												<For each={order.items}>
													{(item) => (
														<div class="flex justify-between text-sm">
															<span>
																{item.name} (x{item.quantity})
															</span>
															<span>
																{formatPrice(item.price * item.quantity)}
															</span>
														</div>
													)}
												</For>
											</div>
										</div>

										{/* Customer Info */}
										<div class="p-4 border-t space-y-2">
											<h3 class="font-medium">Customer Information</h3>
											<div class="text-sm text-muted-foreground">
												<p>Name: {order.customerName || "N/A"}</p>
												<p>Email: {order.customerEmail || "N/A"}</p>
												<p>Phone: {order.customerPhone || "N/A"}</p>
											</div>
										</div>

										{/* Shipping Address */}
										<Show when={order.shippingAddress}>
											<div class="p-4 border-t space-y-2">
												<h3 class="font-medium">Shipping Address</h3>
												<div class="text-sm text-muted-foreground">
													<p>{order.shippingAddress?.street}</p>
													<p>
														{order.shippingAddress?.city},{" "}
														{order.shippingAddress?.state}{" "}
														{order.shippingAddress?.zipCode}
													</p>
													<p>{order.shippingAddress?.country}</p>
												</div>
											</div>
										</Show>

										{/* Payment Info */}
										<div class="p-4 border-t space-y-2">
											<h3 class="font-medium">Payment Information</h3>
											<div class="text-sm text-muted-foreground">
												<p>Payment Status: {order.paymentStatus}</p>
												<p>Payment Method: {order.paymentMethod || "N/A"}</p>
												<p>Transaction ID: {order.transactionId || "N/A"}</p>
											</div>
										</div>
									</div>
								</Show>
							</Card>
						)}
					</For>
				</Show>
			</div>
		</div>
	);
};

export default Orders;
