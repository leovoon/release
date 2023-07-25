<script lang="ts">
	import { fly } from 'svelte/transition'
	export let text: string
	export let extraClass = ''
</script>

<p
	transition:fly={{ y: 30 }}
	class="opacity-40 flex-1 m-10 text-center {extraClass}"
>
	{text}
</p>
