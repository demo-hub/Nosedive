<style>
	h1 {
		text-align: center;
		margin: 0 auto;
		color: rgb(255,62,0);
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	.fa-twitter {
		color: white;
	}

	#twitter-button {
		background-color: #1DA1F2;
		color: white;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script>
	import { goto, stores } from "@sapper/app";
  	const { session } = stores();

	let password = "";
	let username = "";
	let error;

	const signIn = async () => {
		await fetch('/twitterLogin', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
        		"Accept": "application/json"
			}
		})
	}

	const handleLogin = async () => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

	const parsed = await response.json();

    if (!parsed.token) {
      error = parsed.error;
    } else {
      $session.token = parsed.token;
      goto("/movies");
    }
  };
</script>

<svelte:head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css.map">
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
	<title>Nosedive</title>
</svelte:head>

<h1>N O S E D I V E</h1>

<button id="twitter-button" class="btn btn-block btn-social btn-twitter" on:click="{signIn}">
	<i class="fa fa-twitter"></i> Sign in with Twitter
</button>

<br>

<form on:submit|preventDefault="{handleLogin}" method="post">
	<label>
	  Username:
	  <input type="text" bind:value="{username}" />
	</label>
	<label>
	  Password:
	  <input type="password" bind:value="{password}" />
	</label>
	<button type="submit">Login</button>
  </form>

  {#if error}
  <p>{error}</p>
  {/if}
