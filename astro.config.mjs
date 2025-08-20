import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// IMPORTANT: Set your production site URL so canonical links and sitemaps use absolute URLs
export default defineConfig({
	// Replace with your live domain, including protocol, no trailing slash
	site: 'https://www.tsitsikammaultra.co.za',
	integrations: [
		sitemap({
			filter: (page) => !['/404', '/success'].includes(page),
		}),
	],
});
