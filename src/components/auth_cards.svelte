<script lang="ts">
	export let label;
	export let subTitle;
	export let icon;
	export let isSelected;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="p-2 group" on:click={() => dispatch('click')}>
	<div
		class={isSelected
			? 'flex border border-black rounded-xl cursor-pointer'
			: 'flex border border-neutral-400 rounded-xl group-hover:border-black cursor-pointer'}
	>
		<div class="flex p-3">
			<!-- ICON -->
			<div
				class={isSelected
					? 'border border-black bg-black text-white flex items-center px-4 rounded-lg '
					: 'border border-neutral-400 flex items-center px-4 rounded-lg group-hover:border-black group-hover:bg-black group-hover:text-white'}
			>
				<svelte:component this={icon} class="h-7 w-6 " />
			</div>

			<!-- LABEL AND SUBTITLE -->
			<div class="pl-4 flex flex-col">
				<span class="font-bold text-lg">
					{label}
				</span>
				<span>
					{subTitle}
				</span>
			</div>
		</div>
	</div>
</div>
