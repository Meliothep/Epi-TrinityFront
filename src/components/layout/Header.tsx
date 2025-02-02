import { Component, Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { cn } from "../../lib/utils";
import { styles } from "../../lib/styles";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useUI } from "../../stores/ui.store";
import { Cart } from "../features/cart/Cart";

interface HeaderProps {
	class?: string;
	sticky?: boolean;
}

interface NavLink {
	href: string;
	label: string;
	end?: boolean;
}

const navLinks: NavLink[] = [
	{ href: "/", label: "Home", end: true },
	{ href: "/products", label: "Products" },
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/profile", label: "Profile" },
	{ href: "/showcase", label: "Showcase" },
];

export const Header: Component<HeaderProps> = (props) => {
	const { isMobileMenuOpen, toggleMobileMenu } = useUI();

	return (
		<header
			class={cn(
				"w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
				"border-b border-border",
				props.sticky && "sticky top-0 z-50",
				props.class
			)}
		>
			<div class="container mx-auto px-4">
				<div class="relative flex h-16 items-center justify-between">
					{/* Logo */}
					<div class={styles.flex.start}>
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
						class={cn("hidden md:flex items-center space-x-6")}
						aria-label="Main navigation"
					>
						<For each={navLinks}>
							{(link: NavLink) => (
								<A
									href={link.href}
									class={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										"data-[active]:text-primary"
									)}
									end={link.end}
									aria-current={link.end ? "page" : undefined}
								>
									{link.label}
								</A>
							)}
						</For>
						<div class={styles.flex.center}>
							<Cart />
							<ThemeToggle />
						</div>
					</nav>

					{/* Mobile Navigation Controls */}
					<div class={cn("flex md:hidden items-center gap-2")}>
						<button
							type="button"
							class={cn(
								"inline-flex items-center justify-center rounded-md p-2 hover:bg-accent",
								"text-foreground"
							)}
							onClick={toggleMobileMenu}
							aria-controls="mobile-menu"
							aria-expanded={isMobileMenuOpen() ? "true" : "false"}
							aria-label="Toggle mobile menu"
						>
							<span class="sr-only">Open main menu</span>
							<Show
								when={!isMobileMenuOpen()}
								fallback={
									<svg
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								}
							>
								<svg
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							</Show>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<Show when={isMobileMenuOpen()}>
					<div
						id="mobile-menu"
						class={cn(
							"md:hidden border-t border-border animate-in slide-in-from-top"
						)}
					>
						<nav
							class={cn("flex flex-col space-y-4 py-6")}
							aria-label="Mobile navigation"
						>
							<For each={navLinks}>
								{(link: NavLink) => (
									<A
										href={link.href}
										class={cn(
											"text-sm font-medium transition-colors hover:text-primary px-4",
											"data-[active]:text-primary"
										)}
										end={link.end}
										aria-current={link.end ? "page" : undefined}
										onClick={toggleMobileMenu}
									>
										{link.label}
									</A>
								)}
							</For>
							<div class={cn("flex items-center gap-4 px-4")}>
								<Cart />
								<ThemeToggle />
							</div>
						</nav>
					</div>
				</Show>
			</div>
		</header>
	);
};
