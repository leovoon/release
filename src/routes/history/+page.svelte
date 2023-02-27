<script lang="ts">
	import type { Release } from '@prisma/client'
	import { clean } from '$lib/profane'
	import { fly } from 'svelte/transition'
	import { flip } from 'svelte/animate'

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
	import { invalidate, invalidateAll } from '$app/navigation'

	export let data: PageServerData
	export let form: ActionData
	let defaultListCount = 3
	let toggleEdit = false
	let toggleDate = false
	const emojis = {
		happy: ['😌', '😇', '🥰', '❤️', '💕'],
		hate: ['🔥', '🤬', '😕', '😭', '😥']
	}

	$: updatedList = data.messages
	$: toggleEditFn = () => (toggleEdit = !toggleEdit)
	$: updatedlistLen = updatedList?.length
	$: countIsSame = updatedList?.length === defaultListCount

	function handleClick() {
		toggleDate = !toggleDate
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

	const handleDelete: SubmitFunction = ({ cancel }) => {
		if (window.confirm(`Are you sure to delete?`)) {
			toast.loading('Deleting...', { id: 'delete' })
		} else {
			cancel()
		}
		return async ({ result, update }) => {
			toast.dismiss('delete')
			switch (result.type) {
				case 'success':
					update({ reset: false })
					toast.success('Deleted!')
					invalidate((url) => url.pathname === '/history')
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
	</div>
	{#if updatedList}
		{#if toggleEdit}
			<CloseButton on:click={toggleEditFn} />
		{:else}
			<EditIconButton on:click={toggleEditFn} />
		{/if}
		<ol class="relative">
			{#each updatedList as { text, mood, createdAt, id } (id)}
				<li
					animate:flip={{}}
					in:fly={{ y: 100 }}
					out:fly|local={{ x: 100 }}
					class:happy={mood === 'happy'}
					class:hate={mood === 'hate'}
					on:keydown={handleClick}
					on:click={handleClick}
				>
					{@html clean(text)}

					<p>
						<sub class="uppercase sm:text-3xl text-2xl"
							>{mood === 'happy' ? $happyEmoji : $hateEmoji}</sub
						>
					</p>

					{#if toggleDate && createdAt}
						<div class="flex min-w-fit">
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
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<form
							on:click|stopPropagation
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

		<!-- {#if !noMoreMessages}
			<form method="POST" use:enhance={handleLoadMoreMessages}>
				<button
					on:submit
					formaction="?/getPreviousHistory&p={nextPage}"
					class="btn-light mt-4 p-6 w-full text-center">view more</button
				>
			</form>
		{/if} -->
	{:else}
		<p class="p-2">Nothing here.</p>
	{/if}
</section>

<button on:click={() => history.back()} class="btn-gray p-4 "> ↩️ back </button>
