<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Add post</h1>
<form method="post" action="?/login" use:enhance>
	<label>
		Title
		<input name="title" />
	</label>
	<label>
		Content
		<input name="content" />
	</label>
	<button>Save</button>
	<!-- <button formaction="?/register">Register</button> -->
</form>
<p style="color: red">{form?.message ?? ''}</p>
