<script context="module" lang="ts">
	import type { Session } from 'sk-auth';
	export const load = ({ session }: Session) => {
		const { user } = session;

		// if user exists, redirect to homepage
		if (user) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {};
	};
</script>

<section class="m-auto w-full grid gap-6 place-items-center">
	<h1 class="my-4 text-center">Choose method</h1>
	<a href="/api/auth/signin/google?redirect=/" class="btn-login"
		>Login with <svg class="w-5 h-5 inline mx-2" viewBox="0 0 48 48"
			><defs
				><path
					id="a"
					d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
				/></defs
			><clipPath id="b"><use xlink:href="#a" overflow="visible" /></clipPath
			><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path
				clip-path="url(#b)"
				fill="#EA4335"
				d="M0 11l17 13 7-6.1L48 14V0H0z"
			/><path
				clip-path="url(#b)"
				fill="#34A853"
				d="M0 37l30-23 7.9 1L48 0v48H0z"
			/><path
				clip-path="url(#b)"
				fill="#4285F4"
				d="M48 48L17 24l-4-3 35-10z"
			/></svg
		></a
	>

	<a href="/api/auth/signin/facebook?redirect=/" class="btn-login "
		>Login with
		<svg
			class="w-6 h-6 inline mx-2"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			width="48px"
			height="48px"
			><path
				fill="#039be5"
				d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
			/><path
				fill="#fff"
				d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
			/></svg
		>
	</a>
</section>
