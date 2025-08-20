import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// IMPORTANT: Set your production site URL so canonical links and sitemaps use absolute URLs
export default defineConfig({
	// Replace with your live domain, including protocol, no trailing slash
	site: 'https://tsitsikammaultra.co.za',
	integrations: [
		sitemap({
			filter: (page) => {
				const value = String(page);
				const pathname = value.startsWith('http') ? new URL(value).pathname : value;
				if (['/404', '/404/', '/success', '/success/'].includes(pathname)) return false;
				if (pathname.endsWith('/tsitsikamma-ultra-2026.gpx')) return false;
				return true;
			},
		}),
	],
});
