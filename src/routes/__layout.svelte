<script lang="ts">
	import '../app.css';
	import { session, page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOut as authSignOut } from 'sk-auth/client';
	import { fly } from 'svelte/transition';

	let notice = '';
	$: user = $session?.user;
	$: isGoogle = user?.provider === 'google';
	$: isFacebook = user?.provider === 'facebook';

	function signOut() {
		authSignOut()
			.then(session.set)
			.then(() => handleIsLoggedOut())
			.then(() => goto('/'));
	}

	function handleIsLoggedOut() {
		notice = 'Logging out...';
		setTimeout(() => (notice = ''), 1000);
	}
</script>

<svelte:head>
	<title>Release | Spit your thoughts out</title>
</svelte:head>

<main>
	{#if notice.length}
		<h3 in:fly={{ x: -30, duration: 500 }}>
			{notice}
		</h3>
	{/if}
	<nav>
		<ul>
			{#if user}
				<img
					referrerpolicy={isGoogle ? 'no-referrer' : null}
					class="w-8 h-8 rounded"
					src={isGoogle
						? user.picture
						: isFacebook
						? user.picture.data.url
						: null}
					alt={`profile image of ${user.name}`}
				/>
				<h3>{user.name}</h3>
				<button on:click={signOut} class="btn-login ml-auto">Sign Out ↪️</button
				>
			{:else if $page.url.pathname !== '/login'}
				<a href="/login" class="btn-login flex-1 ">Login 🚪</a>
			{/if}
			{#if $page.url.pathname !== '/'}
				<a href="/" class="btn-blue ml-auto text-right"> 🏡 Home </a>
			{/if}
		</ul>
	</nav>
	<slot />
</main>

<footer>
	<p>
		<a href="/privacy">Privacy Policy</a> |
		<a href="/data-deletion">Delete Your Data</a>
	</p>
	<p>
		made with <span class="animate-pulse"> ❤️ </span> by
		<a href="https://github.com/leovoon/release">leovoon</a>
	</p>
</footer>
