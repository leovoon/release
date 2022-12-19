<script lang="ts">
	import { fly } from 'svelte/transition'
	export let emojis: { happy: string[]; hate: string[] }
	export let happyEmoji: string
	export let hateEmoji: string
</script>

<div
	transition:fly|local={{ y: 30, duration: 300 }}
	class="flex text-2xl flex-col gap-4 mt-4 w-full items-center p-2"
>
	<div class="inline-flex gap-6">
		{#each emojis.happy as emoji}
			<label class="relative cursor-pointer">
				<input
					class="peer absolute inset-0 w-full"
					type="radio"
					bind:group={happyEmoji}
					value={emoji}
				/>
				<span
					class="transition-opacity opacity-20 duration-300 peer-checked:opacity-100"
					>{emoji}</span
				>
			</label>
		{/each}
	</div>

	<div class="inline-flex gap-6">
		{#each emojis.hate as emoji}
			<label class="relative cursor-pointer">
				<input
					class="peer absolute inset-0 w-full"
					type="radio"
					bind:group={hateEmoji}
					value={emoji}
				/>
				<span
					class="transition-opacity duration-300 opacity-20 peer-checked:opacity-100"
					>{emoji}</span
				>
			</label>
		{/each}
	</div>
</div>
