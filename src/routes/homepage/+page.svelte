<script lang="ts">
	import axios from 'axios';
	import EachPaper from '../../components/each_paper.svelte';
	import Title from '../../components/title.svelte';
	import SkeletonPaperWithSummary from '../../components/skeleton_paper_with_summary.svelte';
	import SkeletonPaper from '../../components/skeleton_paper.svelte';
	import Footer from '../../components/footer.svelte';
	import Search from '../../components/search.svelte';
	import { search_term_store, search_filter_store } from '../../store/search_store';
	import { paper_list_store } from '../../store/paper_list_store';
	import { onMount } from 'svelte';
	import { useSession } from '$lib/auth-client';
	import * as Avatar from '$lib/components/ui/avatar/index';

	let baseURL = 'https://scholarxivapi.onrender.com/arxiv';
	let papers: any[] = [];
	let defaultStartIndex = 0;
	let defaultMaxResults = 100;
	let searchTerm: string = '';
	let result_title: string = 'Discover Papers ...';
	let search_filter = '';
	let loading = true;
	export let data;
	onMount(() => {
		loading = false;
		papers = data.recommendedPapers;
		paper_list_store.set(data.recommendedPapers);
		selectFirstPaper();
	});

	// // Fetch recommended papers from the API
	// async function fetchRecommendedPapers() {
	// 	try {
	// 		const response = await axios.get(baseURL + '/recommended');
	// 		paper_list_store.set(response.data);
	// 	} catch (error) {
	// 		console.error('Error fetching recommended papers:', error);
	// 	}
	// 	// Select First Paper
	// 	selectFirstPaper();
	// }

	// Select First Few Papers
	function selectFirstPaper() {
		selectPaper(papers[0]);
	}

	// Select Papers
	let selectedPapers: any[] = [];
	function selectPaper(eachPaper: any) {
		const extractedId = extractID(eachPaper);
		if (selectedPapers.includes(extractedId)) {
			// Unselect
			selectedPapers = [];
		} else {
			// Select
			selectedPapers = [extractedId];
		}
	}

	// Extract Paper ID
	function extractID(eachPaper: any) {
		const paperId = eachPaper['id'];
		const extractedId = paperId.split('/').pop();
		return extractedId;
	}

	// Search for Papers
	async function searchPaper() {
		if (searchTerm.trim().length > 0) {
			loading = true;
			paper_list_store.set([]);
			result_title = 'Searching ...';

			try {
				const response = await axios.get(
					baseURL +
						`/search?searchTerm=${searchTerm.trim()}&startIndex=${defaultStartIndex}&maxResults=${defaultMaxResults}`
				);
				paper_list_store.set(response.data);
				result_title = 'Results ...';
			} catch (error) {
				console.error('Error fetching searched papers:', error);
			}
		}
		loading = false;
		// Select First Paper
		selectFirstPaper();
	}

	// State Management
	search_term_store.subscribe((value) => {
		searchTerm = value;
	});
	paper_list_store.subscribe((value: any[]) => {
		papers = value;
	});
	search_filter_store.subscribe((value) => {
		search_filter = value;
	});

	const session = useSession();
</script>

<div>
	<div class="relative h-full w-full">
		<div
			class="pt-6 m-auto h-screen
		w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5
		px-3 md:px-0 lg:px-0 xl:px-0 2xl:px-0
		"
		>
			<!-- Title -->
			<Title />

			<div class="mt-2">
				{#if $session.data}
					<div class="flex items-center gap-2">
						<Avatar.Root>
							<Avatar.Image src={$session.data?.user.image} />
							<Avatar.Fallback>
								{$session.data?.user.name[0]}
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="">
							<h3 class="text-sm">
								{$session.data?.user.name}
							</h3>
							<p class="text-xs text-muted-foreground">
								{$session.data?.user.email}
							</p>
						</div>
					</div>
				{/if}
			</div>

			<!-- Search -->
			<Search searchFunction={searchPaper} />

			<!-- Recommended Papers -->
			<div class="">
				<div class="flex justify-between items-center px-4 pb-3">
					<span class="font-semibold text-lg">
						{result_title}
					</span>
					<div class="rounded-full">
						<span class="text-xs">{papers.length} {papers.length == 1 ? 'Paper' : 'Papers'} </span>
					</div>
				</div>
				{#if loading}
					<!-- Display Skeletons if loading -->
					<div class="flex flex-col gap-y-5">
						<SkeletonPaperWithSummary />
						<SkeletonPaper />
						<SkeletonPaper />
						<SkeletonPaper />
						<SkeletonPaper />
					</div>
				{:else if papers.length <= 0 && loading == false}
					<!-- Empty state, if no papers are found after loading -->
					<div>No papers found.</div>
				{:else}
					<!-- Once loading is false, display actual papers -->
					<div class="flex flex-col gap-y-5">
						{#each papers as eachPaper}
							<EachPaper
								paper={eachPaper}
								isSelected={selectedPapers[0] === extractID(eachPaper)}
								on:click={() => selectPaper(eachPaper)}
							/>
						{/each}
					</div>
				{/if}
			</div>
			<div class="h-16"></div>

			<div class="text-center text-xs">
				<span> Showing {papers.length} Papers.</span>
			</div>

			<!-- Footer -->
			<Footer />
		</div>
	</div>
</div>
