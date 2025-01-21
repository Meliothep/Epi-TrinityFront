import { Component } from "solid-js";
import { Button } from "../../ui/Button";
import { Card } from "../../common/Card";
import { Input } from "../../forms/Input";
import { Header } from "../../layout/Header";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { RegisterForm } from "../auth/RegisterForm";

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

				{/* Theme Toggle Section */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Theme Toggle</h2>
						<p class="text-muted-foreground">
							Switch between light and dark mode with a smooth transition.
						</p>
					</div>
					<Card class="overflow-hidden">
						<div class="p-6 flex justify-center">
							<ThemeToggle />
						</div>
					</Card>
				</section>

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
							<div class="space-y-4">
								<h3 class="text-lg font-medium">Variants</h3>
								<div class="flex flex-wrap gap-4">
									<Button>Primary Button</Button>
									<Button variant="secondary">Secondary Button</Button>
									<Button variant="outline">Outline Button</Button>
									<Button variant="ghost">Ghost Button</Button>
									<Button variant="link">Link Button</Button>
									<Button variant="destructive">Destructive Button</Button>
								</div>
							</div>
							<div class="space-y-4">
								<h3 class="text-lg font-medium">Sizes</h3>
								<div class="flex flex-wrap gap-4 items-center">
									<Button size="sm">Small Button</Button>
									<Button size="md">Medium Button</Button>
									<Button size="lg">Large Button</Button>
								</div>
							</div>
							<div class="space-y-4">
								<h3 class="text-lg font-medium">States</h3>
								<div class="flex flex-wrap gap-4">
									<Button disabled>Disabled Button</Button>
									<Button loading>Loading Button</Button>
									<Button class="w-full">Full Width Button</Button>
								</div>
							</div>
						</div>
					</Card>
				</section>

				{/* Cards Section */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Cards</h2>
						<p class="text-muted-foreground">
							Versatile card components with different styles and layouts.
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
					<div class="grid gap-6 md:grid-cols-2">
						<Card class="hover:shadow-xl transition-shadow bg-primary text-primary-foreground">
							<div class="text-center">
								<h3 class="font-medium">Primary Card</h3>
								<p class="text-sm opacity-90">With background color</p>
							</div>
						</Card>
						<Card class="hover:shadow-xl transition-shadow border-2">
							<div class="text-center">
								<h3 class="font-medium">Bordered Card</h3>
								<p class="text-sm text-muted-foreground">With custom border</p>
							</div>
						</Card>
					</div>
				</section>

				{/* Forms Section */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Form Inputs</h2>
						<p class="text-muted-foreground">
							Accessible form components with various states and validations.
						</p>
					</div>
					<Card class="max-w-2xl mx-auto">
						<div class="space-y-6">
							<div class="space-y-4">
								<h3 class="text-lg font-medium">Basic Inputs</h3>
								<div class="grid gap-4 md:grid-cols-2">
									<Input label="Text Input" placeholder="Enter text" />
									<Input
										label="Email Input"
										type="email"
										placeholder="Enter email"
									/>
									<Input
										label="Password Input"
										type="password"
										placeholder="Enter password"
									/>
									<Input
										label="Number Input"
										type="number"
										placeholder="Enter number"
									/>
								</div>
							</div>
							<div class="space-y-4">
								<h3 class="text-lg font-medium">Input States</h3>
								<div class="grid gap-4 md:grid-cols-2">
									<Input
										label="Required Input"
										placeholder="Required field"
										required
									/>
									<Input
										label="Disabled Input"
										placeholder="Disabled field"
										disabled
									/>
									<Input
										label="With Helper Text"
										placeholder="Enter text"
										helperText="This is a helpful message"
									/>
									<Input
										label="With Error"
										placeholder="Enter text"
										error="This field has an error"
									/>
								</div>
							</div>
						</div>
					</Card>
				</section>

				{/* Complete Form Examples */}
				<section class="space-y-6">
					<div class="flex flex-col items-center text-center space-y-2">
						<h2 class="text-2xl font-semibold">Form Examples</h2>
						<p class="text-muted-foreground">
							Complete form examples combining various components.
						</p>
					</div>

					{/* Simple Forms Grid */}
					<div class="grid gap-6 md:grid-cols-2">
						<Card class="hover:shadow-xl transition-shadow">
							<div class="space-y-4">
								<h3 class="text-xl font-medium text-center">Login Form</h3>
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
									<div class="flex items-center justify-between">
										<Button variant="outline" size="sm">
											Forgot password?
										</Button>
										<Button type="submit">Login</Button>
									</div>
								</form>
							</div>
						</Card>
						<Card class="hover:shadow-xl transition-shadow">
							<div class="space-y-4">
								<h3 class="text-xl font-medium text-center">Contact Form</h3>
								<form class="space-y-4">
									<Input label="Name" required placeholder="Enter your name" />
									<Input
										label="Email"
										type="email"
										required
										placeholder="Enter your email"
									/>
									<Input
										label="Message"
										placeholder="Enter your message"
										helperText="Maximum 500 characters"
									/>
									<Button type="submit" class="w-full">
										Send Message
									</Button>
								</form>
							</div>
						</Card>
					</div>

					{/* Complex Form Example */}
					<div class="mt-12">
						<div class="text-center mb-6">
							<h3 class="text-xl font-medium">Registration Form</h3>
							<p class="text-sm text-muted-foreground">
								A complete registration form with validation and interactive
								elements
							</p>
						</div>
						<RegisterForm />
					</div>
				</section>
			</main>
		</div>
	);
};
