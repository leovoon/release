<script lang="ts">
	import { fly } from 'svelte/transition'
	import EditIconButton from '$lib/icons/EditIconButton.svelte'
	import CloseButton from '$lib/icons/CloseButton.svelte'
	import EmojiPicker from '$lib/components/EmojiPicker.svelte'
	import { happyEmoji, hateEmoji } from '$lib/stores/localStorage'
	import type { PageServerData } from './$types'
	import TextNoti from '$lib/components/TextNoti.svelte'
	import { Toaster } from 'svelte-french-toast'
	import HistoryList from '$lib/components/HistoryList.svelte'

	export let data: PageServerData
	let editMode = false
	let showingDate = false
	let defaultListLen = 5
	let listLen = defaultListLen
	const emojis = {
		happy: ['😌', '😇', '🥰', '❤️', '💕'],
		hate: ['🔥', '🤬', '😕', '😭', '😥']
	}

	$: updatedList = data.messages
	$: data.streamed.moreMessages.then((moreMessages) => {
		listLen =
			updatedList.length + (moreMessages ? moreMessages.length : defaultListLen)
	})
	$: toggleEditFn = () => (editMode = !editMode)

	function handleToggleDate() {
		showingDate = !showingDate
	}
</script>

<Toaster />
{#if editMode}
	<EmojiPicker
		{emojis}
		bind:happyEmoji={$happyEmoji}
		bind:hateEmoji={$hateEmoji}
	/>
{/if}

<section
	class="bg-cyan-50 p-2 mt-4 grid gap-2 border border-dotted border-gray-300"
>
	<div class="flex p-2 items-center my-2">
		<b class=" inline-flex items-center"
			>Count: {#key updatedList}
				<span
					class="h-max inline-flex ml-1"
					in:fly={{ y: -30, duration: 500, delay: 200 }}
				>
					{listLen}
				</span>
			{/key}</b
		>
	</div>
	{#if updatedList}
		{#if editMode}
			<CloseButton on:click={toggleEditFn} />
		{:else}
			<EditIconButton on:click={toggleEditFn} />
		{/if}
		<HistoryList
			{editMode}
			{showingDate}
			list={updatedList}
			on:toggleDate={handleToggleDate}
		/>

		{#await data.streamed.moreMessages}
			<TextNoti text="Loading more thoughts.." extraClass="animate-bounce" />
		{:then moreMessages}
			{#if moreMessages.length > 0}
				<HistoryList
					{editMode}
					{showingDate}
					list={moreMessages}
					on:toggleDate={handleToggleDate}
				/>
			{/if}
		{/await}

		<!-- {#if !noMoreMessages}
			<form method="POST" use:enhance={handleLoadMoreMessages}>
				<button
					on:submit
					formaction="?/getPreviousHistory&p={nextPage}"
					class="btn-light mt-4 p-6 w-full text-center">view more</button
				>
			</form>
		{/if} -->

		<!-- {#await data.streamed.moreMessages }
		
	{:then } 
		
	{/await} -->
	{:else}
		<p class="p-2">Nothing here.</p>
	{/if}
</section>

<button on:click={() => history.back()} class="btn-gray p-4 "> ↩️ back </button>
