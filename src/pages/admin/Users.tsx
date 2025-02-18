import { Component, createSignal, createEffect, Show, For } from "solid-js";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/forms/Input";
import { Spinner } from "../../components/ui/Spinner";
import { adminStore, useAdminStore } from "../../stores/admin.store";
import { authStore } from "../../stores/auth.store";
import type { User, UserRole } from "../../types/auth.types";
import {
	FiEdit2,
	FiTrash2,
	FiUserPlus,
	FiAlertCircle,
	FiCheck,
	FiX,
} from "solid-icons/fi";
import { cn } from "../../lib/utils";

const Users: Component = () => {
	const { setupUsersEffect } = useAdminStore();
	const [users, setUsers] = createSignal<User[]>([]);
	const [isLoading, setIsLoading] = createSignal(true);
	const [error, setError] = createSignal<string | null>(null);
	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedRole, setSelectedRole] = createSignal<
		"all" | "user" | "admin" | "super_admin"
	>("all");
	const [editingUser, setEditingUser] = createSignal<User | null>(null);

	// Set up the users effect to handle pagination, filtering, and sorting
	setupUsersEffect();

	// Filter users based on search and role
	const filteredUsers = () => {
		let filtered = adminStore.users.items;

		// Filter by search query
		if (searchQuery()) {
			const query = searchQuery().toLowerCase();
			filtered = filtered.filter(
				(user) =>
					user.name.toLowerCase().includes(query) ||
					user.email.toLowerCase().includes(query)
			);
		}

		// Filter by role
		if (selectedRole() !== "all") {
			filtered = filtered.filter((user) => user.role === selectedRole());
		}

		return filtered;
	};

	const handleEditUser = (user: User) => {
		if (!adminStore.hasPermission("users", "edit")) return;
		setEditingUser(user);
	};

	const handleDeleteUser = async (userId: string) => {
		if (!adminStore.hasPermission("users", "delete")) return;

		if (!confirm("Are you sure you want to delete this user?")) return;

		try {
			// In a real app, this would be an API call
			await adminService.deleteUser(userId);
			adminStore.loadUsers(); // Reload the users list
		} catch (err) {
			console.error("Error deleting user:", err);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div class="space-y-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold">Users</h1>
					<p class="text-muted-foreground">Manage system users</p>
				</div>

				<Show when={adminStore.hasPermission("users", "create")}>
					<Button>
						<FiUserPlus class="mr-2 h-4 w-4" />
						Add User
					</Button>
				</Show>
			</div>

			{/* Filters */}
			<Card class="p-4">
				<div class="grid gap-4 md:grid-cols-2">
					<Input
						placeholder="Search users..."
						value={searchQuery()}
						onInput={(e) => setSearchQuery(e.currentTarget.value)}
					/>
					<select
						value={selectedRole()}
						onChange={(e) =>
							setSelectedRole(
								e.currentTarget.value as
									| "all"
									| "user"
									| "admin"
									| "super_admin"
							)
						}
						class="px-3 py-1.5 rounded-md border bg-background"
						aria-label="Filter users by role"
					>
						<option value="all">All Roles</option>
						<option value="user">User</option>
						<option value="admin">Admin</option>
						<option value="super_admin">Super Admin</option>
					</select>
				</div>
			</Card>

			{/* Loading State */}
			<Show when={adminStore.users.loading}>
				<div class="flex justify-center py-12">
					<Spinner size="lg" />
				</div>
			</Show>

			{/* Error State */}
			<Show when={adminStore.users.error}>
				<Card class="p-6">
					<div class="flex flex-col items-center text-center space-y-4">
						<div class="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
							<FiAlertCircle class="h-6 w-6 text-destructive" />
						</div>
						<div>
							<p class="text-destructive font-medium">
								{adminStore.users.error}
							</p>
							<Button
								variant="outline"
								class="mt-4"
								onClick={() => adminStore.loadUsers()}
							>
								Try Again
							</Button>
						</div>
					</div>
				</Card>
			</Show>

			{/* Users List */}
			<div class="space-y-4">
				<Show
					when={filteredUsers().length > 0}
					fallback={
						<Card class="p-8 text-center text-muted-foreground">
							No users found
						</Card>
					}
				>
					<div class="grid gap-4">
						<For each={filteredUsers()}>
							{(user) => (
								<Card class="p-4">
									<div class="flex items-center justify-between gap-4">
										<div class="flex items-center gap-4">
											<div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
												<Show
													when={user.avatar}
													fallback={
														<span class="text-lg font-semibold text-primary">
															{user.name[0].toUpperCase()}
														</span>
													}
												>
													<img
														src={user.avatar}
														alt={user.name}
														class="h-full w-full rounded-full object-cover"
													/>
												</Show>
											</div>
											<div>
												<p class="font-medium">{user.name}</p>
												<p class="text-sm text-muted-foreground">
													{user.email}
												</p>
											</div>
										</div>

										<div class="text-right">
											<p
												class={cn(
													"text-sm font-medium",
													user.isActive ? "text-green-500" : "text-destructive"
												)}
											>
												{user.isActive ? "Active" : "Inactive"}
											</p>
											<p class="text-sm text-muted-foreground">
												{user.role.charAt(0).toUpperCase() +
													user.role.slice(1).replace("_", " ")}
											</p>
										</div>

										<div class="flex items-center gap-2">
											<Show when={adminStore.hasPermission("users", "edit")}>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleEditUser(user)}
												>
													<FiEdit2 class="h-4 w-4" />
												</Button>
											</Show>
											<Show when={adminStore.hasPermission("users", "delete")}>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleDeleteUser(user.id)}
													class="text-destructive hover:text-destructive/90"
												>
													<FiTrash2 class="h-4 w-4" />
												</Button>
											</Show>
										</div>
									</div>

									<div class="mt-4 pt-4 border-t text-sm text-muted-foreground">
										<p>Created: {formatDate(user.createdAt)}</p>
										<Show when={user.lastLoginAt}>
											<p>Last Login: {formatDate(user.lastLoginAt!)}</p>
										</Show>
									</div>
								</Card>
							)}
						</For>
					</div>
				</Show>
			</div>
		</div>
	);
};

export default Users;
