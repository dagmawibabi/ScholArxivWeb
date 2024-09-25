<script lang="ts">
	export let paper;
</script>

<div class="p-2">
	<div
		class="flex flex-col bg-stone-100 border border-white hover:border-black rounded-xl py-4 px-6 cursor-pointer"
	>
		<span>
			ID: {paper['id']}
		</span>

		<span class="font-bold pb-2">
			{paper['title']}
		</span>

		<span>
			Published: {paper['published']}
		</span>

		<span>
			authors: {paper['authors']}
		</span>
	</div>
</div>
