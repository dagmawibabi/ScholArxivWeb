<script lang="ts">
	import axios from 'axios';
	import EachPaper from '../../components/each_paper.svelte';
	import Title from '../../components/title.svelte';
	import SkeletonPaperWithSummary from '../../components/skeleton_paper_with_summary.svelte';
	import SkeletonPaper from '../../components/skeleton_paper.svelte';
	import Footer from '../../components/footer.svelte';
	import ArxivRemark from '../../components/arxiv_remark.svelte';

	let papers: any[] = [];

	// Fetch recommended papers from the API
	async function fetchRecommendedPapers() {
		try {
			const response = await axios.get('http://localhost:5400/arxiv/recommended');
			papers = response.data;
		} catch (error) {
			console.error('Error fetching recommended papers:', error);
		}
		// papers = papers.slice(0, 3);
		// Select First Paper
		selectFirstPaper();
	}

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

	fetchRecommendedPapers();
</script>

<div>
	<div class="relative h-full w-full">
		<div class="w-2/5 pt-6 m-auto h-screen">
			<!-- Title -->
			<Title />

			<!-- List of Papers -->
			<div class="">
				{#if papers.length <= 0}
					<div class="flex flex-col gap-y-5">
						<SkeletonPaperWithSummary />
						<SkeletonPaper />
						<SkeletonPaper />
						<SkeletonPaper />
						<SkeletonPaper />
					</div>
				{:else}
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
