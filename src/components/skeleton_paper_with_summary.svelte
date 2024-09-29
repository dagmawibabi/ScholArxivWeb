<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<div class=" border-zinc-200 p-3 rounded-xl bg-white drop-shadow-md">
	<div class="flex gap-x-2">
		<Skeleton class="h-4 w-20 rounded-xl border border-zinc-200" />
		<Skeleton class="h-4 w-20 rounded-xl border border-zinc-200" />
	</div>
	<div class="py-2">
		<Skeleton class="h-6 w-full rounded-md border border-zinc-200" />
	</div>
	<div class="pb-2">
		<Skeleton class="h-4 w-80 rounded-xl border border-zinc-200" />
	</div>

	<div class="flex py-2 gap-x-2">
		<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
		<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
		<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
		<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
		<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
		<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
	</div>

	<div class="pt-2">
		<Skeleton class="h-44 w-full rounded-lg rounded-bl-sm rounded-br-sm border border-zinc-200" />
	</div>
</div>
