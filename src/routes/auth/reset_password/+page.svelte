<script>
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { writable } from 'svelte/store';
	import { handleResetPassword } from '$lib/auth_functions';
	import BetterAuthRemark from '../../../components/better_auth_remark.svelte';

	// Create writable stores for form fields
	const confirmPassword = writable('');
	const password = writable('');
</script>

<div class="h-screen w-1/4 flex flex-col justify-center mx-auto">
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl">Reset Password</Card.Title>
			<Card.Description>Enter your new password below</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="password">New Password</Label>
					<Input
						id="password"
						type="password"
						required
						bind:value={$password}
						placeholder="New Password"
					/>
				</div>
				<div class="grid gap-2">
					<Label for="password">Confirm Password</Label>
					<Input
						id="password"
						type="password"
						required
						placeholder="Confirm Password"
						bind:value={$confirmPassword}
					/>
				</div>
				<Button
					type="button"
					class="w-full"
					on:click={() => {
						handleResetPassword($password.trim());
					}}>Reset</Button
				>
				<a href="/" class="text-sm text-center">Cancel</a>
			</div>
		</Card.Content>
	</Card.Root>
	<BetterAuthRemark />
</div>
