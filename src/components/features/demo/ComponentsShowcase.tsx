import { Component } from "solid-js";
import { Button } from "../../ui/Button";
import { Card } from "../../common/Card";
import { Input } from "../../forms/Input";
import { Header } from "../../layout/Header";

export const ComponentsShowcase: Component = () => {
	return (
		<div class="min-h-screen bg-background text-foreground">
			<Header sticky />

			<main class="container mx-auto px-4 py-8 space-y-12">
				<div class="max-w-3xl mx-auto text-center space-y-4">
					<h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
						Components Showcase
					</h1>
					<p class="text-muted-foreground">
						A modern, accessible, and dark-mode compatible component library
						built with SolidJS and Tailwind CSS.
					</p>
				</div>

				{/* Buttons Section */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Buttons</h2>
						<p class="text-muted-foreground">
							Flexible button components with different variants and sizes.
						</p>
					</div>
					<Card class="overflow-hidden">
						<div class="p-6 grid gap-6">
							<div class="flex flex-wrap gap-4">
								<Button>Primary Button</Button>
								<Button variant="secondary">Secondary Button</Button>
								<Button variant="outline">Outline Button</Button>
							</div>
							<div class="flex flex-wrap gap-4">
								<Button size="sm">Small Button</Button>
								<Button size="md">Medium Button</Button>
								<Button size="lg">Large Button</Button>
							</div>
						</div>
					</Card>
				</section>

				{/* Cards Section */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Cards</h2>
						<p class="text-muted-foreground">
							Versatile card components with different padding options and
							shadows.
						</p>
					</div>
					<div class="grid gap-6 md:grid-cols-3">
						<Card padding="sm" shadow class="hover:shadow-xl transition-shadow">
							<div class="text-center">
								<h3 class="font-medium">Small Padding</h3>
								<p class="text-sm text-muted-foreground">Compact layout</p>
							</div>
						</Card>
						<Card padding="md" shadow class="hover:shadow-xl transition-shadow">
							<div class="text-center">
								<h3 class="font-medium">Medium Padding</h3>
								<p class="text-sm text-muted-foreground">Default spacing</p>
							</div>
						</Card>
						<Card padding="lg" shadow class="hover:shadow-xl transition-shadow">
							<div class="text-center">
								<h3 class="font-medium">Large Padding</h3>
								<p class="text-sm text-muted-foreground">Spacious layout</p>
							</div>
						</Card>
					</div>
				</section>

				{/* Forms Section */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Form Inputs</h2>
						<p class="text-muted-foreground">
							Accessible form components with various states and feedback.
						</p>
					</div>
					<Card class="max-w-md mx-auto">
						<div class="space-y-4">
							<Input label="Default Input" placeholder="Enter some text" />
							<Input
								label="With Helper Text"
								placeholder="Enter some text"
								helperText="This is a helper text to provide additional context"
							/>
							<Input
								label="With Error"
								placeholder="Enter some text"
								error="This field is required"
							/>
						</div>
					</Card>
				</section>

				{/* Login Form Section */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Login Form</h2>
						<p class="text-muted-foreground">
							A complete login form example combining various components.
						</p>
					</div>
					<div class="max-w-md mx-auto">
						<Card class="hover:shadow-xl transition-shadow">
							<form class="space-y-4">
								<Input
									label="Email"
									type="email"
									required
									placeholder="Enter your email"
								/>
								<Input
									label="Password"
									type="password"
									required
									placeholder="Enter your password"
								/>
								<Button type="submit" class="w-full">
									Login
								</Button>
							</form>
						</Card>
					</div>
				</section>
			</main>
		</div>
	);
};
