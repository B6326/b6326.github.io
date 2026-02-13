<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';

	let { children } = $props();
	let theme = $state('light');

	$effect(() => {
		const saved = localStorage.getItem('theme') || 'light';
		theme = saved;
		document.documentElement.setAttribute('data-theme', saved);
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="nav">
	<div class="nav-inner">
		<a href="{base}/" class="nav-logo">B6326</a>
		<div class="nav-links">
			<a href="{base}/#about">About</a>
			<a href="{base}/#members">Members</a>
			<a href="{base}/#projects">Projects</a>
			<a href="{base}/#news">News</a>
			<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
				{#if theme === 'light'}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="5" />
						<line x1="12" y1="1" x2="12" y2="3" />
						<line x1="12" y1="21" x2="12" y2="23" />
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
						<line x1="1" y1="12" x2="3" y2="12" />
						<line x1="21" y1="12" x2="23" y2="12" />
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
					</svg>
				{/if}
			</button>
		</div>
	</div>
</nav>

<main>
	{@render children()}
</main>

<footer class="footer">
	<p>B6326</p>
</footer>
