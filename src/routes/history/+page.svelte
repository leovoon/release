<script lang="ts">
	import type { Release } from '@prisma/client'
	import { clean } from '$lib/profane'
	import { fly } from 'svelte/transition'

	import EditIconButton from '$lib/icons/EditIconButton.svelte'
	import CloseButton from '$lib/icons/CloseButton.svelte'
	import DeleteButton from '$lib/icons/DeleteButton.svelte'
	import TimeAgo from '$lib/components/TimeAgo.svelte'
	import EmojiPicker from '$lib/components/EmojiPicker.svelte'
	import { happyEmoji, hateEmoji } from '$lib/stores/localStorage'
	import type { ActionData, PageServerData } from './$types'
	import { enhance, type SubmitFunction } from '$app/forms'
	import TextNoti from '$lib/components/TextNoti.svelte'
	import toast, { Toaster } from 'svelte-french-toast'

	export let data: PageServerData
	export let form: ActionData
	let defaultListCount = 3
	let toggleEdit = false
	let toggleDate = false
	let loadMorePending = false
	let noMoreMessages = false
	const emojis = {
		happy: ['😌', '😇', '🥰', '❤️', '💕'],
		hate: ['🔥', '🤬', '😕', '😭', '😥']
	}

	$: toggleEditFn = () => (toggleEdit = !toggleEdit)
	$: nextMessages = form?.messages as Release[]
	$: nextPage = form?.nextPage ? form?.nextPage : data.nextResultCursor

	$: updatedList = getMessages(nextMessages)
	$: updatedlistLen = updatedList?.length
	$: countIsSame = updatedList?.length === defaultListCount

	function handleClick() {
		toggleDate = !toggleDate
	}

	function getMessages(nextMessages?: Release[]): Release[] {
		if (nextMessages && nextMessages.length > 0) {
			updatedList = [...updatedList, ...nextMessages]
			return updatedList
		} else return data.messages
	}

	function handleBeforeDelete(e: SubmitEvent) {
		if (!window.confirm(`Are you sure to delete?`)) {
			e.preventDefault()
		}
	}

	const handleLoadMoreMessages: SubmitFunction = () => {
		loadMorePending = true
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					update()
					break
				case 'failure':
					toast.error('No more messages.')
					noMoreMessages = true
					break
				case 'error':
					update()
					break
				default:
			}

			loadMorePending = false
		}
	}

	const handleDelete: SubmitFunction = () => {
		toast.loading('Deleting...', { id: 'delete' })
		return async ({ result, update }) => {
			toast.dismiss('delete')
			switch (result.type) {
				case 'success':
					update()
					toast.success('Deleted!')
					break
				case 'failure':
					break
				case 'error':
					update()
					break
				default:
			}
		}
	}
</script>

<Toaster />
{#if toggleEdit}
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
					in:fly={{ y: countIsSame ? 0 : -30, duration: 500, delay: 200 }}
				>
					{updatedlistLen}
				</span>
			{/key}</b
		>

		{#if updatedlistLen > 0}
			{#if toggleEdit}
				<CloseButton on:click={toggleEditFn} />
			{:else}
				<EditIconButton on:click={toggleEditFn} />
			{/if}
		{/if}
	</div>
	{#if updatedList?.length > 0}
		<ol class="relative">
			{#each updatedList as { text, mood, createdAt, id }, i (i)}
				<li
					in:fly={{
						x: -30,
						duration: 600,
						delay: i * 0.4
					}}
					out:fly|local={{ x: 100 }}
					class:happy={mood === 'happy'}
					class:hate={mood === 'hate'}
					on:keydown={handleClick}
					on:click={handleClick}
				>
					<p>
						{@html clean(text)}
						<sub class="uppercase"
							>{mood === 'happy' ? $happyEmoji : $hateEmoji}</sub
						>
					</p>

					{#if toggleDate && createdAt}
						<div class="flex">
							<p
								in:fly|local={{ x: -30 }}
								out:fly|local={{ x: 30 }}
								class="text-xs flex-1 text-center px-2 text-gray-400"
							>
								<TimeAgo date={createdAt} />
							</p>
						</div>
					{/if}
					{#if toggleEdit}
						<form
							on:submit={handleBeforeDelete}
							use:enhance={handleDelete}
							action="?/deleteHistory&id={id}"
							method="POST"
						>
							<DeleteButton />
						</form>
					{/if}
				</li>
			{/each}
		</ol>

		{#if !noMoreMessages}
			<form method="POST" use:enhance={handleLoadMoreMessages}>
				<button
					on:submit
					formaction="?/getPreviousHistory&p={nextPage}"
					class="btn-light mt-4 p-6 w-full text-center">view more</button
				>
			</form>
		{/if}
	{:else}
		<p class="p-2">Nothing here.</p>
	{/if}
</section>

<button on:click={() => history.back()} class="btn-gray p-4 "> ↩️ back </button>
