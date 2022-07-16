<script>
	import { simple as format } from 'timeago-simple';
	export let date = new Date();
</script>

<time>{format(date)}</time>
