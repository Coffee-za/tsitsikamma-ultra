import { getImage, type ImageMetadata } from 'astro:assets';
import {
	photoAlts,
	photoOrder,
	photographers,
	type GalleryPhotographer,
} from '../data/gallery';

const modules = import.meta.glob<{ default: ImageMetadata }>(
	'../assets/2026-Gallery/**/*.{jpeg,jpg,webp}',
	{ eager: true },
);

const LIGHTBOX_WIDTH = 1600;

export type GalleryPhoto = {
	src: ImageMetadata;
	filename: string;
	alt: string;
	photographer: GalleryPhotographer;
	lightboxSrc: string;
	lightboxWidth: number;
	lightboxHeight: number;
};

function photographerFromPath(path: string): GalleryPhotographer | undefined {
	const match = path.match(/2026-Gallery\/([^/]+)\//);
	if (!match) return undefined;

	const folder = decodeURIComponent(match[1]);
	return photographers.find((photographer) => photographer.folder === folder);
}

function filenameFromPath(path: string): string {
	return decodeURIComponent(path.split('/').pop() ?? path);
}

function fallbackAlt(filename: string): string {
	const stem = filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
	return `Tsitsikamma Ultra 2026 race photo: ${stem}`;
}

function sortPhotos(photos: GalleryPhoto[]): GalleryPhoto[] {
	return [...photos].sort((a, b) => {
		const aIndex = photoOrder.indexOf(a.filename);
		const bIndex = photoOrder.indexOf(b.filename);

		if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
		if (aIndex !== -1) return -1;
		if (bIndex !== -1) return 1;

		const byPhotographer = a.photographer.name.localeCompare(b.photographer.name);
		if (byPhotographer !== 0) return byPhotographer;

		return a.filename.localeCompare(b.filename);
	});
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
	const photos = await Promise.all(
		Object.entries(modules).map(async ([path, mod]) => {
			const photographer = photographerFromPath(path);
			if (!photographer) return null;

			const src = mod.default;
			const filename = filenameFromPath(path);
			const full = await getImage({
				src,
				width: Math.min(src.width, LIGHTBOX_WIDTH),
				format: 'webp',
			});

			return {
				src,
				filename,
				alt: photoAlts[filename] ?? fallbackAlt(filename),
				photographer,
				lightboxSrc: full.src,
				lightboxWidth: Number(full.attributes.width),
				lightboxHeight: Number(full.attributes.height),
			} satisfies GalleryPhoto;
		}),
	);

	return sortPhotos(photos.filter((photo): photo is GalleryPhoto => photo !== null));
}
