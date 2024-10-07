<script lang="ts">
	import { Search, Filter } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Sparkles } from 'lucide-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import chatWithAI from '../utils/chat_with_ai';
	import searchPaper from '../utils/search_paper';
	import { search_term_store, search_filter_store } from '../store/search_store';
	import { chat_history_store } from '../store/chat_history_store';

	let inputTerm: string;
	let search_filter: string;
	let search_filter_text: string = 'title, authors, abstract ...';

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			chatWithAI();
		}
	}

	search_filter_store.subscribe((value) => {
		search_filter = value;

		if (search_filter == 'All') {
			search_filter_text = 'title, authors, abstract ...';
		} else {
			search_filter_text = search_filter.toLowerCase();
		}
	});
</script>

<div class="w-full absolute bottom-0 z-50 pt-2">
	<div
		class="group w-2/5 mx-auto backdrop-blur-sm hover:bg-white/50 hover:backdrop-blur-xl border-t border-dashed pt-3 border-transparent hover:border-zinc-400 rounded-tl-2xl rounded-tr-2xl"
	>
		<div
			class="h-2 group-hover:h-[550px] opacity-0 group-hover:opacity-100 overflow-scroll duration-300"
		>
			{#each $chat_history_store as chat}
				<div class={chat['from'] == 'user' ? 'flex justify-end pr-8' : 'flex justify-start pl-4'}>
					<div
						class={chat['from'] == 'user'
							? 'flex justify-end items-end gap-x-2 w-3/5 pb-2'
							: 'flex justify-start items-end gap-x-2 w-3/5 pb-2'}
					>
						<div
							class={$chat_history_store[$chat_history_store.length - 1]['content'] ==
								chat['content'] ||
							$chat_history_store[$chat_history_store.length - 2]['content'] == chat['content']
								? 'w-fit relative flex border border-zinc-400 text-black group/text bg-white rounded-xl px-3 py-2 text-sm'
								: 'w-fit relative flex border hover:border-zinc-400 text-zinc-500 hover:text-black group/text bg-white rounded-xl px-3 py-2 text-sm'}
						>
							<!-- {#if chat['from'] == 'ai'}
								<div class="absolute -m-7 bg-white border p-2 rounded-full">
									<Sparkles
										size={14}
										class={$chat_history_store[$chat_history_store.length - 1]['content'] ==
											chat['content'] ||
										$chat_history_store[$chat_history_store.length - 2]['content'] ==
											chat['content']
											? 'text-black'
											: 'text-zinc-500 group-hover/text:text-black'}
									/>
								</div>
							{/if} -->
							<span class="group-hover/text:text-black">
								{#if chat['from'] == 'system'}
									<div class="animate-pulse">{chat['content']}</div>
								{:else}
									<SvelteMarkdown source={chat['content']} />
								{/if}
							</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="pt-3 pb-5">
			<div class="group flex items-center border border-zinc-400 rounded-2xl bg-white">
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

				<!-- Filter Icon -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div class="px-4 text-zinc-500 hover:text-black">
							<Filter size={15} />
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item on:click={() => search_filter_store.set('All')}
								>All</DropdownMenu.Item
							>
							<DropdownMenu.Item on:click={() => search_filter_store.set('ID')}
								>ID</DropdownMenu.Item
							>
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
				<div
					class="group/search group-hover:bg-zinc-700 rounded-tr-2xl rounded-br-2xl overflow-clip"
				>
					<div
						class="px-6 py-2 border-l cursor-pointer group-hover/search:bg-black group-hover:text-white"
						on:click={() => searchPaper()}
					>
						<span> Search </span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
