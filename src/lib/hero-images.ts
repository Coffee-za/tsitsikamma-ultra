import heroDesktop from '../assets/heroes/hero-desktop.webp';
import heroMobile from '../assets/heroes/hero-mobile.webp';
import heroTablet from '../assets/heroes/hero-tablet.webp';
import { getResponsiveBannerImages } from './responsive-banner-images';

export async function getHeroImages() {
	return getResponsiveBannerImages({
		mobile: heroMobile,
		tablet: heroTablet,
		desktop: heroDesktop,
	});
}
