import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { parseFrontmatter } from '$lib/utils/markdown.js';

const modules = import.meta.glob('/src/lib/content/news/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

export function load({ params }) {
	const key = Object.keys(modules).find((k) => k.endsWith(`/${params.slug}.md`));
	if (!key) throw error(404, 'Post not found');

	const { metadata, content } = parseFrontmatter(modules[key]);

	return {
		title: metadata.title,
		date: metadata.date,
		html: marked.parse(content)
	};
}

export function entries() {
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop().replace('.md', '')
	}));
}
