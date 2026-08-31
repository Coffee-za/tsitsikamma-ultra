import { getImage, type ImageMetadata } from 'astro:assets';

export type ResponsiveBannerSources =
	| ImageMetadata
	| { mobile: ImageMetadata; tablet: ImageMetadata; desktop: ImageMetadata };

export type ResponsiveBannerImages = {
	mobileAvif: Awaited<ReturnType<typeof getImage>>;
	mobileWebp: Awaited<ReturnType<typeof getImage>>;
	tabletAvif: Awaited<ReturnType<typeof getImage>>;
	tabletWebp: Awaited<ReturnType<typeof getImage>>;
	desktopAvif: Awaited<ReturnType<typeof getImage>>;
	desktopWebp: Awaited<ReturnType<typeof getImage>>;
	width: number;
	height: number;
};

// ~2x common viewport widths, capped to each source's native resolution.
const MOBILE_WIDTH = 1200;
const TABLET_WIDTH = 2000;
const DESKTOP_WIDTH = 2400;

function resolveSources(sources: ResponsiveBannerSources) {
	if (!('mobile' in sources)) {
		return { mobile: sources, tablet: sources, desktop: sources };
	}

	return sources;
}

function capWidth(src: ImageMetadata, target: number) {
	return Math.min(src.width, target);
}

export async function getResponsiveBannerImages(
	sources: ResponsiveBannerSources,
): Promise<ResponsiveBannerImages> {
	const { mobile, tablet, desktop } = resolveSources(sources);

	const [mobileAvif, mobileWebp, tabletAvif, tabletWebp, desktopAvif, desktopWebp] =
		await Promise.all([
			getImage({ src: mobile, format: 'avif', width: capWidth(mobile, MOBILE_WIDTH) }),
			getImage({ src: mobile, format: 'webp', width: capWidth(mobile, MOBILE_WIDTH) }),
			getImage({ src: tablet, format: 'avif', width: capWidth(tablet, TABLET_WIDTH) }),
			getImage({ src: tablet, format: 'webp', width: capWidth(tablet, TABLET_WIDTH) }),
			getImage({ src: desktop, format: 'avif', width: capWidth(desktop, DESKTOP_WIDTH) }),
			getImage({ src: desktop, format: 'webp', width: capWidth(desktop, DESKTOP_WIDTH) }),
		]);

	return {
		mobileAvif,
		mobileWebp,
		tabletAvif,
		tabletWebp,
		desktopAvif,
		desktopWebp,
		width: desktop.width,
		height: desktop.height,
	};
}
