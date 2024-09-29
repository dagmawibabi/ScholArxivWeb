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
<div class="pb-2 group" on:click={() => dispatch('click')}>
	<div
		class={isSelected
			? 'flex border-2 border-black rounded-xl cursor-pointer transition-all duration-300 ease-in-out'
			: 'flex border-2 border-neutral-200 rounded-xl group-hover:border-black cursor-pointer transition-all duration-300 ease-in-out'}
	>
		<div class="flex p-1">
			<!-- ICON -->
			<div
				class={isSelected
					? 'flex items-center px-3 bg-black text-white rounded-lg transition-all duration-300 ease-in-out'
					: 'flex items-center px-3 rounded-lg group-hover:bg-black group-hover:text-white transition-all duration-300 ease-in-out'}
			>
				<svelte:component this={icon} class="w-4" />
			</div>

			<!-- LABEL AND SUBTITLE -->
			<div class="pl-2 flex flex-col">
				<span class="font-semibold text-sm">
					{label}
				</span>
				<span class="text-xs">
					{subTitle}
				</span>
			</div>
		</div>
	</div>
</div>
