<script lang="ts">
	import { clean } from '$lib/profane'
	import { page } from '$app/stores'
	import type { ActionData, PageServerData } from './$types'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { enhance } from '$app/forms'
	import TextNoti from '$lib/components/TextNoti.svelte'
	import toast, { Toaster } from 'svelte-french-toast'
	import { SvelteComponent, getContext, type ComponentType } from 'svelte'
	import { browser } from '$app/environment'

	export let data: PageServerData
	export let form: ActionData

	let posting: boolean
	let saved = false
	let value = ''
	let conf = {
		placeholder: 'What is on your mind?',
		menu: {
			custom: { title: 'Happy', items: 'code' }
		},
		menubar: false,
		toolbar: 'undo redo  | bold italic |' + 'forecolor backcolor',
		branding: false,
		elementpath: false
	}

	$: sanitizedValue = clean(value)
	$: happy = $page.params.m === 'happy'

	let Editor: ComponentType<SvelteComponent> = getContext('TinyEditor')

	if (browser) {
		if (!Editor) {
			import('@tinymce/tinymce-svelte').then((module) => {
				Editor = module.default
			})
		}
	}

	const handleAddMessage: SubmitFunction = ({ data, cancel }) => {
		const { moodText } = Object.fromEntries(data)
		if (moodText.toString().length < 1) {
			toast.error('The text field is required')
			cancel()
			return
		}

		toast.loading('Saving...', { id: 'savingMessage' })
		return async ({ result, update }) => {
			toast.dismiss('savingMessage')
			switch (result.type) {
				case 'success':
					toast.success('Saved!')
					saved = true
					break
				case 'failure':
					toast.error('Bad request')
					break
				case 'error':
					toast.error('Something went wrong')
					break
			}
			await update({ reset: false })
		}
	}
</script>

<Toaster />
<h1 class="text-4xl">{happy ? '开心' : '不开心'}</h1>
<form
	action="?/addMessage"
	use:enhance={handleAddMessage}
	method="POST"
	class="grid w-full"
>
	<div class="min-h-[400px] relative max-w-28">
		<textarea hidden aria-hidden name="moodText" value={sanitizedValue} />

		{#if Editor}
			<svelte:component this={Editor} bind:value apiKey={data.apiKey} {conf} />
		{:else}
			<TextNoti
				extraClass="absolute inset-0 m-auto text-xl"
				text="Loading..."
			/>
		{/if}
	</div>
	<button
		type="submit"
		class="btn-light ml-auto p-2 hover:bg-gray-200 rounded-sm"
	>
		🗑 Release</button
	>
</form>

{#if form?.missing}<p class="error">The text field is required</p>{/if}

{#if posting}<p>📥 Saving...</p>{/if}

<a href="/history" class="btn-gray p-4 text-xl">view saved</a>

<style>
	h1 {
		height: auto;
	}
</style>
