<script lang="ts">
	import '../app.css'
	import { navigating, page } from '$app/stores'
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'
	import { handleSession } from '@lucia-auth/sveltekit/client'

	$: isNotHomeRoute = $page.url.pathname !== '/'
	handleSession(page)
</script>

<svelte:head>
	<title>Release | Spit your thoughts out</title>
</svelte:head>

{#if $navigating}
	<LoadingSpinner />
{/if}

<main>
	<nav>
		<ul>
			{#if isNotHomeRoute}
				<a href="/" class="btn-blue px-4 py-2">Home</a>
			{/if}
		</ul>
	</nav>

	<slot />
</main>

<footer>
	<p>
		<a href="/privacy">Privacy Policy</a>
		<!-- |
		<a href="/data-deletion">Delete Your Data</a> -->
	</p>
	<p>
		by <a href="https://github.com/leovoon/release">leovoon</a>
	</p>
</footer>
