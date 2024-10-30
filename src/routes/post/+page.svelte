<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let saving = $state(false);
</script>

<h1 class="mb-4 text-2xl font-bold">Add post:</h1>
<form
	method="post"
	action="?/save"
	use:enhance={() => {
		saving = true;
		return async ({ update }) => {
			await update();
			saving = false;
		};
	}}
	class="space-y-4"
>
	<div>
		<label class="block text-sm font-medium text-gray-700">
			Title
			<input
				disabled={saving}
				name="title"
				required
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
			/>
		</label>
	</div>
	<div>
		<label class="block text-sm font-medium text-gray-700">
			Content
			<input
				disabled={saving}
				required
				name="content"
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
			/>
		</label>
	</div>
	<button
		class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	>
		Save
	</button>
	<!-- <button formaction="?/register" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button> -->
</form>
<p class="mt-4 text-red-500">{form?.message ?? ''}</p>
{#if saving}
	<span class="saving">saving...</span>
{/if}
