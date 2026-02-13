import { parseFrontmatter } from './markdown.js';

export function getAllPosts() {
	const modules = import.meta.glob('/src/lib/content/news/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	return Object.entries(modules)
		.map(([path, raw]) => {
			const slug = path.split('/').pop().replace('.md', '');
			const { metadata } = parseFrontmatter(raw);
			return { slug, ...metadata };
		})
		.sort((a, b) => new Date(b.date) - new Date(a.date));
}
