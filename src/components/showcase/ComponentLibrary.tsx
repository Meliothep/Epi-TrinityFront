import { Component, createSignal } from "solid-js";
import { Alert } from "../ui/Alert";
import { Badge } from "../ui/Badge";
import { Spinner } from "../ui/Spinner";
import { Skeleton } from "../ui/Skeleton";
import { Switch } from "../forms/Switch";
import { Select } from "../forms/Select";
import { Checkbox } from "../forms/Checkbox";
import { TextArea } from "../forms/TextArea";
import { RadioGroup } from "../forms/RadioGroup";
import { FileUpload } from "../forms/FileUpload";
import { SearchInput } from "../forms/SearchInput";
import { Modal } from "../layout/Modal";
import { Tabs } from "../ui/Tabs";
import { Tooltip } from "../ui/Tooltip";
import { DemoNavigation } from "../layout/DemoNavigation";

export const ComponentLibrary: Component = () => {
	const [isModalOpen, setIsModalOpen] = createSignal(false);
	const [isLoading, setIsLoading] = createSignal(false);

	// Demo data
	const selectOptions = [
		{ label: "Option 1", value: "1" },
		{ label: "Option 2", value: "2" },
		{ label: "Option 3", value: "3", disabled: true },
	];

	const radioOptions = [
		{
			value: "1",
			label: "Option 1",
			description: "This is a description for option 1",
		},
		{
			value: "2",
			label: "Option 2",
			description: "This is a description for option 2",
		},
	];

	const tabItems = [
		{
			id: "tab1",
			label: "Account",
			content: <div class="p-4">Account settings content</div>,
		},
		{
			id: "tab2",
			label: "Notifications",
			content: <div class="p-4">Notification preferences content</div>,
		},
		{
			id: "tab3",
			label: "Security",
			content: <div class="p-4">Security settings content</div>,
		},
	];

	return (
		<div class="min-h-screen bg-background">
			<DemoNavigation />
			<div class="container mx-auto p-8 space-y-12">
				<div class="max-w-3xl mx-auto text-center space-y-4 mb-12">
					<h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
						Component Library
					</h1>
					<p class="text-muted-foreground">
						A comprehensive showcase of all available components with their
						variants and states.
					</p>
				</div>

				{/* Feedback Components */}
				<section class="space-y-4">
					<h2 class="text-2xl font-bold mb-4">Feedback Components</h2>

					<div class="grid gap-4">
						<Alert
							variant="default"
							title="Note"
							description="This is a default alert message."
						/>
						<Alert
							variant="destructive"
							title="Error"
							description="This is an error alert message."
						/>
						<Alert
							variant="warning"
							title="Warning"
							description="This is a warning alert message."
						/>
						<Alert
							variant="success"
							title="Success"
							description="This is a success alert message."
						/>
					</div>

					<div class="flex gap-2">
						<Badge>Default</Badge>
						<Badge variant="secondary">Secondary</Badge>
						<Badge variant="outline">Outline</Badge>
						<Badge variant="destructive">Destructive</Badge>
					</div>

					<div class="flex items-center gap-4">
						<Spinner size="sm" />
						<Spinner size="md" />
						<Spinner size="lg" />
					</div>

					<div class="flex gap-4">
						<Skeleton class="h-12 w-12" variant="circle" />
						<div class="space-y-2 flex-1">
							<Skeleton class="h-4" variant="text" />
							<Skeleton class="h-4" variant="text" />
						</div>
					</div>
				</section>

				{/* Form Components */}
				<section class="space-y-4">
					<h2 class="text-2xl font-bold mb-4">Form Components</h2>

					<div class="grid gap-4 max-w-md">
						<Select
							label="Select an option"
							options={selectOptions}
							placeholder="Select..."
						/>

						<Checkbox label="Remember me" />

						<Switch label="Notifications" />

						<TextArea label="Message" placeholder="Type your message here..." />

						<RadioGroup
							name="demo-radio"
							label="Choose an option"
							options={radioOptions}
						/>

						<FileUpload
							label="Upload file"
							accept="image/*"
							maxSize={5 * 1024 * 1024}
						/>

						<SearchInput
							label="Search"
							placeholder="Search..."
							isLoading={isLoading()}
						/>
					</div>
				</section>

				{/* Layout Components */}
				<section class="space-y-4">
					<h2 class="text-2xl font-bold mb-4">Layout Components</h2>

					<div class="grid gap-4">
						<button
							class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
							onClick={() => setIsModalOpen(true)}
						>
							Open Modal
						</button>

						<Modal
							isOpen={isModalOpen()}
							onClose={() => setIsModalOpen(false)}
							title="Example Modal"
							description="This is a description of the modal's purpose."
						>
							<div class="space-y-4">
								<p>Modal content goes here.</p>
								<div class="flex justify-end">
									<button
										class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
										onClick={() => setIsModalOpen(false)}
									>
										Close
									</button>
								</div>
							</div>
						</Modal>

						<Tabs tabs={tabItems} />
					</div>
				</section>

				{/* Interactive Components */}
				<section class="space-y-4">
					<h2 class="text-2xl font-bold mb-4">Interactive Components</h2>

					<div class="flex items-center gap-4">
						<Tooltip content="This is a tooltip">
							<button class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
								Hover me
							</button>
						</Tooltip>

						<Tooltip content="Right tooltip" position="right">
							<button class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
								Right tooltip
							</button>
						</Tooltip>
					</div>
				</section>

				{/* Component States */}
				<section class="space-y-4">
					<h2 class="text-2xl font-bold mb-4">Component States</h2>

					<div class="grid gap-4 max-w-md">
						<Select
							label="Error State"
							options={selectOptions}
							error="This field is required"
						/>

						<TextArea
							label="With Helper Text"
							helperText="Enter a detailed description"
						/>

						<SearchInput
							label="Loading State"
							isLoading={true}
							placeholder="Loading..."
						/>

						<FileUpload
							label="With Error"
							error="File size too large"
							accept="image/*"
						/>
					</div>
				</section>
			</div>
		</div>
	);
};
