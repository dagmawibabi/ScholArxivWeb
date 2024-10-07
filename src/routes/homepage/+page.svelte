<script lang="ts">
	import EachPaper from '../../components/each_paper.svelte';
	import SkeletonPaperWithSummary from '../../components/skeleton_paper_with_summary.svelte';
	import SkeletonPaper from '../../components/skeleton_paper.svelte';
	import Footer from '../../components/footer.svelte';
	import Search from '../../components/search.svelte';
	import { paper_list_store } from '../../store/paper_list_store';
	import { result_title_store } from '../../store/result_title_store';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Navigation from '../../components/navigation.svelte';
	import selectPaperFunctions from '../../utils/select_paper';
	import discoverPapers from '../../utils/discover_papers';
	import { discovery_loading_store } from '../../store/loading_store';

	let papers: any[] = [];
	let result_title: string = '';

	discoverPapers();

	// export let data;
	// onMount(() => {
	// 	loading = false;
	// 	// papers = data.recommendedPapers;
	// 	paper_list_store.set(data.recommendedPapers);
	// 	selectPaperFunctions.selectFirstPaper();
	// });

	// State Management
	paper_list_store.subscribe((value: any[]) => {
		papers = value;
	});
	result_title_store.subscribe((value) => {
		result_title = value;
	});

	// const session = useSession();
</script>

<div class="h-screen overflow-scroll">
	<div class="relative h-full w-full">
		<div
			class="pt-6 m-auto h-screen
		w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5
		px-3 md:px-0 lg:px-0 xl:px-0 2xl:px-0
		"
		>
			<!-- Title and Profile -->
			<Navigation />

			<!-- Recommended Papers -->
			<div class="pt-10">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="flex justify-between items-center px-4 pb-3">
					<span class="font-semibold text-lg">
						{#if result_title == 'Searching ...'}
							<div class="animate-pulse">
								{result_title}
							</div>
						{:else}
							{result_title}
						{/if}
					</span>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="rounded-full" on:click={() => selectPaperFunctions.selectAllPapers()}>
						<span class="text-xs">{papers.length} {papers.length == 1 ? 'Paper' : 'Papers'} </span>
					</div>
				</div>
				{#if $discovery_loading_store}
					<!-- Display Skeletons if loading -->
					<div class="flex flex-col gap-y-5">
						<SkeletonPaperWithSummary />
						<SkeletonPaper />
						<SkeletonPaper />
						<SkeletonPaper />
						<SkeletonPaper />
					</div>
				{:else if papers.length <= 0 && $discovery_loading_store == false}
					<!-- Empty state, if no papers are found after loading -->
					<div>No papers found.</div>
				{:else}
					<!-- Once loading is false, display actual papers -->
					<div class="flex flex-col gap-y-5">
						{#each papers as eachPaper}
							<!-- isSelected={selectedPapers[0] === extractID(eachPaper)} -->
							<!-- isSelected={selectedPapers.includes(extractID(eachPaper))} -->
							<EachPaper paper={eachPaper} />
						{/each}
					</div>
				{/if}
			</div>
			<div class="h-16"></div>

			<div class="text-center text-xs">
				<span> Showing {papers.length} Papers.</span>
			</div>

			<!-- Footer -->
			<div class="pt-56 pb-96">
				<Footer />
			</div>
		</div>
	</div>

	<!-- Search -->
	<Search />
</div>
