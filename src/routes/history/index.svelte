<script context="module" lang="ts">
	export const load: Load = async ({ session, fetch }) => {
		const { user } = session;
		if (!user) {
			return {
				status: 302,
				redirect: '/login'
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
	import { clean } from '$lib/profane';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import EditIconButton from '$lib/icons/EditIconButton.svelte';
	import CloseButton from '$lib/icons/CloseButton.svelte';
	import DeleteButton from '$lib/icons/DeleteButton.svelte';
	import TimeAgo from '$lib/components/TimeAgo.svelte';
	import type { Load } from '@sveltejs/kit';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import { happyEmoji, hateEmoji } from '$lib/stores/localStorage';
	import TextNoti from '$lib/components/TextNoti.svelte';

	export let textList: Release[] = [];
	let defaultListCount = 3;
	let updatedList: Release[] = [];
	let allparam = 'all';
	let pending = false;
	let deleting = false;
	let allLoaded = false;
	let error: Error | null;
	let toggleEdit = false;
	let toggleDate = false;

	const emojis = {
		happy: ['😌', '😇', '🥰', '❤️', '💕'],
		hate: ['🔥', '🤬', '😕', '😭', '😥']
	};

	$: toggleEditFn = () => (toggleEdit = !toggleEdit);

	$: updatedList = textList;

	$: updatedlistLen = updatedList.length;
	$: countIsSame = updatedList.length === defaultListCount;

	async function handleDelete(id: number, text: string) {
		const confirmed = confirmDelete(text);
		if (!confirmed) return;
		deleting = true;
		const response = await fetch('/history.json?_method=DELETE', {
			method: 'POST',
			body: JSON.stringify({
				id
			})
		});

		const { deletedText } = await response.json();

		if (deletedText) {
			deleting = false;
			updatedList = updatedList.filter((text) => text.id !== deletedText.id);
		}
		deleting = false;
	}

	async function handleViewAll() {
		const response = await fetch(`/history.json?q=${allparam}`);
		pending = true;
		let { textList, error: Error } = await response.json();

		if (!textList) {
			error = Error;
			return;
		}
		pending = false;
		allLoaded = true;
		updatedList = textList;
	}
	function confirmDelete(text: string): boolean {
		return window.confirm(`Are you sure to delete < ${text} >?`);
	}
</script>

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
		{#if deleting}
			<TextNoti text="Deleting..." />
		{/if}

		{#if pending}
			<TextNoti text="Loading..." />
		{/if}

		{#if error}
			<TextNoti text="Something went wrong. {error.message}" />
		{/if}

		{#if updatedlistLen > 0}
			{#if toggleEdit}
				<CloseButton on:click={toggleEditFn} />
			{:else}
				<EditIconButton on:click={toggleEditFn} />
			{/if}
		{/if}
	</div>
	{#if updatedList.length > 0}
		<ol>
			{#each updatedList as { text, mood, createdAt, id }, i (id)}
				<li
					in:fly={{
						x: -50,
						duration: 250,
						delay: i * 200
					}}
					animate:flip
					out:fly|local={{ x: 100 }}
					class:happy={mood === 'happy'}
					class:hate={mood === 'hate'}
					on:click={() => (toggleDate = !toggleDate)}
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
								in:fly={{ x: -30 }}
								out:fly|local={{ x: 30 }}
								class="text-xs flex-1 text-center px-2 text-gray-400"
							>
								<TimeAgo date={createdAt} />
							</p>
						</div>
					{/if}
					{#if toggleEdit}
						<DeleteButton on:click={() => handleDelete(id, text)} />
					{/if}
				</li>
			{/each}
		</ol>

		{#if !allLoaded}
			<button
				on:click={() => handleViewAll()}
				class="btn-light mt-4 w-full text-center">view previous</button
			>
		{:else}
			<p class="text-center mt-4 text-gray-300">-- end of lines --</p>
		{/if}
	{:else}
		<p class="p-2">Nothing here.</p>
	{/if}
</section>

<a href="/" class="btn-gray "> ↩️ back </a>
