<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ status, error }) => {
		return {
			props: {
				status,
				message: error?.message
			}
		};
	};
</script>

<script lang="ts">
	export let status: number;
	export let message: string;
</script>

<section class=" m-auto">
	<h1>Error</h1>
	<p>{message}</p>
	<div
		class="absolute grid place-content-center inset-0 -z-1 opacity-10 text-9xl"
	>
		{status}
	</div>
</section>
