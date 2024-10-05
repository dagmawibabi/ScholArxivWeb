<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { writable } from 'svelte/store';
	import { handleSignIn } from '$lib/auth_functions';
	import BetterAuthRemark from '../../../components/better_auth_remark.svelte';

	// Create writable stores for form fields
	const email = writable('');
	const password = writable('');
</script>

<div class="h-screen flex flex-col justify-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
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
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="/auth/forget_password" class="ml-auto inline-block text-sm hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required bind:value={$password} />
				</div>
				<Button
					type="button"
					class="w-full"
					on:click={() => handleSignIn($email.trim(), $password.trim())}>Login</Button
				>

				<!-- Social Sign In -->
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
								provider: 'google',
								callbackURL: '/homepage'
							});
						}}>Continue with Github</Button
					>
				</div> -->
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/auth/sign_up" class="underline">Sign up</a>
			</div>
		</Card.Content>
	</Card.Root>
	<BetterAuthRemark />
</div>
