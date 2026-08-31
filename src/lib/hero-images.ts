import { getImage } from 'astro:assets';
import heroDesktop from '../assets/heroes/hero-desktop.webp';
import heroMobile from '../assets/heroes/hero-mobile.webp';
import heroTablet from '../assets/heroes/hero-tablet.webp';

export async function getHeroImages() {
	const [mobileAvif, mobileWebp, tabletAvif, tabletWebp, desktopAvif, desktopWebp] =
		await Promise.all([
			getImage({ src: heroMobile, format: 'avif', width: 800 }),
			getImage({ src: heroMobile, format: 'webp', width: 800 }),
			getImage({ src: heroTablet, format: 'avif', width: 1200 }),
			getImage({ src: heroTablet, format: 'webp', width: 1200 }),
			getImage({ src: heroDesktop, format: 'avif', width: 1920 }),
			getImage({ src: heroDesktop, format: 'webp', width: 1920 }),
		]);

	return {
		mobileAvif,
		mobileWebp,
		tabletAvif,
		tabletWebp,
		desktopAvif,
		desktopWebp,
		width: heroDesktop.width,
		height: heroDesktop.height,
	};
}
