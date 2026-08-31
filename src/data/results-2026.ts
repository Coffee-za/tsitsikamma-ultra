export type Gender = 'M' | 'F';
export type ResultStatus = 'finisher' | 'dnf';

export interface CourseRecord {
	label: string;
	name: string;
	time: string;
}

export interface ResultRow {
	overallPosition: number | null;
	fullName: string;
	nationality: string;
	countryName: string;
	gender: Gender;
	category: string;
	categoryPosition: number | null;
	finishTime: string;
	status: ResultStatus;
}

interface RawResult {
	fullName: string;
	gender: Gender;
	categoryPosition: number;
	finishTime: string;
}

function timeToSeconds(time: string): number {
	const [hours, minutes, seconds] = time.split(':').map(Number);
	return hours * 3600 + minutes * 60 + seconds;
}

const rawResults: RawResult[] = [
	{ fullName: 'Brandon Hulley', gender: 'M', categoryPosition: 1, finishTime: '06:26:01' },
	{ fullName: 'Connor Hubert', gender: 'M', categoryPosition: 2, finishTime: '06:39:47' },
	{ fullName: 'Daven Stroh', gender: 'M', categoryPosition: 3, finishTime: '07:06:50' },
	{ fullName: 'Keith Jansen', gender: 'M', categoryPosition: 4, finishTime: '07:31:46' },
	{ fullName: 'Stuart McConnachie', gender: 'M', categoryPosition: 5, finishTime: '07:33:45' },
	{ fullName: 'Gideon Visser', gender: 'M', categoryPosition: 6, finishTime: '07:35:58' },
	{ fullName: 'Brett Stevens', gender: 'M', categoryPosition: 7, finishTime: '07:42:43' },
	{ fullName: 'Mike Biesheuvel', gender: 'M', categoryPosition: 8, finishTime: '07:54:34' },
	{ fullName: 'Darren Caboz', gender: 'M', categoryPosition: 9, finishTime: '07:57:14' },
	{ fullName: 'Sean Duffy', gender: 'M', categoryPosition: 10, finishTime: '07:58:21' },
	{ fullName: 'Morne Veitch', gender: 'M', categoryPosition: 11, finishTime: '07:58:55' },
	{ fullName: 'Alexander Spratt', gender: 'M', categoryPosition: 12, finishTime: '08:01:13' },
	{ fullName: 'Liam Van Der Merwe', gender: 'M', categoryPosition: 13, finishTime: '08:12:42' },
	{ fullName: 'Nic Weyer', gender: 'M', categoryPosition: 14, finishTime: '08:13:30' },
	{ fullName: 'Rudi Second', gender: 'M', categoryPosition: 15, finishTime: '08:14:29' },
	{ fullName: 'Zako Kruger', gender: 'M', categoryPosition: 16, finishTime: '08:14:34' },
	{ fullName: 'Unathi Ndawo', gender: 'M', categoryPosition: 17, finishTime: '08:14:51' },
	{ fullName: 'Gregory Nicolson', gender: 'M', categoryPosition: 18, finishTime: '08:15:52' },
	{ fullName: 'Shannon Blankfield', gender: 'M', categoryPosition: 19, finishTime: '08:47:08' },
	{ fullName: 'Bjorn Vye', gender: 'M', categoryPosition: 20, finishTime: '08:54:23' },
	{ fullName: 'Alastair Stewart', gender: 'M', categoryPosition: 21, finishTime: '09:05:01' },
	{ fullName: 'Pierre Joubert', gender: 'M', categoryPosition: 22, finishTime: '09:25:57' },
	{ fullName: 'Steven Burnett', gender: 'M', categoryPosition: 23, finishTime: '09:34:39' },
	{ fullName: 'Jasco Jacobs', gender: 'M', categoryPosition: 24, finishTime: '09:37:19' },
	{ fullName: 'Marco Barnardo', gender: 'M', categoryPosition: 25, finishTime: '09:38:33' },
	{ fullName: "Kevin O'Connor", gender: 'M', categoryPosition: 26, finishTime: '09:47:42' },
	{ fullName: 'Robert Honiball', gender: 'M', categoryPosition: 27, finishTime: '09:48:40' },
	{ fullName: 'Anrich Schnetler', gender: 'M', categoryPosition: 28, finishTime: '09:52:37' },
	{ fullName: 'Andrew Jansen Van Rensburg', gender: 'M', categoryPosition: 29, finishTime: '09:59:48' },
	{ fullName: 'John Cowlin', gender: 'M', categoryPosition: 30, finishTime: '10:08:18' },
	{ fullName: 'Alex Hawkins', gender: 'M', categoryPosition: 31, finishTime: '10:08:22' },
	{ fullName: 'Johann Schwarz', gender: 'M', categoryPosition: 32, finishTime: '10:29:48' },
	{ fullName: 'Stephen Avidon', gender: 'M', categoryPosition: 33, finishTime: '10:30:33' },
	{ fullName: 'Moenier Da Silva', gender: 'M', categoryPosition: 34, finishTime: '10:34:27' },
	{ fullName: 'Hezzie Ponelat', gender: 'M', categoryPosition: 35, finishTime: '11:02:33' },
	{ fullName: 'James Moir', gender: 'M', categoryPosition: 36, finishTime: '11:25:28' },
	{ fullName: 'Gavin Gresse', gender: 'M', categoryPosition: 37, finishTime: '11:25:55' },
	{ fullName: 'Fanie Du Preez', gender: 'M', categoryPosition: 38, finishTime: '11:26:13' },
	{ fullName: 'David Katz', gender: 'M', categoryPosition: 39, finishTime: '11:26:46' },
	{ fullName: 'Rudolf Schroder', gender: 'M', categoryPosition: 40, finishTime: '11:28:19' },
	{ fullName: 'Nigel Brown', gender: 'M', categoryPosition: 41, finishTime: '11:35:41' },
	{ fullName: 'Alastair Hops', gender: 'M', categoryPosition: 42, finishTime: '11:51:52' },
	{ fullName: 'Byron Momsen', gender: 'M', categoryPosition: 43, finishTime: '12:10:05' },
	{ fullName: 'Nathan Hill', gender: 'M', categoryPosition: 44, finishTime: '12:10:16' },
	{ fullName: 'Kristen Dunn', gender: 'F', categoryPosition: 1, finishTime: '07:11:07' },
	{ fullName: 'Mary-Lee Botha', gender: 'F', categoryPosition: 2, finishTime: '07:54:28' },
	{ fullName: 'Karin Steinmann', gender: 'F', categoryPosition: 3, finishTime: '08:00:27' },
	{ fullName: 'Janet Woodhead', gender: 'F', categoryPosition: 4, finishTime: '08:06:15' },
	{ fullName: 'Lindsey Vye', gender: 'F', categoryPosition: 5, finishTime: '08:38:12' },
	{ fullName: 'Andrea Van Blommestein', gender: 'F', categoryPosition: 6, finishTime: '08:54:41' },
	{ fullName: 'Diana Henry', gender: 'F', categoryPosition: 7, finishTime: '09:08:08' },
	{ fullName: 'Karla Smit', gender: 'F', categoryPosition: 8, finishTime: '09:09:39' },
	{ fullName: 'Shirley Gilbey', gender: 'F', categoryPosition: 9, finishTime: '09:25:50' },
	{ fullName: "Megan O'Connor", gender: 'F', categoryPosition: 10, finishTime: '09:47:35' },
	{ fullName: 'Katharyn Gasson', gender: 'F', categoryPosition: 11, finishTime: '09:54:35' },
	{ fullName: 'Nadia Smith', gender: 'F', categoryPosition: 12, finishTime: '10:37:53' },
	{ fullName: 'Claudine Badenhorst', gender: 'F', categoryPosition: 13, finishTime: '11:01:45' },
	{ fullName: 'Sam Alberts', gender: 'F', categoryPosition: 14, finishTime: '11:02:48' },
	{ fullName: 'Susanna Cilliers', gender: 'F', categoryPosition: 15, finishTime: '11:08:31' },
	{ fullName: 'Victoria Burnett', gender: 'F', categoryPosition: 16, finishTime: '11:12:38' },
	{ fullName: 'Louise Botha', gender: 'F', categoryPosition: 17, finishTime: '11:26:27' },
	{ fullName: 'Michelle Visser', gender: 'F', categoryPosition: 18, finishTime: '11:28:31' },
	{ fullName: 'Joan Van Wyngaard', gender: 'F', categoryPosition: 19, finishTime: '11:36:20' },
	{ fullName: 'Laurike Strobos', gender: 'F', categoryPosition: 20, finishTime: '11:39:44' },
	{ fullName: 'Ilé Schutte-Ferreira', gender: 'F', categoryPosition: 21, finishTime: '11:39:50' },
	{ fullName: 'Jemima Heffron', gender: 'F', categoryPosition: 22, finishTime: '12:25:17' },
];

