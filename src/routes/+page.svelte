<script lang="ts">
	const { data } = $props();

	let origSpToken = $state(data.spToken);

	let spToken = $state($state.snapshot(data.spToken));

	let changesMade = $derived(spToken !== origSpToken);

	let tokenValid = $derived(spToken.length > 0);

	const saveData = async () => {
		const res = await fetch('/api/setToken', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: spToken
			})
		}).then((i) => i.json());
		origSpToken = res.token;
	};
</script>

<div class="root flex flex-col gap-3 text-center">
	<h1>Logged in as {data.user.global_name}</h1>

	<h2>Simply Plural Token</h2>
	{#if !tokenValid}
		<p class="text-red-500">Token cannot be empty</p>
	{/if}
	<input type="password" class="text-black" id="spToken" bind:value={spToken} />

	{#if changesMade && tokenValid}
		<button onclick={saveData}>Save</button>
	{/if}
</div>
