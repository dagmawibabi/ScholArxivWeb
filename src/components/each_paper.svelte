<script lang="ts">
	import axios from 'axios';
	import moment from 'moment';
	import {
		Frame,
		CalendarDays,
		ExternalLink,
		User,
		Bookmark,
		Download,
		Link2,
		Sparkles,
		Scroll,
		Heart,
		MessageCircle
	} from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Toaster } from '$lib/components/ui/sonner';

	export let paper;
	export let isSelected;

	// Readable Time
	const timestamp = paper['published'];
	const readableTime = moment(timestamp).format('MMM Do YYYY');

	// Paper ID
	const paperId = paper['id'];
	const extractedId = paperId.split('/').pop();

	// Click Event
	import { createEventDispatcher } from 'svelte';
	import { toast } from 'svelte-sonner';
	const dispatch = createEventDispatcher();

	// Function to handle download
	async function handleDownload(paper: any) {
		console.log('downloading...');
		const response = await axios({
			url: paper['pdfLink'],
			method: 'GET',
			responseType: 'blob'
		});

		console.log(response.data);
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', paper['id'].split('/').pop() + '.pdf');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// Function to copy to clipboard
	function copyToClipboard(type: string, paper: any) {
		let whatToCopy: string;

		const copyMap: any = {
			All: () =>
				`ID: ${paper['id']}\nPublished Date: ${readableTime}\n\nTitle: ${paper['title']}\n\nAuthors: ${paper['authors'].join(', ')}\n\nSummary: ${paper['summary']}\n\nPDF Link: ${paper['pdfLink']}`,
			ID: () => paper['id'],
			Title: () => paper['title'],
			Authors: () => paper['authors'].join(', '),
			'PDF Link': () => paper['pdfLink'],
			Summary: () => {
				const sentences = paper['summary'].split('. ');
				return sentences.slice(0, 1).join('. ') + (sentences.length > 2 ? '...' : '');
			},
			'Published Date': () => readableTime
		};

		whatToCopy = copyMap[type] ? copyMap[type]() : '';

		// Copy to Clipboard
		navigator.clipboard.writeText(type === 'Summary' ? paper['summary'] : whatToCopy);

		// Show Toast
		toast.success(`Copied ${type} Successfully!`, {
			description: whatToCopy
		});
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="group" on:click={() => dispatch('click')}>
	<div
		class={isSelected == true
			? 'relative flex flex-col bg-white border border-black text-black rounded-xl drop-shadow-xl py-3 cursor-pointer transition-all duration-300 ease-in-out'
			: 'relative flex flex-col bg-white border border-zinc-300 group-hover:border-black text-zinc-600 group-hover:text-black rounded-xl drop-shadow-xl py-3 cursor-pointer transition-all duration-300 ease-in-out'}
	>
		<div class="px-4">
			<!-- Date and ID -->
			<div class="flex gap-x-4 pb-1">
				<div class="flex items-center text-xs">
					<CalendarDays size={12} />
					<span class="pl-1">
						{readableTime}
					</span>
				</div>

				<div class="flex items-center text-xs">
					<Frame size={12} />
					<span class="pl-1 pb-[1px]">
						{extractedId}
					</span>
				</div>
			</div>

			<!-- Title -->
			<a
				href={paper['pdfLink']}
				target="_blank"
				rel="noopener noreferrer"
				download
				class={isSelected == true
					? 'group/title font-semibold text-black transition-all duration-300 ease-in-out'
					: 'group/title font-semibold text-zinc-500 group-hover:text-black transition-all duration-300 ease-in-out '}
			>
				<span class="hover:underline underline-offset-4 decoration-zinc-400 decoration-1">
					{paper['title']}
				</span>
				<div class="hidden group-hover/title:inline-block">
					<ExternalLink size={12} />
				</div>
			</a>

			<!-- Authors -->
			<div class="flex gap-x-1 items-center overflow-scroll pt-1 pb-2">
				<User size={12} />
				{#each paper['authors'] as eachAuthor}
					<div class="w-fit text-xs italic linc pb-[1px]">
						<span>
							{eachAuthor},
						</span>
					</div>
				{/each}
			</div>

			<!-- Interactions -->
			<div class="pt-1 flex gap-x-2 text-xs">
				<div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-800 hover:text-black transition-all duration-200 ease-in-out"
				>
					<Sparkles size={15} />
					<span> Ask AI </span>
				</div>

				<div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-800 hover:text-black transition-all duration-200 ease-in-out"
				>
					<Heart size={15} />
					<span> Like </span>
				</div>

				<div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-800 hover:text-black transition-all duration-200 ease-in-out"
				>
					<MessageCircle size={15} />
					<span> Comment </span>
				</div>

				<div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-800 hover:text-black transition-all duration-200 ease-in-out"
					on:click={() => handleDownload(paper)}
				>
					<Download size={15} />
					<span> Download </span>
				</div>

				<div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-800 hover:text-black transition-all duration-200 ease-in-out"
				>
					<Bookmark size={15} />
					<span> Bookmark </span>
				</div>

				<!-- <div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-800 hover:text-black transition-all duration-200 ease-in-out"
					on:click={() => navigator.clipboard.writeText(paper['pdfLink'])}
				>
					<Link2 size={15} />
					<span> Copy </span>
				</div> -->

				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div
							class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:border-zinc-800 hover:text-black transition-all duration-200 ease-in-out"
						>
							<Link2 size={15} />
							<span> Copy </span>
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item on:click={() => copyToClipboard('All', paper)}
								>All</DropdownMenu.Item
							>
							<DropdownMenu.Item on:click={() => copyToClipboard('ID', paper)}>ID</DropdownMenu.Item
							>
							<DropdownMenu.Item on:click={() => copyToClipboard('Title', paper)}
								>Title</DropdownMenu.Item
							>
							<DropdownMenu.Item on:click={() => copyToClipboard('Authors', paper)}
								>Authors</DropdownMenu.Item
							>
							<DropdownMenu.Item on:click={() => copyToClipboard('PDF Link', paper)}
								>PDF Link</DropdownMenu.Item
							>
							<DropdownMenu.Item on:click={() => copyToClipboard('Summary', paper)}
								>Summary</DropdownMenu.Item
							>
							<DropdownMenu.Item on:click={() => copyToClipboard('Published Date', paper)}
								>Published Date</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<!-- Summary -->
		<div class="px-3">
			<div
				class={isSelected == true
					? 'pt-3 text-sm transition-all duration-300 ease-in-out'
					: 'hidden'}
			>
				<div
					class="border border-zinc-300 rounded-lg rounded-bl-md rounded-br-md pt-2 pb-3 px-3 drop-shadow-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
				>
					<div class="flex items-center gap-x-1 text-xs text-zinc-600 pb-1">
						<Scroll size={12} />
						<span class="pb-[2.5px]"> Summary </span>
					</div>
					<span class="text-zinc-800">
						{paper['summary']},
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
