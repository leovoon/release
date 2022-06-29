<script>
	import '../app.css';
	import { session, page } from '$app/stores';
	import { signOut as authSignOut } from 'sk-auth/client';

	let notice = '';

	function signOut() {
		authSignOut()
			.then(session.set)
			.then(() => handleIsLoggedOut());
	}

	function handleIsLoggedOut() {
		notice = 'You logged out.';
		setTimeout(() => (notice = ''), 1000);
	}
</script>

<svelte:head>
	<title>Release | Spit your thoughts out</title>
</svelte:head>

<main>
	{notice}
	{#if $session?.user}
		<a href="/">You logged in. </a>
		<button on:click={signOut} class="btn-login mb-12">Sign out</button>
	{:else if $page.url.pathname !== '/login'}
		<a href="/login" class="btn-login mb-14">Login</a>
	{/if}
	<slot />
</main>

<footer>
	made with <span class="animate-pulse"> ❤️ </span> by
	<a href="https://github.com/leovoon/release">leovoon</a>
</footer>
