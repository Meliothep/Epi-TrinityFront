import { Component } from "solid-js";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import type { Activity } from "../../types/admin";
import { FiShoppingBag, FiUser, FiBox, FiClock } from "solid-icons/fi";

interface ActivityFeedProps {
	activities: Activity[];
	title?: string;
	onViewAll?: () => void;
}

export const ActivityFeed: Component<ActivityFeedProps> = (props) => {
	const getActivityIcon = (type: Activity["type"]) => {
		switch (type) {
			case "order":
				return FiShoppingBag;
			case "user":
				return FiUser;
			case "product":
				return FiBox;
			default:
				return FiClock;
		}
	};

	const formatTimestamp = (timestamp: string) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (days > 0) {
			return `${days}d ago`;
		}
		if (hours > 0) {
			return `${hours}h ago`;
		}
		if (minutes > 0) {
			return `${minutes}m ago`;
		}
		return "Just now";
	};

	return (
		<Card class="p-6">
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-lg font-semibold">
					{props.title || "Recent Activity"}
				</h3>
				{props.onViewAll && (
					<Button variant="ghost" onClick={props.onViewAll}>
						View All
					</Button>
				)}
			</div>
			<div class="space-y-4">
				<For each={props.activities}>
					{(activity) => {
						const Icon = getActivityIcon(activity.type);
						return (
							<div class="flex items-start gap-4 py-2">
								<div
									class={
										activity.type === "order"
											? "bg-purple-500/10 text-purple-500"
											: activity.type === "user"
											? "bg-blue-500/10 text-blue-500"
											: "bg-green-500/10 text-green-500"
									}
									class="p-2 rounded-full"
								>
									<Icon class="h-4 w-4" />
								</div>
								<div class="flex-1 space-y-1">
									<p class="text-sm">{activity.description}</p>
									<p class="text-xs text-muted-foreground">
										{formatTimestamp(activity.timestamp)}
									</p>
								</div>
							</div>
						);
					}}
				</For>
			</div>
		</Card>
	);
};
