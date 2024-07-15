import {
	illegalCharactersRegex,
	multipleEpisodesRangeRegex,
	episodeRegex,
	multipleSeasonsRangeRegex,
	seasonsRegex
} from './regexes';

export async function input() {
	const iterator = console[Symbol.asyncIterator]();
	const text = (await iterator.next()).value;

	// Ignore Typescript error, as it's not a valid error
	// @ts-ignore
	await iterator.return();

	if (!text) {
		console.log('Empty input. Please try again.');
		process.exit(0);
	}

	return text;
}

export function interpret(input: string) {
	// Examples:
	// S2 - Single season
	// S3 S4 S5 - Multiple seasons
	// S10-S14 - Multiple seasons range
	// S3E1 S3E2 S3E3 - Multiple episodes
	// S3E1-E12 S4E1-S4E5 - Multiple episodes range spanning across seasons

	// Remove leading and trailing spaces
	input = input.trim();

	const inputsList = input.split(' ');
	let responseList = [];

	for (const inputItem of inputsList) {
		// Check for illegal characters
		if (illegalCharacters.test(inputItem) == true) {
			throw new Error('Illegal characters found in input. Please revise it and try again.');
		}

		// Check in input starts with 'S'
		if (!inputItem.startsWith('S')) {
			throw new Error('Please specify season number first next time.');
		}

		// Season
		if (!inputItem.includes('E')) {
			console.log('Season');
			return;
		}

		// Multiple seasons range
		if (!inputItem.includes('E') && inputItem.includes('-')) {
			console.log('Multiple seasons range');
			return;
		}

		// Episode
		if (inputItem.includes('E') && !inputItem.includes('-')) {
			// S5E12
			console.log('Episode');
			return;
		}

		// Multiple episodes range
		if (inputItem.includes('E') && inputItem.includes('-')) {
			// S5E1-E12
			console.log('Multiple episodes range');
			return;
		}
	}
}
