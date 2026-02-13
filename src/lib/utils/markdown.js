export function parseFrontmatter(raw) {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { metadata: {}, content: raw };

	const metadata = {};
	match[1].split('\n').forEach((line) => {
		const idx = line.indexOf(':');
		if (idx > -1) {
			const key = line.slice(0, idx).trim();
			const value = line.slice(idx + 1).trim();
			metadata[key] = value;
		}
	});

	return { metadata, content: match[2] };
}
