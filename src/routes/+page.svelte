<script lang="ts">
	import Message from '@feltcoop/felt/ui/Message.svelte';

	import {exports} from '$lib/exports';
	import {stripStart} from '$lib/string';

	// TODO glob import and print API?

	const exps = exports.map((e) => `@feltcoop/util/${stripStart(e, 'lib/')}`).filter(Boolean);
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
		{#each exps as exp, i}<li class="markup">
				<code class="padded-sm"
					>import {'{'}...} from '<a
						href="https://github.com/feltcoop/util/blob/main/src/{exports[i]}">{exp.trim()}</a
					>'</code
				>
			</li>{/each}
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
	}
</style>
