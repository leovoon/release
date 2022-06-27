<script lang="ts">
	import { enhance } from '$lib/form';
	import { onMount } from 'svelte';
	import { clean } from '$lib/profane';
	export let mood: string;
	let error: Error | null;
	let posting: Boolean;
	let saved: string = '';
	let textPreview: string = '';
	let textSubmit: string = '';

	$: empty = !textPreview.length;
	$: textPreview = clean(textSubmit);

	onMount(() => (saved = ''));
</script>

<div class="big-text">{mood === 'hate' ? '正能量' : '负能量'}</div>

{#if !empty}
	<input
		class="preview"
		type="text"
		class:bg-red-300={mood === 'hate'}
		bind:value={textPreview}
	/>
{/if}
<form
	action="/api/add"
	method="post"
	use:enhance={{
		result: ({ form }) => {
			(posting = false),
				form.reset(),
				(saved = 'saved'),
				setTimeout(() => (saved = ''), 2000);
		},
		pending: () => (posting = true),
		error: ({ error }) => (error = error)
	}}
	class="grid"
>
	<input type="hidden" name="mood" value={mood} required />
	<textarea
		cols={30}
		rows={6}
		name="text"
		placeholder="Speak your brains"
		required
		bind:value={textSubmit}
	/>
	<button type="submit" class="btn-light place-self-end">Release</button>
</form>

{#if error}
	<p class="error">oops! {error.message}</p>
{:else if posting}
	<p>saving release...</p>
{/if}

{saved}
