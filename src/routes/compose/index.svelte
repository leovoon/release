<script>
	import { enhance } from '$lib/form';
</script>

<form action="/api/add" method="post" use:enhance class="grid">
	<input type="text" name="mood" value="hate" />
	<textarea cols={30} rows={6} name="text" placeholder="Speak your brains" />
	<button type="submit" class="btn-light place-self-end">Release</button>
</form>

<!-- {#if error}
	<p class="error">oops! {error.message}</p>
{:else if posting}
	<p>posting comment...</p>
{/if}

{#each comments as comment}
	<div class="comment">
		<h3>{comment.name}</h3>
		<p>{comment.body}</p>
	</div>
{/each} -->
