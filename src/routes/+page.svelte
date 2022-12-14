<script lang="ts">
	import Message from '@feltcoop/felt/ui/Message.svelte';

	import manifest from '$lib/manifest.json';
	import Manifest from '$lib/Manifest.svelte';
</script>

<main class="column">
	<section class="padded-xl">
		<header>
			<h1 class="centered-hz">
				<a href="https://github.com/feltcoop">💚</a>@feltcoop/util<a
					href="https://github.com/feltcoop/util">🦕🐋</a
				>
			</h1>
		</header>
	</section>
	<section class="padded-xl">
		<Message
			><a href="https://github.com/feltcoop/util" slot="icon">🐙😺</a><span
				><a href="https://www.npmjs.com/package/@feltcoop/util"
					><code>npm i -D @feltcoop/util</code></a
				></span
			></Message
		>
	</section>
	<section class="padded-xl">
		<Manifest {manifest} />
	</section>
	<footer class="centered">
		<a href="https://github.com/feltcoop/util" title="source code on github">🐙😺</a>
		<a href="https://github.com/feltcoop">💚</a>
	</footer>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
	h1 {
		text-align: center;
	}
	footer {
		font-size: var(--font_size_xl);
	}
	footer > *:first-child {
		font-size: var(--font_size_xl5);
		margin-bottom: var(--spacing_xl5);
	}
</style>
