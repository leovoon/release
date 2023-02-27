<header>
	<figure>
		<section class="img-bg" />
		<h1 class="sm:text-4xl text-3xl grid place-items-center w-full mb-4 ">
			Spit your thoughts
		</h1>
	</figure>
</header>

<div class="flex flex-col gap-4 ">
	<a
		data-sveltekit-preload-data
		href="/compose/happy"
		class="btn-blue p-6 text-xl">I am happy that 💚</a
	>
	<a
		data-sveltekit-preload-data
		href="/compose/hate"
		class="btn-red p-6 text-xl"
	>
		I hate it when 🔥</a
	>
	<a data-sveltekit-preload-data href="/history" class="btn-light"
		>view history</a
	>
</div>

<style lang="postcss">
	figure {
		@apply grid place-items-center;
	}
	figure .img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s forwards infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-blue-400/50;
		}
		33% {
			@apply bg-orange-400/50;
		}
		66% {
			@apply bg-red-400/50;
		}
		100% {
			@apply bg-green-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
