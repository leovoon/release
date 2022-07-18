<script lang="ts">
	import { enhance } from '$lib/form';
	import { clean } from '$lib/profane';
	import { fade } from 'svelte/transition';
	import Editor from 'cl-editor/src/Editor.svelte';

	export let mood: string;
	let error: Error | null;
	let posting: boolean;
	let saved = false;
	let textPreview = '';
	let textSubmit = '';
	let actions = ['b', 'i', 'u', 'strike', 'forecolor', 'backcolor', 'a'];

	$: empty = !textPreview.length;
	$: textPreview = clean(textSubmit);
</script>

{#if !empty}
	<section>
		<p class="p-2 opacity-40 text-right w-full min-h-20">preview</p>
		<div in:fade class="preview" type="text">{@html textPreview}</div>
	</section>
{/if}
<form
	action={`/api/add/${mood}`}
	method="post"
	use:enhance={{
		result: ({ form }) => {
			posting = false;
			form.reset();
			textSubmit = '';
			saved = true;
			setTimeout(() => (saved = false), 2000);
		},
		pending: () => (posting = true),
		error: ({ error }) => (error = error)
	}}
	class="grid w-full"
>
	<div class="relative max-w-28">
		<div class="big-text">{mood === 'happy' ? '正能量' : '负能量'}</div>
		<input type="text" name="text" class="hidden" bind:value={textPreview} />
		<Editor
			{actions}
			on:change={({ detail }) => {
				textSubmit = detail.replace(/<br>$/, '');
			}}
		/>
	</div>
	<button type="submit" class="btn-light ml-auto hover:bg-gray-200 rounded-sm">
		🗑 Release</button
	>
</form>

{#if error}
	<p class="error">oops! {error.message}</p>
{:else if posting}
	<p>'📥 Saving...</p>
{/if}

<p>{saved ? '✅ Saved' : ''}</p>

<a href="/history" class="btn-gray">view saved</a>

<style>
	:global(.cl-content) {
		min-height: 300px;
		white-space: pre-wrap;
		background-color: rgba(121, 119, 119, 0.1) !important;
	}
</style>
