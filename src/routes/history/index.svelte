<script context="module" lang="ts">
	export const load: Load = async ({ session, url, fetch }) => {
		const { user } = session;

		if (!user) {
			return {
				status: 303,
				headers: {
					location: '/login'
				}
			};
		}

		const { textList } = await fetch(`/history.json`).then((r) => r.json());
		return {
			props: {
				textList
			}
		};
	};
</script>

<script lang="ts">
	import type { Release } from '@prisma/client';
	import { enhance } from '$lib/form';
	import { clean } from '$lib/profane';
	import { fly } from 'svelte/transition';
	import type { Load } from '@sveltejs/kit';
	export let textList: Release[] = [];
	export let nextList: Release[] = [];
	let defaultListCount = 3;
	let updatedList: Release[] = [];
	let textToGrab = 'all';
	let pending = false;
	let allLoaded = false;
	let error: Error | null;

	$: nextList.length > 0
		? (updatedList = [...textList, ...nextList])
		: (updatedList = textList);

	$: updatedlistLen = updatedList.length;
	$: countIsSame = updatedList.length === defaultListCount;
</script>

<section class="bg-cyan-50 p-2 grid gap-2 border border-dotted border-gray-300">
	<b class="my-2 h-10"
		>Total: {#key updatedList}<span
				class="h-max inline-flex"
				in:fly={{ y: -30, duration: 500, delay: 200 }}
			>
				{updatedlistLen}
			</span>{/key}</b
	>
	{#if updatedList.length > 0}
		<ol>
			{#each updatedList as { text, mood }, i}
				{#key text}
					<li
						in:fly={{ x: countIsSame ? 0 : -50, duration: 250, delay: i * 200 }}
						class:happy={mood === 'happy'}
						class:hate={mood === 'hate'}
					>
						{clean(text)}
						<sub class="uppercase">{mood === 'happy' ? '🥰' : '🔥'}</sub>
					</li>
				{/key}
			{/each}
		</ol>
		<form
			action={`/history.json?q=${textToGrab}`}
			method="post"
			use:enhance={{
				result: async ({ response: res }) => {
					let data = await res.json();
					nextList = data['nextList'];
					pending = false;
					allLoaded = true;
				},
				pending: () => {
					if (updatedlistLen > defaultListCount) {
						pending = false;
					} else {
						pending = true;
					}
				},
				error: ({ error }) => (error = error)
			}}
		>
			{#if !allLoaded}
				<button type="submit" class="btn-light mt-4 w-full text-center"
					>view all</button
				>
			{/if}
		</form>
	{:else}
		<p>Nothing found in the database</p>
	{/if}
</section>
{#if pending}
	<p class="mt-10 text-center">loading...</p>
{/if}

{#if error}
	<p>Something went wrong..</p>
{/if}

<a href="/" class="btn-gray "> ↩️ back </a>
