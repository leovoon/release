<script lang="ts">
	import '../app.css';
	import { session, page, navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOut as authSignOut } from 'sk-auth/client';
	import { fade } from 'svelte/transition';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { pathnameBeforeLogin } from '$lib/stores/routeStore';

	$: beforeNavigate(({ to }) => {
		if (to && to?.pathname !== '/' && to.pathname !== '/login' && !user) {
			$pathnameBeforeLogin = to.href;
			return;
		}
	});

	$: user = $session?.user;
	$: isGoogle = user?.provider === 'google';
	$: isFacebook = user?.provider === 'facebook';
	$: isGithub = user?.provider === 'github';
	// $: isTwitter = user?.provider === 'twitter';
	$: errorParam = $page.url.searchParams.get('error');

	function signOut() {
		authSignOut()
			.then(session.set)
			.then(() => goto('/'));
	}
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
			{#if user && !errorParam}
				<img
					referrerpolicy={isGoogle ? 'no-referrer' : null}
					class="w-8 h-8 rounded"
					src={isGoogle
						? user.picture
						: isFacebook
						? user.picture.data.url
						: isGithub
						? user.avatar_url
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
	{#if errorParam}
		<p in:fade class="msg">Login failed. Try again?</p>
	{/if}
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
