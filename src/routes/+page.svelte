<script>
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import members from '$lib/data/members.json';
	import projects from '$lib/data/projects.json';

	let { data } = $props();
	let heroTitle;

	onMount(() => {
		if (heroTitle) {
			scrambleText(heroTitle, 'B6326');
		}
	});

	function scrambleText(el, text) {
		const chars = '!<>-_\\/[]{}—=+*^?#';
		const queue = [];

		for (let i = 0; i < text.length; i++) {
			queue.push({
				to: text[i],
				start: Math.floor(Math.random() * 30),
				end: Math.floor(Math.random() * 30) + 30
			});
		}

		let frame = 0;

		function update() {
			let output = '';
			let complete = 0;

			for (let i = 0; i < queue.length; i++) {
				const { to, start, end } = queue[i];
				if (frame >= end) {
					complete++;
					output += to;
				} else if (frame >= start) {
					output += `<span class="scramble-char">${chars[Math.floor(Math.random() * chars.length)]}</span>`;
				} else {
					output += '\u00A0';
				}
			}

			el.innerHTML = output;

			if (complete < queue.length) {
				frame++;
				requestAnimationFrame(update);
			}
		}

		el.innerHTML = '';
		requestAnimationFrame(update);
	}

	function tilt(node) {
		function handleMouseMove(e) {
			const rect = node.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
			const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
			node.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
		}

		function handleMouseLeave() {
			node.style.transform = '';
		}

		node.addEventListener('mousemove', handleMouseMove);
		node.addEventListener('mouseleave', handleMouseLeave);

		return {
			destroy() {
				node.removeEventListener('mousemove', handleMouseMove);
				node.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}

	function heroMouse(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width - 0.5) * 80;
		const y = ((e.clientY - rect.top) / rect.height - 0.5) * 80;
		e.currentTarget.style.setProperty('--mx', `${x}px`);
		e.currentTarget.style.setProperty('--my', `${y}px`);
	}

	function getInitials(name) {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('');
	}

	function formatDate(dateStr) {
		return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>B6326</title>
	<meta name="description" content="B6326 — A team building things that matter." />
</svelte:head>

<!-- Hero -->
<div class="hero" onmousemove={heroMouse} role="banner">
	<h1 class="hero-title" bind:this={heroTitle}>B6326</h1>
	<p class="hero-subtitle">A team building things that matter.</p>
	<div class="scroll-indicator">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</div>
</div>

<!-- About -->
<section id="about" class="section">
	<div use:reveal>
		<p class="section-label">About</p>
		<h2 class="section-title">What we do</h2>
		<p class="section-description">
			We're a small team of developers, designers, and researchers building tools
			that make complex work simpler. We believe in shipping early, iterating often,
			and keeping things minimal.
		</p>
	</div>
</section>

<!-- Members -->
<section id="members" class="section">
	<div use:reveal>
		<p class="section-label">Team</p>
		<h2 class="section-title">Members</h2>
	</div>
	<div class="card-grid">
		{#each members as member, i}
			<div class="card" use:reveal={{ delay: i * 100 }} use:tilt>
				<div class="member-avatar">{getInitials(member.name)}</div>
				<p class="member-name">{member.name}</p>
				<p class="member-role">{member.role}</p>
				<p class="member-bio">{member.bio}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Projects -->
<section id="projects" class="section">
	<div use:reveal>
		<p class="section-label">Work</p>
		<h2 class="section-title">Projects</h2>
	</div>
	<div class="card-grid">
		{#each projects as project, i}
			<div class="card" use:reveal={{ delay: i * 100 }} use:tilt>
				<div class="project-header">
					<p class="project-title">{project.title}</p>
					<span class="project-status">{project.status}</span>
				</div>
				<p class="project-description">{project.description}</p>
				<div class="project-tags">
					{#each project.tags as tag}
						<span class="project-tag">{tag}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- News -->
<section id="news" class="section">
	<div use:reveal>
		<p class="section-label">Updates</p>
		<h2 class="section-title">News</h2>
	</div>
	{#if data.posts.length > 0}
		<div class="news-list" use:reveal={{ delay: 100 }}>
			{#each data.posts as post}
				<a href="{base}/news/{post.slug}" class="news-item">
					<p class="news-date">{formatDate(post.date)}</p>
					<p class="news-title">{post.title}</p>
					<p class="news-excerpt">{post.excerpt}</p>
				</a>
			{/each}
		</div>
	{/if}
</section>