const dnfResults: { fullName: string; gender: Gender }[] = [
	{ fullName: 'Kyle Heugh', gender: 'M' },
	{ fullName: 'Moses Tau', gender: 'M' },
	{ fullName: 'Lee Dicks', gender: 'M' },
	{ fullName: 'Ryan Kidwell', gender: 'M' },
	{ fullName: 'Werner Blum', gender: 'M' },
	{ fullName: 'Charl Du Toit', gender: 'M' },
	{ fullName: 'Debbie Du Toit', gender: 'F' },
	{ fullName: 'Veronica', gender: 'F' },
];

const finishers: ResultRow[] = [...rawResults]
	.sort((a, b) => timeToSeconds(a.finishTime) - timeToSeconds(b.finishTime))
	.map((row, index) => ({
		overallPosition: index + 1,
		fullName: row.fullName,
		nationality: 'za',
		countryName: 'South Africa',
		gender: row.gender,
		category: row.gender === 'M' ? 'Male' : 'Female',
		categoryPosition: row.categoryPosition,
		finishTime: row.finishTime,
		status: 'finisher',
	}));

const dnfs: ResultRow[] = [...dnfResults]
	.sort((a, b) => a.fullName.localeCompare(b.fullName))
	.map((row) => ({
		overallPosition: null,
		fullName: row.fullName,
		nationality: 'za',
		countryName: 'South Africa',
		gender: row.gender,
		category: row.gender === 'M' ? 'Male' : 'Female',
		categoryPosition: null,
		finishTime: '-',
		status: 'dnf',
	}));

export const results2026: ResultRow[] = [...finishers, ...dnfs];

const mensWinner = results2026.find((row) => row.gender === 'M');
const womensWinner = results2026.find((row) => row.gender === 'F');

export const courseRecords: CourseRecord[] = [
	{ label: "Men's Course Record", name: mensWinner?.fullName ?? '', time: mensWinner?.finishTime ?? '' },
	{ label: "Women's Course Record", name: womensWinner?.fullName ?? '', time: womensWinner?.finishTime ?? '' },
];
