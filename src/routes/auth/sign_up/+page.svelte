<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { writable } from 'svelte/store';
	import { handleSignUp } from '$lib/auth_functions';
	import BetterAuthRemark from '../../../components/better_auth_remark.svelte';

	// Create writable stores for form fields
	const firstName = writable('');
	const lastName = writable('');
	const email = writable('');
	const password = writable('');
</script>

<div class="h-screen flex flex-col justify-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Sign Up</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="grid gap-2">
						<Label for="first-name">First name</Label>
						<Input id="first-name" placeholder="Max" required bind:value={$firstName} />
					</div>
					<div class="grid gap-2">
						<Label for="last-name">Last name</Label>
						<Input id="last-name" placeholder="Robinson" required bind:value={$lastName} />
					</div>
				</div>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="max@example.com"
						required
						bind:value={$email}
					/>
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" bind:value={$password} />
				</div>
				<Button
					type="button"
					class="w-full"
					on:click={() =>
						handleSignUp($firstName.trim(), $lastName.trim(), $email.trim(), $password.trim())}
					>Create an account</Button
				>

				<!-- Social Signup -->
				<!-- <div class="gap-2 flex flex-col">
					<Button
						variant="outline"
						class="w-full"
						on:click={async () => {
							await signIn.social({
								provider: 'google',
								callbackURL: '/homepage'
							});
						}}>Continue with Google</Button
					>
					<Button
						variant="secondary"
						class="w-full"
						on:click={async () => {
							await signIn.social({
								provider: 'github',
								callbackURL: '/homepage'
							});
						}}>Continue with Github</Button
					>
				</div> -->
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/auth/sign_in" class="underline"> Sign in </a>
			</div>
		</Card.Content>
	</Card.Root>
	<BetterAuthRemark />
</div>
