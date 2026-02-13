<script>
	import { base } from '$app/paths';

	let { data } = $props();

	function formatDate(dateStr) {
		return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.title} — B6326</title>
</svelte:head>

<article class="post">
	<a href="{base}/#news" class="post-back">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<line x1="19" y1="12" x2="5" y2="12" />
			<polyline points="12 19 5 12 12 5" />
		</svg>
		Back to news
	</a>
	<p class="post-meta">{formatDate(data.date)}</p>
	<h1 class="post-title">{data.title}</h1>
	<div class="post-content">
		{@html data.html}
	</div>
</article>
