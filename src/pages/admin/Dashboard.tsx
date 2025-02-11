import { Component, createEffect, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { adminStore } from "../../stores/admin.store";
import { ordersStore } from "../../stores/orders.store";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { formatPrice } from "../../lib/utils";
import {
	FiUsers,
	FiBox,
	FiShoppingBag,
	FiDollarSign,
	FiTrendingUp,
	FiClock,
	FiAlertCircle,
} from "solid-icons/fi";

const Dashboard: Component = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = createSignal(true);
	const [error, setError] = createSignal<string | null>(null);

	// Load admin data
	createEffect(async () => {
		try {
			setIsLoading(true);
			setError(null);
			await Promise.all([adminStore.loadStats(), adminStore.loadPermissions()]);
		} catch (err) {
			setError("Failed to load dashboard data");
			console.error("Dashboard error:", err);
		} finally {
			setIsLoading(false);
		}
	});

	const statCards = [
		{
			title: "Total Users",
			value: adminStore.stats.totalUsers,
			icon: FiUsers,
			color: "bg-blue-500/10 text-blue-500",
			link: "/admin/users",
		},
		{
			title: "Total Products",
			value: adminStore.stats.totalProducts,
			icon: FiBox,
			color: "bg-green-500/10 text-green-500",
			link: "/admin/products",
		},
		{
			title: "Total Orders",
			value: adminStore.stats.totalOrders,
			icon: FiShoppingBag,
			color: "bg-purple-500/10 text-purple-500",
			link: "/admin/orders",
		},
		{
			title: "Total Revenue",
			value: formatPrice(adminStore.stats.totalRevenue),
			icon: FiDollarSign,
			color: "bg-yellow-500/10 text-yellow-500",
			link: "/admin/orders",
		},
	];

	return (
		<div class="space-y-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold">Dashboard</h1>
					<p class="text-muted-foreground">Welcome to your admin dashboard</p>
				</div>
			</div>

			<Show
				when={!isLoading()}
				fallback={
					<div class="flex justify-center py-12">
						<Spinner size="lg" />
					</div>
				}
			>
				<Show
					when={!error()}
					fallback={
						<Card class="p-6">
							<div class="flex flex-col items-center text-center space-y-4">
								<div class="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
									<FiAlertCircle class="h-6 w-6 text-destructive" />
								</div>
								<div>
									<p class="text-destructive font-medium">{error()}</p>
									<Button
										variant="outline"
										class="mt-4"
										onClick={() => window.location.reload()}
									>
										Try Again
									</Button>
								</div>
							</div>
						</Card>
					}
				>
					{/* Stats Grid */}
					<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<For each={statCards}>
							{(stat) => (
								<Card
									class="p-6 hover:shadow-lg transition-shadow cursor-pointer"
									onClick={() => navigate(stat.link)}
								>
									<div class="flex items-center gap-4">
										<div class={cn("p-3 rounded-full", stat.color)}>
											<stat.icon class="h-6 w-6" />
										</div>
										<div>
											<p class="text-sm font-medium text-muted-foreground">
												{stat.title}
											</p>
											<p class="text-2xl font-bold">{stat.value}</p>
										</div>
									</div>
								</Card>
							)}
						</For>
					</div>

					{/* Recent Activity */}
					<div class="grid gap-6 md:grid-cols-2">
						{/* Recent Orders */}
						<Card class="p-6">
							<div class="flex items-center justify-between mb-4">
								<h2 class="text-lg font-semibold">Recent Orders</h2>
								<Button
									variant="ghost"
									onClick={() => navigate("/admin/orders")}
								>
									View All
								</Button>
							</div>
							<div class="space-y-4">
								<For each={ordersStore.getRecentOrders(5)}>
									{(order) => (
										<div class="flex items-center justify-between py-2 border-b last:border-0">
											<div>
												<p class="font-medium">Order #{order.orderId}</p>
												<p class="text-sm text-muted-foreground">
													{order.customerName}
												</p>
											</div>
											<div class="text-right">
												<p class="font-medium">{formatPrice(order.total)}</p>
												<p
													class={cn(
														"text-sm",
														order.status === "completed"
															? "text-green-500"
															: order.status === "pending"
															? "text-yellow-500"
															: "text-red-500"
													)}
												>
													{order.status.charAt(0).toUpperCase() +
														order.status.slice(1)}
												</p>
											</div>
										</div>
									)}
								</For>
							</div>
						</Card>

						{/* Activity Stats */}
						<Card class="p-6">
							<div class="flex items-center justify-between mb-4">
								<h2 class="text-lg font-semibold">Activity Overview</h2>
							</div>
							<div class="space-y-6">
								<div class="flex items-center gap-4">
									<div class="bg-green-500/10 text-green-500 p-3 rounded-full">
										<FiTrendingUp class="h-6 w-6" />
									</div>
									<div>
										<p class="font-medium">Active Users</p>
										<p class="text-2xl font-bold">
											{adminStore.stats.activeUsers}
										</p>
										<p class="text-sm text-muted-foreground">
											{Math.round(
												(adminStore.stats.activeUsers /
													adminStore.stats.totalUsers) *
													100
											)}
											% of total users
										</p>
									</div>
								</div>

								<div class="flex items-center gap-4">
									<div class="bg-yellow-500/10 text-yellow-500 p-3 rounded-full">
										<FiClock class="h-6 w-6" />
									</div>
									<div>
										<p class="font-medium">Pending Orders</p>
										<p class="text-2xl font-bold">
											{adminStore.stats.pendingOrders}
										</p>
										<p class="text-sm text-muted-foreground">Need attention</p>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</Show>
			</Show>
		</div>
	);
};

export default Dashboard;
