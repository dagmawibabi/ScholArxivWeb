<script lang="ts">
	import { Search, Filter } from 'lucide-svelte';
	import { search_term_store, search_filter_store } from '../store/search_store';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let searchFunction: Function;

	let inputTerm: string;
	let search_filter: string;
	let search_filter_text: string = 'tile, authors, abstract ...';

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			searchFunction();
		}
	}

	search_filter_store.subscribe((value) => {
		search_filter = value;

		if (search_filter == 'All') {
			search_filter_text = 'tile, authors, abstract ...';
		} else {
			search_filter_text = search_filter.toLowerCase();
		}
	});
</script>

<div class="pt-5 pb-8 drop-shadow-sm hover:drop-shadow-md">
	<div class="group flex items-center border hover:border-zinc-400 rounded-2xl bg-white">
		<div class="flex w-full items-center px-3 py-2 gap-x-2">
			<Search size={18} class="text-zinc-400" />
			<input
				type="text"
				placeholder={search_filter_text}
				class="w-full bg-white outline-none"
				bind:value={inputTerm}
				on:input={() => search_term_store.set(inputTerm)}
				on:keydown={handleKeyDown}
			/>
		</div>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<div class="px-4 text-zinc-500 hover:text-black">
					<Filter size={15} />
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Item on:click={() => search_filter_store.set('All')}>All</DropdownMenu.Item>
					<DropdownMenu.Item on:click={() => search_filter_store.set('ID')}>ID</DropdownMenu.Item>
					<DropdownMenu.Item on:click={() => search_filter_store.set('Title')}
						>Title</DropdownMenu.Item
					>
					<DropdownMenu.Item on:click={() => search_filter_store.set('Authors')}
						>Authors</DropdownMenu.Item
					>
					<DropdownMenu.Item on:click={() => search_filter_store.set('Abstract')}
						>Abstract</DropdownMenu.Item
					>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="group/search">
			<div
				class="px-6 py-2 border-l rounded-tr-2xl rounded-br-2xl cursor-pointer group-hover:bg-zinc-700 group-hover/search:bg-black group-hover:text-white"
				on:click={() => searchFunction()}
			>
				<span> Search </span>
			</div>
		</div>
	</div>
</div>
