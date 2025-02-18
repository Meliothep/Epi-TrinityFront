import { Component, JSX } from "solid-js";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

interface StatsCardProps {
	title: string;
	value: string | number;
	icon: (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element;
	description?: string;
	trend?: {
		value: number;
		direction: "up" | "down";
	};
	color?: string;
	onClick?: () => void;
}

export const StatsCard: Component<StatsCardProps> = (props) => {
	return (
		<Card
			class={cn(
				"p-6 hover:shadow-lg transition-shadow",
				props.onClick && "cursor-pointer"
			)}
			onClick={props.onClick}
		>
			<div class="flex items-center gap-4">
				<div
					class={cn(
						"p-3 rounded-full",
						props.color || "bg-primary/10 text-primary"
					)}
				>
					<props.icon class="h-6 w-6" />
				</div>
				<div class="space-y-1">
					<p class="text-sm font-medium text-muted-foreground">{props.title}</p>
					<p class="text-2xl font-bold">{props.value}</p>
					{(props.description || props.trend) && (
						<div class="flex items-center gap-2">
							{props.trend && (
								<span
									class={cn(
										"text-sm font-medium",
										props.trend.direction === "up"
											? "text-green-500"
											: "text-red-500"
									)}
								>
									{props.trend.direction === "up" ? "↑" : "↓"}{" "}
									{Math.abs(props.trend.value)}%
								</span>
							)}
							{props.description && (
								<span class="text-sm text-muted-foreground">
									{props.description}
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		</Card>
	);
};
