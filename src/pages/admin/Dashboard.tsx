import { Component, createEffect, createSignal, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { adminStore } from "../../stores/admin.store";
import { StatsCard } from "../../components/admin/StatsCard";
import { SalesChart } from "../../components/admin/SalesChart";
import { ActivityFeed } from "../../components/admin/ActivityFeed";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { formatPrice } from "../../lib/utils";
import {
	FiUsers,
	FiBox,
	FiShoppingBag,
	FiDollarSign,
	FiAlertCircle,
} from "solid-icons/fi";

const Dashboard: Component = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = createSignal(true);
	const [error, setError] = createSignal<string | null>(null);

	// Load dashboard data
	createEffect(async () => {
		try {
			setIsLoading(true);
			setError(null);
			await Promise.all([
				adminStore.loadStats(),
				adminStore.loadRecentActivity(),
				adminStore.loadSalesTrend(),
			]);
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
			description: `${adminStore.stats.activeUsers} active users`,
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
			description: `${adminStore.stats.pendingOrders} pending`,
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
								<StatsCard
									title={stat.title}
									value={stat.value}
									icon={stat.icon}
									color={stat.color}
									description={stat.description}
									onClick={() => navigate(stat.link)}
								/>
							)}
						</For>
					</div>

					{/* Charts and Activity */}
					<div class="grid gap-6 md:grid-cols-2">
						<SalesChart data={adminStore.salesTrend} title="Sales Trend" />
						<ActivityFeed
							activities={adminStore.recentActivity}
							title="Recent Activity"
							onViewAll={() => navigate("/admin/activity")}
						/>
					</div>
				</Show>
			</Show>
		</div>
	);
};

export default Dashboard;
