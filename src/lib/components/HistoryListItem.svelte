<script lang="ts">
	import { fly } from 'svelte/transition'
	import { clean } from '$lib/profane'
	import { happyEmoji, hateEmoji } from '$lib/stores/localStorage'
	import type { Release } from '@prisma/client'
	import TimeAgo from './TimeAgo.svelte'
	import DeleteButton from '$lib/icons/DeleteButton.svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { createEventDispatcher } from 'svelte'
	import toast, { Toaster } from 'svelte-french-toast'
	import { invalidate } from '$app/navigation'

	export let item: Release
	export let showingDate: boolean
	export let editMode: boolean

	$: ({ createdAt, id, mood, text } = item)
	$: cleanedText = clean(text)

	const dispatch = createEventDispatcher()
	const toggleDate = () => dispatch('toggleDate')

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

<li
	in:fly={{ y: 100 }}
	out:fly|local={{ x: 100 }}
	class:happy={mood === 'happy'}
	class:hate={mood === 'hate'}
	on:keydown
	on:click={toggleDate}
>
	{@html cleanedText}

	<p>
		<sub class="uppercase sm:text-3xl text-2xl"
			>{mood === 'happy' ? $happyEmoji : $hateEmoji}</sub
		>
	</p>

	{#if showingDate && createdAt}
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
	{#if editMode}
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
