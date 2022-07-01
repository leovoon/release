<script lang="ts">
	import { enhance } from '$lib/form';
	import { clean } from '$lib/profane';
	import { fade } from 'svelte/transition';
	export let mood: string;
	let error: Error | null;
	let posting: Boolean;
	let saved: string = '';
	let textPreview: string = '';
	let textSubmit: string = '';

	$: empty = !textPreview.length;
	$: textPreview = clean(textSubmit);
</script>

<div class="big-text">{mood === 'happy' ? '正能量' : '负能量'}</div>

{#if !empty}
	<section>
		<p class="p-2 opacity-40 text-right w-full min-h-20">preview</p>
		<textarea in:fade class="preview" type="text" bind:value={textPreview} />
	</section>
{/if}
<form
	action={`/api/add/${mood}`}
	method="post"
	use:enhance={{
		result: ({ form }) => {
			(posting = false),
				form.reset(),
				(saved = 'Saved'),
				setTimeout(() => (saved = ''), 2000);
		},
		pending: () => (posting = true),
		error: ({ error }) => (error = error)
	}}
	class="grid"
>
	<textarea
		cols={30}
		rows={8}
		name="text"
		placeholder="Speak your brains"
		required
		bind:value={textSubmit}
	/>
	<button type="submit" class="btn-light ml-auto"> 📥 Release</button>
</form>

{#if error}
	<p class="error">oops! {error.message}</p>
{:else if posting}
	<p>Saving...</p>
{/if}

{saved}

<a href="/history" class="btn-gray">view saved</a>
