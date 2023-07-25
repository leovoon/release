<script lang="ts">
	import { page } from '$app/stores'
</script>

<section class=" m-auto">
	<h1>Error</h1>
	<p>{$page.error?.message}</p>
	<div
		class="absolute grid place-content-center inset-0 -z-10 opacity-10 text-9xl"
	>
		{$page.status}
	</div>
</section>
