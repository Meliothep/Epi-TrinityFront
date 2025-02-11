import { Component, Show, For, createMemo } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { cn } from "../../lib/utils";
import { styles } from "../../lib/styles";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useUI } from "../../stores/ui.store";
import { Cart } from "../features/cart/Cart";
import { authStore } from "../../stores/auth.store";
import { Button } from "../ui/Button";
import { FiUser, FiMenu, FiX } from "solid-icons/fi";
import { toast } from "react-hot-toast";
import { adminStore } from "../../stores/admin.store";

interface HeaderProps {
	class?: string;
	sticky?: boolean;
}

interface NavLink {
	href: string;
	label: string;
	end?: boolean;
	requiresAuth?: boolean;
	publicOnly?: boolean;
	requiresAdmin?: boolean;
}

const navLinks: NavLink[] = [
	{ href: "/", label: "Home", end: true },
	{ href: "/products", label: "Products" },
	{ href: "/categories", label: "Categories" },
	{ href: "/orders", label: "Orders", requiresAuth: true },
	{ href: "/profile", label: "Profile", requiresAuth: true },
	{ href: "/admin", label: "Admin Dashboard", requiresAdmin: true },
	{ href: "/showcase", label: "Showcase" },
];

export const Header: Component<HeaderProps> = (props) => {
	const navigate = useNavigate();
	const { isMobileMenuOpen, toggleMobileMenu } = useUI();

	// Filter navigation links based on auth status and role
	const filteredNavLinks = createMemo(() => {
		return navLinks.filter((link) => {
			if (link.requiresAuth && !authStore.isAuthenticated) return false;
			if (link.publicOnly && authStore.isAuthenticated) return false;
			if (link.requiresAdmin && !adminStore.isAdmin()) return false;
			return true;
		});
	});

	const handleLogout = async () => {
		try {
			// Close mobile menu if open
			if (isMobileMenuOpen()) {
				toggleMobileMenu();
			}

			// Attempt to sign out
			await authStore.logout();
			// Note: The page will automatically refresh and redirect to home
			// due to the changes we made in the auth store
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<header
			class={cn(
				"w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
				"border-b border-border/40",
				"transition-all duration-200",
				props.sticky && "sticky top-0 z-50",
				props.class
			)}
		>
			<div class="container mx-auto px-4">
				<div class="relative flex h-16 items-center justify-between gap-4">
					{/* Logo */}
					<div class="flex items-center">
						<A
							href="/"
							class="text-xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent hover:opacity-80 transition-opacity"
							aria-label="Trinity - Home"
						>
							Trinity
						</A>
					</div>

					{/* Desktop Navigation */}
					<nav
						class={cn(
							"hidden md:flex items-center space-x-1",
							"bg-background/50 backdrop-blur-sm",
							"px-2 rounded-full border border-border/40"
						)}
						aria-label="Main navigation"
					>
						<For each={filteredNavLinks()}>
							{(link: NavLink) => (
								<A
									href={link.href}
									class={cn(
										"relative px-4 py-2 text-sm font-medium transition-colors",
										"hover:text-primary rounded-full",
										"data-[active]:text-primary data-[active]:bg-muted"
									)}
									end={link.end}
									aria-current={link.end ? "page" : undefined}
								>
									{link.label}
								</A>
							)}
						</For>
					</nav>

					{/* Desktop Actions */}
					<div class="hidden md:flex items-center gap-2">
						<Cart />
						<ThemeToggle />
						<Show
							when={authStore.isAuthenticated}
							fallback={
								<Button
									variant="outline"
									onClick={() => navigate("/login")}
									class="shadow-sm"
								>
									Sign in
								</Button>
							}
						>
							<div class="flex items-center gap-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigate("/profile")}
									title="Profile"
									class="rounded-full"
								>
									<Show
										when={authStore.currentUser?.avatar}
										fallback={<FiUser class="h-5 w-5" />}
									>
										<img
											src={authStore.currentUser?.avatar}
											alt={authStore.currentUser?.name}
											class="h-8 w-8 rounded-full ring-2 ring-background"
										/>
									</Show>
								</Button>
								<Button
									variant="outline"
									onClick={handleLogout}
									class="shadow-sm"
								>
									Sign out
								</Button>
							</div>
						</Show>
					</div>

					{/* Mobile Navigation Controls */}
					<div class="flex md:hidden items-center gap-2">
						<Show when={authStore.isAuthenticated}>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => navigate("/profile")}
								title="Profile"
								class="rounded-full"
							>
								<Show
									when={authStore.currentUser?.avatar}
									fallback={<FiUser class="h-5 w-5" />}
								>
									<img
										src={authStore.currentUser?.avatar}
										alt={authStore.currentUser?.name}
										class="h-8 w-8 rounded-full ring-2 ring-background"
									/>
								</Show>
							</Button>
						</Show>
						<Cart />
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleMobileMenu}
							aria-controls="mobile-menu"
							aria-expanded={isMobileMenuOpen()}
							class="rounded-full"
						>
							<span class="sr-only">Open main menu</span>
							<Show
								when={!isMobileMenuOpen()}
								fallback={<FiX class="h-5 w-5" />}
							>
								<FiMenu class="h-5 w-5" />
							</Show>
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				<Show when={isMobileMenuOpen()}>
					<div
						id="mobile-menu"
						class={cn(
							"md:hidden border-t border-border/40",
							"animate-in slide-in-from-top",
							"bg-background/95 backdrop-blur"
						)}
					>
						<nav
							class="flex flex-col space-y-1 py-4"
							aria-label="Mobile navigation"
						>
							<For each={filteredNavLinks()}>
								{(link: NavLink) => (
									<A
										href={link.href}
										class={cn(
											"px-4 py-2 text-sm font-medium transition-colors",
											"hover:text-primary hover:bg-muted rounded-lg",
											"data-[active]:text-primary data-[active]:bg-muted"
										)}
										end={link.end}
										aria-current={link.end ? "page" : undefined}
										onClick={toggleMobileMenu}
									>
										{link.label}
									</A>
								)}
							</For>
							<Show
								when={!authStore.isAuthenticated}
								fallback={
									<Button
										variant="outline"
										class="mx-4 mt-3 shadow-sm"
										onClick={() => {
											handleLogout();
											toggleMobileMenu();
										}}
									>
										Sign out
									</Button>
								}
							>
								<Button
									variant="outline"
									class="mx-4 mt-3 shadow-sm"
									onClick={() => {
										navigate("/login");
										toggleMobileMenu();
									}}
								>
									Sign in
								</Button>
							</Show>
						</nav>
					</div>
				</Show>
			</div>
		</header>
	);
};
