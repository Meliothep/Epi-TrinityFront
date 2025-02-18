import { Component, Show, For, createMemo, createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { cn } from "../../lib/utils";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useUI } from "../../stores/ui.store";
import { Cart } from "../features/cart/Cart";
import { authStore } from "../../stores/auth.store";
import { Button } from "../ui/Button";
import { FiUser, FiMenu, FiX } from "solid-icons/fi";
import { adminStore } from "../../stores/admin.store";
import { publicRoutes } from "../../routes/public/routes";
import { protectedRoutes } from "../../routes/protected/routes";
import { adminRoutes } from "../../routes/admin/routes";
import { AppRoute } from "../../routes/types";
import { Portal } from "solid-js/web";

interface HeaderProps {
	class?: string;
	sticky?: boolean;
}

export const Header: Component<HeaderProps> = (props) => {
	const navigate = useNavigate();
	const { isMobileMenuOpen, toggleMobileMenu } = useUI();
	const [isClosing, setIsClosing] = createSignal(false);

	// Combine and filter navigation links based on auth status and role
	const navigationLinks = createMemo(() => {
		const allRoutes = [...publicRoutes, ...protectedRoutes, ...adminRoutes];
		return allRoutes.filter((route) => {
			// Only show routes that are marked for navigation
			if (!route.showInNav) return false;
			// Filter based on authentication
			if (route.requiresAuth && !authStore.isAuthenticated) return false;
			if (route.requiresAdmin && !adminStore.isAdmin()) return false;
			return true;
		});
	});

	const handleClose = () => {
		setIsClosing(true);
		// Wait for animation to complete before fully closing
		setTimeout(() => {
			setIsClosing(false);
			toggleMobileMenu();
		}, 200); // Match the duration of the exit animation
	};

	const handleLogout = async () => {
		try {
			// Close mobile menu if open
			if (isMobileMenuOpen()) {
				handleClose();
			}

			// Attempt to sign out
			await authStore.logout();
			// The page will automatically refresh and redirect to home
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<header
			class={cn(
				"w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
				"border-b border-border/40",
				props.sticky && "sticky top-0 z-50",
				"motion-translate-y-in-0 motion-duration-300 motion-ease-spring-smooth",
				props.class
			)}
		>
			<div class="container mx-auto px-4">
				<div class="relative flex h-16 items-center justify-between gap-4">
					{/* Logo */}
					<div class="flex items-center">
						<A
							href="/"
							class="text-xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
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
							"px-2 rounded-full border border-border/40",
							"motion-safe:motion-translate-y-in-0 motion-safe:motion-duration-300 motion-safe:motion-ease-spring-smooth"
						)}
						aria-label="Main navigation"
					>
						<For each={navigationLinks()}>
							{(route: AppRoute, index) => (
								<Show when={route.title}>
									<A
										href={route.path}
										class={cn(
											"relative px-4 py-2 text-sm font-medium",
											"hover:text-primary rounded-full transition-colors duration-200",
											"data-[active]:text-primary data-[active]:bg-muted",
											"motion-safe:motion-translate-y-in-0 motion-safe:motion-duration-300",
											"motion-safe:motion-delay-[var(--delay)]"
										)}
										style={{ "--delay": `${index() * 50}ms` }}
										end={route.path === "/"}
									>
										{route.title}
									</A>
								</Show>
							)}
						</For>
					</nav>

					{/* Desktop Actions */}
					<div
						class={cn(
							"hidden md:flex items-center gap-2",
							"motion-safe:motion-translate-y-in-0 motion-safe:motion-duration-300 motion-safe:motion-ease-spring-smooth"
						)}
					>
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
											class={cn(
												"h-8 w-8 rounded-full ring-2 ring-background",
												"motion-safe:motion-scale-in-95 motion-safe:motion-duration-300"
											)}
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
					<div
						class={cn(
							"flex md:hidden items-center gap-2",
							"motion-safe:motion-translate-y-in-0 motion-safe:motion-duration-300 motion-safe:motion-ease-spring-smooth"
						)}
					>
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
										class={cn(
											"h-8 w-8 rounded-full ring-2 ring-background",
											"motion-safe:motion-scale-in-95 motion-safe:motion-duration-300"
										)}
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
							class="rounded-full transition-transform duration-200"
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
				<Show when={isMobileMenuOpen() || isClosing()}>
					<Portal>
						<div
							id="mobile-menu"
							class={cn(
								"fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
								"motion-opacity-in-0 motion-duration-200",
								isClosing() && "motion-opacity-out-0 motion-duration-200"
							)}
							onClick={handleClose}
						>
							<div
								class={cn(
									"fixed right-0 top-0 h-[100dvh] w-full max-w-md border-l bg-background p-6 shadow-lg",
									"motion-translate-x-in-100 motion-duration-300 motion-ease-spring-smooth",
									isClosing() &&
										"motion-translate-x-out-100 motion-duration-200"
								)}
								onClick={(e) => e.stopPropagation()}
							>
								<div class="flex items-center justify-between mb-6">
									<h2 class="text-xl font-semibold motion-translate-y-in-25 motion-duration-500">
										Menu
									</h2>
									<Button
										variant="ghost"
										size="icon"
										onClick={handleClose}
										class="motion-rotate-in-180 motion-duration-200 hover:motion-rotate-out-180"
									>
										<span class="sr-only">Close menu</span>
										<FiX class="h-6 w-6" />
									</Button>
								</div>
								<nav
									class="flex flex-col space-y-1"
									aria-label="Mobile navigation"
								>
									<For each={navigationLinks()}>
										{(route: AppRoute, index) => (
											<Show when={route.title}>
												<A
													href={route.path}
													class={cn(
														"px-4 py-2 text-sm font-medium",
														"hover:text-primary hover:bg-muted rounded-lg transition-colors duration-200",
														"data-[active]:text-primary data-[active]:bg-muted",
														"motion-translate-x-in-25 motion-duration-300",
														"motion-delay-[var(--delay)]"
													)}
													style={{ "--delay": `${index() * 50}ms` }}
													end={route.path === "/"}
													onClick={toggleMobileMenu}
												>
													{route.title}
												</A>
											</Show>
										)}
									</For>
									<Show
										when={!authStore.isAuthenticated}
										fallback={
											<Button
												variant="outline"
												class={cn(
													"mx-4 mt-6 shadow-sm",
													"motion-translate-y-in-25 motion-duration-300 motion-delay-300"
												)}
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
											class={cn(
												"mx-4 mt-6 shadow-sm",
												"motion-translate-y-in-25 motion-duration-300 motion-delay-300"
											)}
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
						</div>
					</Portal>
				</Show>
			</div>
		</header>
	);
};
