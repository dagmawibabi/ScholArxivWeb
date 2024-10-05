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
	import { useSession, signOut, authClient } from '$lib/auth_client';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ProfileAvatar from '../../components/profile_avatar.svelte';
	import { baseURL, aiBaseURL } from '$lib/constants.js';
	import { handleLogout } from '$lib/auth_functions';
	import { Separator } from '$lib/components/ui/separator';
	import { writable } from 'svelte/store';
	import { chat_history_store } from '../../store/chat_history_store';

	let chat_history: any[] = [];
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

	// Select First Few Papers
	function selectFirstPaper() {
		selectPaper(papers[0]);
	}

	// Select Papers
	let selectedPapers: any[] = [];
	let selectedPapersObj: any[] = [];
	let selectedPapersForAI = writable('');
	function selectPaper(eachPaper: any) {
		const extractedId = extractID(eachPaper);
		if (selectedPapers.includes(extractedId)) {
			// Unselect
			selectedPapers = selectedPapers.filter((id) => id !== extractedId); // Remove the ID
			selectedPapersObj = selectedPapersObj.filter((paper) => paper.id !== paper.extractedId);
			// selectedPapersForAI.update((papers) => papers.filter((paper:any) => paper.id !== eachPaper.id));
			// selectedPapersForAI.set(); // Remove the paper object
		} else {
			// Select
			selectedPapers = [...selectedPapers, extractedId]; // Add the ID
			selectedPapersObj = [...selectedPapersObj, eachPaper];
			// selectedPapersForAI.update((papers) => [...papers, eachPaper]); // Add the paper object
		}
		let context = '';
		for (var paperx of selectedPapersObj) {
			context += JSON.stringify(paperx, null, 2);
		}
		selectedPapersForAI.set(context);
	}

	function selectAllPapers() {
		selectedPapers = [];
		selectedPapersObj = [];
		for (var eachPaper of papers) {
			selectPaper(eachPaper);
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
	chat_history_store.subscribe((value) => {
		chat_history = value;
	});

	// Chat with AI
	async function chatWithAI() {
		let newUserChat = {
			from: 'user',
			content: searchTerm
		};
		let newLoading = {
			from: 'system',
			content: 'loading'
		};
		chat_history_store.update((currentHistory) => [...currentHistory, newUserChat, newLoading]);

		let response = await axios.post(aiBaseURL + '/ask', {
			prompt: searchTerm + $selectedPapersForAI
		});
		let newAIChat = {
			from: 'ai',
			content: response.data
		};
		chat_history_store.update((currentHistory) => {
			currentHistory.pop(); // Remove the last element
			return [...currentHistory, newAIChat]; // Add newAIChat
		});
	}

	const session = useSession();
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
			<div class="flex justify-between">
				<!-- Title -->
				<Title />

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

			<!-- Recommended Papers -->
			<div class="pt-10">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="flex justify-between items-center px-4 pb-3">
					<span class="font-semibold text-lg">
						{result_title}
					</span>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="rounded-full" on:click={() => selectAllPapers()}>
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
							<!-- isSelected={selectedPapers[0] === extractID(eachPaper)} -->
							<EachPaper
								paper={eachPaper}
								isSelected={selectedPapers.includes(extractID(eachPaper))}
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
			<div class="pt-56 pb-96">
				<Footer />
			</div>
		</div>
	</div>

	<!-- Search -->
	<Search searchFunction={chatWithAI} />
	<!-- <Search searchFunction={searchPaper} /> -->
</div>
