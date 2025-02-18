import { Component, onMount } from "solid-js";
import { Line } from "solid-chartjs";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { Card } from "../ui/Card";
import type { SalesTrendData } from "../../types/admin";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

interface SalesChartProps {
	data: SalesTrendData[];
	title: string;
}

export const SalesChart: Component<SalesChartProps> = (props) => {
	// First, let's create a simple version of the chart
	const chartData = {
		labels: props.data.map((item) => new Date(item.date).toLocaleDateString()),
		datasets: [
			{
				label: "Sales",
				data: props.data.map((item) => item.sales),
				borderColor: "#2563eb",
				backgroundColor: "#2563eb33",
				fill: true,
				tension: 0.4,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || "";
						if (label) {
							label += ": ";
						}
						if (context.parsed.y !== null) {
							label += new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(context.parsed.y);
						}
						return label;
					},
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value) {
						return new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
							notation: "compact",
						}).format(value);
					},
				},
			},
		},
	};

	// Add a fallback in case the chart fails to render
	const fallback = () => (
		<div class="flex items-center justify-center h-full">
			<p class="text-muted-foreground">Loading chart...</p>
		</div>
	);

	return (
		<Card class="p-6">
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">{props.title}</h3>
				<div class="h-[300px] w-full">
					<Line data={chartData} options={chartOptions} fallback={fallback} />
				</div>
			</div>
		</Card>
	);
};
