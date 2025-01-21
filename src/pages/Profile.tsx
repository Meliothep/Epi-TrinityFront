import { Component } from "solid-js";
import { Card } from "../components/common/Card";
import { Input } from "../components/forms/Input";
import { Button } from "../components/ui/Button";

const Profile: Component = () => {
	return (
		<div class="container mx-auto px-4 py-8">
			<div class="max-w-2xl mx-auto space-y-8">
				<div>
					<h1 class="text-3xl font-bold">Profile</h1>
					<p class="text-muted-foreground mt-2">Manage your account settings</p>
				</div>

				<Card padding="lg">
					<form class="space-y-6">
						<div class="space-y-4">
							<h2 class="text-xl font-semibold">Personal Information</h2>
							<Input
								label="Name"
								placeholder="Enter your name"
								value=""
								onChange={() => {}}
							/>
							<Input
								label="Email"
								type="email"
								placeholder="Enter your email"
								value=""
								onChange={() => {}}
							/>
						</div>

						<div class="space-y-4">
							<h2 class="text-xl font-semibold">Change Password</h2>
							<Input
								label="Current Password"
								type="password"
								placeholder="Enter current password"
								value=""
								onChange={() => {}}
							/>
							<Input
								label="New Password"
								type="password"
								placeholder="Enter new password"
								value=""
								onChange={() => {}}
							/>
							<Input
								label="Confirm New Password"
								type="password"
								placeholder="Confirm new password"
								value=""
								onChange={() => {}}
							/>
						</div>

						<div class="flex justify-end">
							<Button type="submit">Save Changes</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default Profile;
