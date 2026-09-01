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
		coverFilename: 'MountainClimb_Glenn_2.jpeg',
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

export const photoAlts: Record<string, string> = {
	'Marco_Glenn_Start.jpeg':
		'Smiling runner with a headlamp giving a thumbs up at the Petroport night start',
	'PlettRunners_Glenn_Finish.jpeg':
		'Group of trail runners in headlamps posing together before the night start',
	'MountainClimb_Glenn_2.jpeg':
		'Female trail runner power-hiking a steep rocky mountain trail through misty hills',
	'MountainClimb_Glenn_3.jpeg':
		'Trail runner celebrating with a dancing pose on a lush mountain trail',
	'MountainClimb_Glenn_4.jpeg':
		'Smiling female runner using trekking poles on an uphill forest trail',
	'MountainClimb_Glenn_5.jpeg':
		'Trail runner passing a wooden sign for Old Bloukrans Forestry Station',
	'MountainClimb_Glenn_6.jpeg':
		'Two trail runners on a narrow ridge path overlooking a lush green valley',
	'Glenn_River.jpeg':
		'Trail runner on a rocky path above a tiered waterfall with amber pools',
	'Glenn_RiverCorssing.jpeg':
		'Two trail runners crossing a rocky amber-coloured mountain stream',
	'RiverCrossing_Glenn.jpeg':
		'Trail runner stepping across rocks beside a forest stream',
	'RiverCrossing_Glenn_2.jpeg':
		'Smiling bearded runner crossing a rocky stream with other runners behind him',
	'RiverCrossing_Glenn_3.jpeg':
		'Smiling runner giving a double thumbs-up while crossing a rocky stream',
	'RiverCrossing_Glenn_5.jpeg':
		'Trail runners navigating a rocky tea-coloured river crossing from above',
	'ExcitedFinisher_Glenn_Finish.jpeg':
		'Female runner shouting with joy and high-fiving as she crosses the finish',
	'FamilyPhoto_Glenn_Finish.jpeg':
		'Finisher celebrating with family and two young children at the finish line',
	'LadyRunner_Glenn_Finish.jpeg':
		'Joyful female runner smiling under the Tsitsikamma Ultra finish banner',
	'MomAndSon_Glenn_Finish.jpeg':
		'Smiling female runner posing with a young boy at the finish',
	'NightFinish_Glenn_Finish.jpeg':
		'Two finishers wearing medals posing under the Tsitsikamma Ultra banner at night',
	'Shoey_Glenn_Finish.jpeg':
		'Finisher celebrating with a shoey under the finish banner',
	'SmilingRunner_Nic_Glenn_Finish.jpeg':
		'Smiling finisher wearing a medal and making a peace sign at the finish',
	'TwoMenCrossingFinish_Glenn_Finish.jpeg':
		'Two trail runners with trekking poles running towards the finish on grass',
	'Medals_Glenn.jpeg':
		'Silver Tsitsikamma Ultra 2026 finisher medals on a wooden table',
};

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
