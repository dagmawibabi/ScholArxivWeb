<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { search_term_store } from '../store/search_store';
	export let searchFunction: Function;

	let inputTerm: string;

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			searchFunction();
		}
	}
</script>

<div class="pt-5 pb-8 drop-shadow-sm hover:drop-shadow-md">
	<div class="flex items-center border rounded-2xl bg-white">
		<div class="flex w-full items-center px-3 py-2 gap-x-2">
			<Search size={18} class="text-zinc-400" />
			<input
				type="text"
				placeholder="title, author, abstract ..."
				class="w-full bg-white outline-none"
				bind:value={inputTerm}
				on:input={() => search_term_store.set(inputTerm)}
				on:keydown={handleKeyDown}
			/>
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="px-6 py-2 border-l rounded-tr-2xl rounded-br-2xl cursor-pointer hover:bg-black hover:text-white"
			on:click={() => searchFunction()}
		>
			<span> Search </span>
		</div>
	</div>
</div>
