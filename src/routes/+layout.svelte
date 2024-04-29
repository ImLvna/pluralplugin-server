<script lang="ts">
	import './app.css';

	const { children } = $props();
</script>

<div
	class="main size-full bg-gray-800 text-white flex flex-col justify-center align-middle items-center"
>
	{@render children()}
</div>

<style>
	:global(html, body) {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
