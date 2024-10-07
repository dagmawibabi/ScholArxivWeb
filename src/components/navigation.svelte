<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ProfileAvatar from './profile_avatar.svelte';
	import Title from './title.svelte';
	import { useSession } from '$lib/auth_client';

	import { Bookmark, Compass } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { handleLogout } from '$lib/auth_functions';

	let session = useSession();
</script>

<div class="flex justify-between">
	<!-- Title -->
	<Title />

	<div class="flex items-center justify-center gap-x-5">
		<!-- Discover -->
		<div class="pt-3">
			<a href="/homepage">
				<Compass size={18} />
			</a>
		</div>

		<!-- Bookmarks -->
		<div class="pt-3">
			<a href="/bookmark_page">
				<Bookmark size={16} />
			</a>
		</div>

		<!-- Profile -->
		<div class="pt-2 pr-2">
			{#if $session.data}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<ProfileAvatar session={$session} />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<!-- Profile -->
							<DropdownMenu.Item
								><ProfileAvatar session={$session} fullInfo={true} /></DropdownMenu.Item
							>

							<div class="py-1">
								<Separator />
							</div>
							<!-- Logout -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<DropdownMenu.Item
								><div
									class="w-full text-center hover:text-red-500 cursor-pointer"
									on:click={() => handleLogout($session.data?.session.id)}
								>
									Logout
								</div></DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	</div>
</div>
