export type GalleryPhotographer = {
	folder: string;
	name: string;
	slug: string;
	coverFilename?: string;
	website?: string;
	instagram?: string;
	handle?: string;
};

export const galleryYear = 2026;

export const photographers: GalleryPhotographer[] = [
	{
		folder: 'Glenn Murray',
		name: 'Glenn Murray',
		slug: 'glenn-murray',
		coverFilename: '0134.jpg',
		website: 'https://gmurrayphoto.co.za',
	},
	{
		folder: 'Carmen Claire',
		name: 'Carmen Claire',
		slug: 'carmen-claire',
		coverFilename: '3-Forest-and-River/Tsitsikamma Ultra_Carmen Claire Photography20.jpg',
		instagram: 'https://www.instagram.com/carmenclairevdw/',
		handle: '@carmenclairevdw',
	},
];

export const photoAlts: Record<string, string> = {};

export const photoOrder = Object.keys(photoAlts);

export function photographerPath(year: number, slug: string): string {
	return `/gallery/${year}/${slug}`;
}

export function photographerHref(photographer: GalleryPhotographer): string | undefined {
	return photographer.website ?? photographer.instagram;
}

export function photographerLinkLabel(photographer: GalleryPhotographer): string {
	if (photographer.website) {
		return photographer.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
	}

	if (photographer.handle) {
		return photographer.handle;
	}

	return photographer.name;
}
