<script>
	import { fade } from 'svelte/transition';
</script>

<div class="h-full z-40 w-full grid inset-0 fixed place-content-center ">
	<div class="bg-gray-300 w-full opacity-40 inset-0 z-20 absolute" />
	<svg
		class="z-30"
		in:fade
		width="120"
		height="30"
		viewBox="0 0 120 30"
		fill="red"
	>
		<circle cx="15" cy="15" r="15">
			<animate
				attributeName="r"
				from="15"
				to="15"
				begin="0s"
				dur="0.8s"
				values="15;9;15"
				calcMode="linear"
				repeatCount="indefinite"
			/>
			<animate
				attributeName="fill-opacity"
				from="1"
				to="1"
				begin="0s"
				dur="0.8s"
				values="1;.5;1"
				calcMode="linear"
				repeatCount="indefinite"
			/>
		</circle>
		<circle cx="60" cy="15" r="9" fill-opacity="0.3">
			<animate
				attributeName="r"
				from="9"
				to="9"
				begin="0s"
				dur="0.8s"
				values="9;15;9"
				calcMode="linear"
				repeatCount="indefinite"
			/>
			<animate
				attributeName="fill-opacity"
				from="0.5"
				to="0.5"
				begin="0s"
				dur="0.8s"
				values=".5;1;.5"
				calcMode="linear"
				repeatCount="indefinite"
			/>
		</circle>
		<circle cx="105" cy="15" r="15">
			<animate
				attributeName="r"
				from="15"
				to="15"
				begin="0s"
				dur="0.8s"
				values="15;9;15"
				calcMode="linear"
				repeatCount="indefinite"
			/>
			<animate
				attributeName="fill-opacity"
				from="1"
				to="1"
				begin="0s"
				dur="0.8s"
				values="1;.5;1"
				calcMode="linear"
				repeatCount="indefinite"
			/>
		</circle>
	</svg>
</div>

<style>
	svg {
		width: 60px;
	}
</style>
