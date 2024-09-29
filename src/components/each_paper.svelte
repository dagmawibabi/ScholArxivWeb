<script lang="ts">
	import moment from 'moment';
	import {
		CalendarDays,
		CircleDot,
		User,
		Bookmark,
		Download,
		Link2,
		Sparkles,
		Scroll
	} from 'lucide-svelte';

	export let paper;
	export let selectPaperFunction;
	export let selectedPapers;

	// Readable Time
	const timestamp = paper['published'];
	const readableTime = moment(timestamp).format('MMM Do YYYY');

	// Paper ID
	const paperId = paper['id'];
	const extractedId = paperId.split('/').pop();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="group pb-6" on:click={() => selectPaperFunction(extractedId)}>
	<div
		class={selectedPapers.includes(extractedId) == true
			? 'relative flex flex-col bg-white borderborder-blacktext-black rounded-xl drop-shadow-xl py-3 px-4 cursor-pointer text-sm duration-200'
			: 'relative flex flex-col bg-white border border-zinc-300 group-hover:border-black text-zinc-600 group-hover:text-black rounded-xl drop-shadow-xl py-3 px-4 cursor-pointer text-sm duration-200'}
	>
		<!-- Published Date and Title -->
		<div class="absolute group-hover:flex gap-x-3 left-4 -my-7 text-xs hidden">
			<!-- Published Date -->
			<div
				class="flex items-center bg-white border border-zinc-300 group-hover:border-black rounded-xl px-2 py-1 duration-200"
			>
				<CalendarDays size={12} />
				<span class="pl-1">
					{readableTime}
				</span>
			</div>
			<!-- ID -->
			<div
				class="flex items-center bg-white border border-zinc-300 group-hover:border-black rounded-xl px-2 py-1 duration-200"
			>
				<CircleDot size={12} />
				<span class="pl-1">
					{extractedId}
				</span>
			</div>
		</div>

		<!-- <span>{selectedPapers}</span> -->

		<!-- Title -->
		<span class="font-semibold text-zinc-500 group-hover:text-black pb-2">
			{paper['title']}
		</span>

		<!-- Authors -->
		<div class="flex gap-x-1 items-center overflow-scroll pb-3">
			<User size={12} />
			{#each paper['authors'] as eachAuthor}
				<div class="w-fit text-xs italic linc">
					<span>
						{eachAuthor},
					</span>
				</div>
			{/each}
		</div>

		<!-- Interactions -->
		<div class="pt-1 flex gap-x-2 text-xs group-hover:text-zinc-600">
			<div
				class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-300 hover:text-black"
			>
				<Sparkles size={15} />
				<span> Ask AI </span>
			</div>
			<div
				class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-300 hover:text-black"
			>
				<Scroll size={15} />
				<span> Summary </span>
			</div>
			<div
				class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-300 hover:text-black"
			>
				<Download size={15} />
				<span> Download </span>
			</div>
			<div
				class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-300 hover:text-black"
			>
				<Bookmark size={15} />
				<span> Bookmark </span>
			</div>
			<div
				class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-300 hover:text-black"
			>
				<Link2 size={15} />
				<span> Copy </span>
			</div>
		</div>
	</div>
</div>
