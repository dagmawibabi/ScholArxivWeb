<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { writable } from 'svelte/store';
	import BetterAuthRemark from '../../../components/better_auth_remark.svelte';
	import { handleForgetPassword } from '$lib/auth_functions';

	// Create writable stores for form fields
	const email = writable('');
</script>

<div class="h-screen flex flex-col justify-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Reset Password</Card.Title>
			<Card.Description>Enter your email below to reset your password</Card.Description>
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
				<Button
					type="button"
					class="w-full"
					on:click={async () => {
						if (!$email) {
							alert('Please enter your email address');
							return;
						}
						await handleForgetPassword($email.trim());
					}}
				>
					Reset Password
				</Button>
			</div>
			<div class="pt-3 text-center text-sm">
				<a href="/auth/sign_in" class="hover:underline underline-offset-4"> Back to Sign In </a>
			</div>
		</Card.Content>
	</Card.Root>
	<BetterAuthRemark />
</div>
