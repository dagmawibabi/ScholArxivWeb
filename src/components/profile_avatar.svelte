<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index';
	export let session;
	export let fullInfo = false;
</script>

<div>
	<div class="flex items-center gap-x-2 cursor-pointer">
		<Avatar.Root class="border border-zinc-300 drop-shadow-md hover:shadow-lg">
			<Avatar.Image src={session.data?.user.image} />
			<Avatar.Fallback>
				{session.data?.user.name[0]}
			</Avatar.Fallback>
		</Avatar.Root>
		{#if fullInfo == true}
			<div class="flex flex-col">
				<span class="font-semibold text-xs">
					{session.data?.user.name}
				</span>
				<span class="text-xs">
					{session.data?.user.email}
				</span>
			</div>
		{/if}
	</div>
</div>
