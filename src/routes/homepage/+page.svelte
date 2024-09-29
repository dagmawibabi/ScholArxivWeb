<script lang="ts">
	import axios from 'axios';
	import EachPaper from '../../components/each_paper.svelte';
	import Title from '../../components/title.svelte';

	let papers: any[] = [];

	// Fetch recommended papers from the API
	async function fetchRecommendedPapers() {
		try {
			const response = await axios.get('http://localhost:5400/arxiv/recommended');
			papers = response.data;
		} catch (error) {
			console.error('Error fetching recommended papers:', error);
		}
	}

	// Select Papers
	let selectedPapers: any[] = [];
	function selectPaper(id: string) {
		if (selectedPapers.includes(id)) {
			// Unselect
			selectedPapers = selectedPapers.filter((paperId) => paperId !== id);
		} else {
			// Select
			selectedPapers.push(id);
		}
		console.log(id);
	}

	fetchRecommendedPapers();
</script>

<div>
	<div class="relative h-full w-full">
		<!-- Background -->
		<!-- <div
			class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
		></div> -->

		<div class="w-2/5 m-auto h-screen">
			<Title />

			<!-- List of Papers -->
			<div class="pt-5">
				{#each papers as eachPaper}
					<EachPaper paper={eachPaper} selectPaperFunction={selectPaper} {selectedPapers} />
				{/each}
			</div>
			<div class="h-96"></div>
		</div>
	</div>
</div>
