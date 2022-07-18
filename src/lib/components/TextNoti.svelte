<script lang="ts">
	import { fly } from 'svelte/transition';
	export let text: string;
</script>

<p transition:fly|local={{ y: 30 }} class="opacity-40 flex-1 m-10 text-center">
	{text}
</p>
