import translateToDownloadList, { inputMatches } from './translateToDownloadList';
import {
	illegalCharactersRegex,
	multipleEpisodesRangeRegex,
	episodeRegex,
	multipleSeasonsRangeRegex,
	seasonsRegex
} from './regexes';
import { seasonList } from './types';

const debug = false;

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

	// Split the input by spaces
	const inputsList = input.split(' ');
	let downloadList: seasonList[] = [];

	for (const inputItem of inputsList) {
		// Check for illegal characters, so any characters other than 'S', 'E', numbers and dashes
		if (illegalCharactersRegex.test(inputItem) == true) {
			throw new Error('Illegal characters found in input. Please revise it and try again.');
		}

		// Check if multiple episodes range
		// S5E1-E12
		// S5E1-S8E12 (In future)
		if (multipleEpisodesRangeRegex.test(inputItem) == true) {
			if (debug) {
				console.log('REGEX: Multiple episodes range');
			}
			
			const items = multipleEpisodesRangeRegex.exec(inputItem)?.groups as unknown as inputMatches;

			if (!items) {
				throw new Error('some temp error');
			}

			downloadList = downloadList.concat(translateToDownloadList(items));
			continue;
		}

		// Check if episodes
		// S5E1 S7E3
		if (episodeRegex.test(inputItem) == true) {
			if (debug) {
				console.log('REGEX: Episode');
			}

			const items = episodeRegex.exec(inputItem)?.groups as unknown as inputMatches;

			if (!items) {
				throw new Error('some temp error');
			}

			downloadList = downloadList.concat(translateToDownloadList(items));
			continue;
		}

		// Check if multiple seasons range
		// S3-S5
		if (multipleSeasonsRangeRegex.test(inputItem) == true) {
			if (debug) {
				console.log('REGEX: Multiple seasons range');
			}

			const items = multipleSeasonsRangeRegex.exec(inputItem)?.groups as unknown as inputMatches;

			if (!items) {
				throw new Error('some temp error');
			}

			downloadList = downloadList.concat(translateToDownloadList(items));
			continue;
		}

		// Check if seasons
		// S1
		// S2 S3
		if (seasonsRegex.test(inputItem) == true) {
			if (debug) {
				console.log('REGEX: Season');
			}

			const items = seasonsRegex.exec(inputItem)?.groups as unknown as inputMatches;

			if (!items) {
				throw new Error('some temp error');
			}

			downloadList = downloadList.concat(translateToDownloadList(items));
			continue;
		}

		if (downloadList.length == 0) {
			throw new Error('Invalid syntax. Please revise it and try again.');
		}
	}

	return downloadList;
}
