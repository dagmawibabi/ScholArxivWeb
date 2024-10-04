<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { writable } from 'svelte/store';

	const email = writable('');
	const password = writable('');

	const handleSignIn = async () => {
		await signIn.email(
			{
				email: $email,
				password: $password,
				callbackURL: '/homepage'
			},
			{
				onError(context) {
					alert(context.error.message);
				}
			}
		);
	};
</script>

<div class="min-h-screen flex items-center justify-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required bind:value={$email} />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="/auth/forget-password" class="ml-auto inline-block text-sm underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required bind:value={$password} />
				</div>
				<Button type="button" class="w-full" on:click={handleSignIn}>Login</Button>

				<div class="gap-2 flex flex-col">
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
				</div>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/auth/sign-up" class="underline">Sign up</a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
