import { getImage, type ImageMetadata } from 'astro:assets';
import {
	galleryYear,
	photoAlts,
	photoOrder,
	photographerPath,
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
	path: string;
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

		return a.path.localeCompare(b.path, undefined, { numeric: true });
	});
}

function albumFromPath(path: string): string | null {
	const after = path.split('2026-Gallery/')[1];
	if (!after) return null;

	const parts = after.split('/').map((part) => decodeURIComponent(part));
	return parts.length >= 3 ? parts[1] : null;
}

function albumTitle(folder: string): string {
	return folder.replace(/^\d+-/, '').replace(/-/g, ' ');
}

export type GalleryAlbum = {
	key: string;
	title: string | null;
	photos: GalleryPhoto[];
};

export function groupPhotosByAlbum(photos: GalleryPhoto[]): GalleryAlbum[] {
	const albums = new Map<string, GalleryPhoto[]>();

	for (const photo of photos) {
		const key = albumFromPath(photo.path) ?? '';
		const group = albums.get(key);
		if (group) {
			group.push(photo);
		} else {
			albums.set(key, [photo]);
		}
	}

	return [...albums.entries()]
		.sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
		.map(([key, albumPhotos]) => ({
			key: key || 'all',
			title: key ? albumTitle(key) : null,
			photos: albumPhotos,
		}));
}

export type GetGalleryPhotosOptions = {
	photographerFolder?: string;
};

export async function getGalleryPhotos(
	options: GetGalleryPhotosOptions = {},
): Promise<GalleryPhoto[]> {
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
				path,
				filename,
				alt: photoAlts[filename] ?? fallbackAlt(filename),
				photographer,
				lightboxSrc: full.src,
				lightboxWidth: Number(full.attributes.width),
				lightboxHeight: Number(full.attributes.height),
			} satisfies GalleryPhoto;
		}),
	);

	const sorted = sortPhotos(photos.filter((photo): photo is GalleryPhoto => photo !== null));

	if (options.photographerFolder) {
		return sorted.filter((photo) => photo.photographer.folder === options.photographerFolder);
	}

	return sorted;
}

export type PhotographerCover = {
	photographer: GalleryPhotographer;
	cover: GalleryPhoto | null;
	photoCount: number;
	href: string | null;
};

export async function getPhotographerCovers(year: number = galleryYear): Promise<PhotographerCover[]> {
	const photos = await getGalleryPhotos();

	return photographers.map((photographer) => {
		const theirs = photos.filter((photo) => photo.photographer.folder === photographer.folder);
		const cover = photographer.coverFilename
			? (theirs.find((photo) => {
					const decodedPath = decodeURIComponent(photo.path);
					return (
						decodedPath.endsWith(photographer.coverFilename!) ||
						photo.filename === photographer.coverFilename
					);
				}) ?? theirs[0] ?? null)
			: (theirs[0] ?? null);

		return {
			photographer,
			cover,
			photoCount: theirs.length,
			href: theirs.length > 0 ? photographerPath(year, photographer.slug) : null,
		};
	});
}
