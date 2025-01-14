import { Component } from "solid-js";
import { clsx } from "../../lib/utils";
import { ThemeToggle } from "../ui/ThemeToggle";

interface HeaderProps {
	class?: string;
	sticky?: boolean;
}

export const Header: Component<HeaderProps> = (props) => {
	return (
		<header
			class={clsx(
				"w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
				"border-b border-border",
				props.sticky && "sticky top-0 z-50",
				props.class
			)}
		>
			<div class="container mx-auto px-4 h-16 flex items-center justify-between">
				<div class="flex items-center space-x-4">
					{/* Logo */}
					<a
						href="/"
						class="text-xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
					>
						Trinity
					</a>
				</div>

				{/* Navigation */}
				<nav class="hidden md:flex items-center space-x-6">
					<a
						href="/dashboard"
						class="text-sm font-medium transition-colors hover:text-primary"
					>
						Dashboard
					</a>
					<a
						href="/profile"
						class="text-sm font-medium transition-colors hover:text-primary"
					>
						Profile
					</a>
					<ThemeToggle />
				</nav>

				{/* Mobile menu button */}
				<button
					class="md:hidden p-2 rounded-md hover:bg-accent"
					aria-label="Toggle mobile menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
		</header>
	);
};
