import { Component } from "solid-js";
import { Card } from "../components/common/Card";

const Dashboard: Component = () => {
	return (
		<div class="container mx-auto px-4 py-8">
			<div class="space-y-8">
				<div>
					<h1 class="text-3xl font-bold">Dashboard</h1>
					<p class="text-muted-foreground mt-2">Welcome to your dashboard</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card padding="lg">
						<h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
						<p class="text-muted-foreground">No recent orders found</p>
					</Card>

					<Card padding="lg">
						<h2 class="text-xl font-semibold mb-4">Account Summary</h2>
						<p class="text-muted-foreground">
							Account details will be displayed here
						</p>
					</Card>

					<Card padding="lg">
						<h2 class="text-xl font-semibold mb-4">Notifications</h2>
						<p class="text-muted-foreground">No new notifications</p>
					</Card>
				</div>

				<Card padding="lg">
					<h2 class="text-xl font-semibold mb-4">Activity Overview</h2>
					<div class="space-y-4">
						<p class="text-muted-foreground">
							Recent activity will be displayed here
						</p>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
