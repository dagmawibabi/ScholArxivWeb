<script lang="ts">
	import Navigation from '../../components/navigation.svelte';
	import Search from '../../components/search.svelte';
	import { onMount } from 'svelte';
	import { bookmark_list_store } from '../../store/bookmark_list_store';
	import EachPaper from '../../components/each_paper.svelte';
	import { useSession } from '$lib/auth_client';
	import bookmark_functions from '../../utils/bookmark_papers';

	let session = useSession();

	let bookmarkedPapers: any[] = [];
	bookmark_functions.getBookmarks($session.data?.user.id);

	// State Management
	bookmark_list_store.subscribe((value: any[]) => {
		bookmarkedPapers = value;
		console.log(bookmarkedPapers);
	});
</script>

<div class="h-screen overflow-scroll">
	<div class="relative h-full w-full">
		<div
			class="pt-6 m-auto h-screen
		w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5
		px-3 md:px-0 lg:px-0 xl:px-0 2xl:px-0
		"
		>
			<Navigation />
			<div class="pt-10">
				<div class="flex flex-col gap-y-5">
					{#if bookmarkedPapers.length <= 0}
						<!-- Empty state, if no papers are found after loading -->
						<div>No papers found.</div>
					{:else}
						<!-- Once loading is false, display actual papers -->
						<div class="flex flex-col gap-y-5">
							{#each bookmarkedPapers as eachPaper}
								<!-- isSelected={selectedPapers[0] === extractID(eachPaper)} -->
								<!-- isSelected={selectedPapers.includes(extractID(eachPaper))} -->
								<EachPaper paper={eachPaper} />
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Search -->
	<Search />
</div>
