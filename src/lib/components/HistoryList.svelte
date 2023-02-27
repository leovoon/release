<script lang="ts">
	import type { Release } from '@prisma/client'
	import HistoryListItem from '$lib/components/HistoryListItem.svelte'
	import { flip } from 'svelte/animate'

	export let list: Release[]
	export let editMode: boolean
	export let showingDate: boolean
</script>

<ol class="relative">
	{#each list as item (item.id)}
		<div class="contents" animate:flip>
			<HistoryListItem {editMode} {showingDate} {item} on:toggleDate />
		</div>
	{/each}
</ol>
