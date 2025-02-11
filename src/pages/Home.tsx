import { Component, createEffect, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Button } from "../components/ui/Button";
import { Card } from "../components/common/Card";
import { useProducts } from "../stores/products.store";
import { getProductImageUrl, getFallbackImageUrl, cn } from "../lib/utils";
import {
	FiArrowRight,
	FiHeart,
	FiShield,
	FiStar,
	FiGift,
} from "solid-icons/fi";
import { ProductCard } from "../components/features/products/ProductCard";

const Home: Component = () => {
	const navigate = useNavigate();
	const { products, loading, fetchProducts } = useProducts();

	createEffect(() => {
		fetchProducts();
	});

	return (
		<div class="space-y-16 md:space-y-24 pb-8 md:pb-16">
			{/* Hero Section */}
			<section class="relative overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-background dark:from-primary/5 dark:via-primary/2.5 dark:to-background" />
				<div class="container relative mx-auto px-4 pt-12 md:pt-16 pb-24 md:pb-32">
					<div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
						<div class="space-y-6 md:space-y-8 text-center lg:text-left">
							<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
								Discover{" "}
								<span class="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
									Healthy
								</span>{" "}
								Food Choices
							</h1>
							<p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
								Explore our curated selection of nutritious products with
								detailed information about ingredients, nutrition facts, and
								environmental impact.
							</p>
							<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<Button
									size="lg"
									onClick={() => navigate("/products")}
									class="gap-2"
								>
									Browse Products <FiArrowRight class="h-5 w-5" />
								</Button>
								<Button
									size="lg"
									variant="outline"
									onClick={() => navigate("/categories")}
								>
									View Categories
								</Button>
							</div>
						</div>
						<div class="relative lg:h-[500px] grid grid-cols-2 gap-4 lg:gap-8 max-w-2xl mx-auto">
							{products()
								.slice(0, 4)
								.map((product, index) => (
									<div
										class={cn(
											"rounded-2xl overflow-hidden shadow-xl transition-all duration-500",
											"hover:shadow-2xl hover:scale-105",
											"dark:shadow-primary/5 dark:hover:shadow-primary/10",
											index % 2 === 0 ? "translate-y-8" : "-translate-y-8"
										)}
									>
										<img
											src={
												getProductImageUrl(product.code) ||
												getFallbackImageUrl(product.product_name)
											}
											alt={product.product_name}
											class="w-full h-full object-cover"
											onError={(e) => {
												(e.target as HTMLImageElement).src =
													getFallbackImageUrl(product.product_name);
											}}
										/>
									</div>
								))}
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section class="container mx-auto px-4">
				<div class="text-center space-y-4 mb-12 md:mb-16">
					<h2 class="text-2xl md:text-3xl font-bold">
						Why Choose Trinity Foods?
					</h2>
					<p class="text-muted-foreground max-w-2xl mx-auto">
						We're committed to providing transparent nutritional information and
						helping you make informed food choices.
					</p>
				</div>
				<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
					<Card class="p-6 space-y-4 transition-colors hover:bg-muted/50">
						<div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
							<FiStar class="h-6 w-6 text-primary" />
						</div>
						<h3 class="text-xl font-semibold">Nutrition Grading</h3>
						<p class="text-muted-foreground">
							Clear nutrition scores help you quickly identify healthier options
							for your diet.
						</p>
					</Card>
					<Card class="p-6 space-y-4 transition-colors hover:bg-muted/50">
						<div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
							<FiShield class="h-6 w-6 text-primary" />
						</div>
						<h3 class="text-xl font-semibold">Quality Assurance</h3>
						<p class="text-muted-foreground">
							Detailed information about origins and certifications.
						</p>
					</Card>
					<Card class="p-6 space-y-4 transition-colors hover:bg-muted/50">
						<div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
							<FiHeart class="h-6 w-6 text-primary" />
						</div>
						<h3 class="text-xl font-semibold">Health Focus</h3>
						<p class="text-muted-foreground">
							Comprehensive data to support your healthy lifestyle.
						</p>
					</Card>
					<Card class="p-6 space-y-4 transition-colors hover:bg-muted/50">
						<div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
							<FiGift class="h-6 w-6 text-primary" />
						</div>
						<h3 class="text-xl font-semibold">Eco-Friendly</h3>
						<p class="text-muted-foreground">
							Environmental impact information for conscious choices.
						</p>
					</Card>
				</div>
			</section>

			{/* Featured Products */}
			<section class="container mx-auto px-4">
				<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
					<div class="space-y-2">
						<h2 class="text-2xl md:text-3xl font-bold">Featured Products</h2>
						<p class="text-muted-foreground">
							Discover our top-rated healthy options
						</p>
					</div>
					<Button
						variant="outline"
						onClick={() => navigate("/products")}
						class="gap-2 shrink-0"
					>
						View All <FiArrowRight />
					</Button>
				</div>
				<Show
					when={!loading()}
					fallback={
						<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{Array(4)
								.fill(0)
								.map(() => (
									<Card class="animate-pulse">
										<div class="aspect-square bg-muted rounded-t-lg" />
										<div class="p-4 space-y-3">
											<div class="h-4 bg-muted rounded w-3/4" />
											<div class="h-4 bg-muted rounded w-1/2" />
											<div class="h-4 bg-muted rounded w-1/4" />
										</div>
									</Card>
								))}
						</div>
					}
				>
					<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{products()
							.filter(
								(product) =>
									product.nutrition_grade === "a" ||
									product.nutrition_grade === "b"
							)
							.slice(0, 4)
							.map((product) => (
								<ProductCard product={product} showQuickActions />
							))}
					</div>
				</Show>
			</section>

			{/* Categories Preview */}
			<section class="container mx-auto px-4">
				<div class="text-center space-y-4 mb-8 md:mb-12">
					<h2 class="text-2xl md:text-3xl font-bold">Browse by Category</h2>
					<p class="text-muted-foreground max-w-2xl mx-auto">
						Find exactly what you're looking for in our organized food
						categories
					</p>
				</div>
				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{products()
						.reduce((acc, product) => {
							product.categories.forEach((category) => {
								if (!acc.some((item) => item.name === category)) {
									acc.push({
										name: category,
										image:
											getProductImageUrl(product.code) ||
											getFallbackImageUrl(category),
									});
								}
							});
							return acc;
						}, [] as { name: string; image: string }[])
						.slice(0, 6)
						.map((category) => (
							<div
								class="cursor-pointer transition-transform hover:scale-[1.02]"
								onClick={() =>
									navigate(
										`/products?category=${encodeURIComponent(category.name)}`
									)
								}
							>
								<Card class="group overflow-hidden">
									<div class="aspect-video relative">
										<img
											src={category.image}
											alt={category.name}
											class="w-full h-full object-cover transition-transform group-hover:scale-105"
											onError={(e) => {
												(e.target as HTMLImageElement).src =
													getFallbackImageUrl(category.name);
											}}
										/>
										<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
										<div class="absolute bottom-0 left-0 right-0 p-4">
											<h3 class="text-white font-semibold text-lg">
												{category.name}
											</h3>
										</div>
									</div>
								</Card>
							</div>
						))}
				</div>
				<div class="text-center mt-8">
					<Button
						size="lg"
						variant="outline"
						onClick={() => navigate("/categories")}
						class="gap-2"
					>
						View All Categories <FiArrowRight />
					</Button>
				</div>
			</section>

			{/* CTA Section */}
			<section class="container mx-auto px-4">
				<Card class="bg-gradient-to-br from-primary to-primary-foreground text-primary-foreground p-8 md:p-12">
					<div class="max-w-3xl mx-auto text-center space-y-6">
						<h2 class="text-2xl md:text-3xl font-bold">
							Start Your Healthy Journey Today
						</h2>
						<p class="text-primary-foreground/90 text-base md:text-lg">
							Join us in making better food choices with our comprehensive
							nutrition information and quality products.
						</p>
						<Button
							size="lg"
							variant="secondary"
							onClick={() => navigate("/products")}
							class="shadow-lg"
						>
							Explore Our Products
						</Button>
					</div>
				</Card>
			</section>
		</div>
	);
};

export default Home;
