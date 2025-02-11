import { Component, JSX, Show, createSignal, createEffect } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import { adminStore } from "../../stores/admin.store";
import { authStore } from "../../stores/auth.store";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { cn } from "../../lib/utils";
import {
	FiUsers,
	FiBox,
	FiShoppingBag,
	FiSettings,
	FiPieChart,
	FiLogOut,
	FiMenu,
	FiX,
} from "solid-icons/fi";

interface AdminLayoutProps {
	children: JSX.Element;
}

const navigationItems = [
	{
		title: "Dashboard",
		href: "/admin",
		icon: FiPieChart,
		permission: { module: "users", action: "view" },
	},
	{
		title: "Users",
		href: "/admin/users",
		icon: FiUsers,
		permission: { module: "users", action: "view" },
	},
	{
		title: "Products",
		href: "/admin/products",
		icon: FiBox,
		permission: { module: "products", action: "view" },
	},
	{
		title: "Orders",
		href: "/admin/orders",
		icon: FiShoppingBag,
		permission: { module: "orders", action: "view" },
	},
	{
		title: "Settings",
		href: "/admin/settings",
		icon: FiSettings,
		permission: { module: "settings", action: "view" },
	},
];

export const AdminLayout: Component<AdminLayoutProps> = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isSidebarOpen, setSidebarOpen] = createSignal(false);

	// Redirect if not admin
	createEffect(() => {
		if (!adminStore.isAdmin()) {
			navigate("/");
		}
	});

	const handleLogout = async () => {
		try {
			await authStore.logout();
			// Note: The page will automatically refresh and redirect to home
			// due to the changes we made in the auth store
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<div class="min-h-screen bg-background">
			{/* Sidebar */}
			<aside
				class={cn(
					"fixed top-0 left-0 z-40 w-64 h-screen transition-transform",
					"bg-card border-r border-border",
					!isSidebarOpen() && "-translate-x-full md:translate-x-0"
				)}
			>
				{/* Logo */}
				<div class="h-16 flex items-center justify-between px-4 border-b">
					<A
						href="/"
						class="text-xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
					>
						Trinity Admin
					</A>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setSidebarOpen(false)}
						class="md:hidden"
					>
						<FiX class="h-5 w-5" />
					</Button>
				</div>

				{/* Navigation */}
				<nav class="p-4 space-y-1">
					<For each={navigationItems}>
						{(item) => (
							<Show
								when={adminStore.hasPermission(
									item.permission.module,
									item.permission.action
								)}
							>
								<A
									href={item.href}
									class={cn(
										"flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
										"hover:bg-muted",
										location.pathname === item.href
											? "bg-primary text-primary-foreground hover:bg-primary/90"
											: "text-muted-foreground hover:text-foreground"
									)}
								>
									<item.icon class="h-5 w-5" />
									{item.title}
								</A>
							</Show>
						)}
					</For>
				</nav>
			</aside>

			{/* Main Content */}
			<div class="md:ml-64">
				{/* Header */}
				<header class="h-16 border-b bg-card/50 backdrop-blur sticky top-0 z-30">
					<div class="h-full px-4 flex items-center justify-between gap-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setSidebarOpen(true)}
							class="md:hidden"
						>
							<FiMenu class="h-5 w-5" />
						</Button>

						<div class="flex items-center gap-4 ml-auto">
							<ThemeToggle />

							<div class="flex items-center gap-2">
								<Show when={authStore.currentUser?.avatar}>
									<img
										src={authStore.currentUser?.avatar}
										alt={authStore.currentUser?.name}
										class="h-8 w-8 rounded-full ring-2 ring-background"
									/>
								</Show>
								<div class="hidden md:block">
									<p class="text-sm font-medium">
										{authStore.currentUser?.name}
									</p>
									<p class="text-xs text-muted-foreground">
										{authStore.currentUser?.role}
									</p>
								</div>
							</div>

							<Button
								variant="ghost"
								size="icon"
								onClick={handleLogout}
								title="Sign out"
							>
								<FiLogOut class="h-5 w-5" />
							</Button>
						</div>
					</div>
				</header>

				{/* Page Content */}
				<main class="p-4 md:p-8">{props.children}</main>
			</div>

			{/* Sidebar Backdrop */}
			<Show when={isSidebarOpen()}>
				<div
					class="fixed inset-0 z-30 bg-black/50 md:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			</Show>
		</div>
	);
};
