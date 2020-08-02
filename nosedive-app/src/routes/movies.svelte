<script>
import { group_outros } from "svelte/internal";

</script>
<script context="module">
	import { goto } from "@sapper/app";
	export function preload(page, session) {
		if (!session) {
			goto("/");
		}
	  console.log(session);
	}
  </script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>