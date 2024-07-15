// File which changes returned objects from interpreter to list of episodes to downlaod

import { findNumberOfEpisodes, numberList } from './tests/utils';

import data from './source.json';

export interface inputMatches {
	First_Season_Number: string;
	First_Episode_Number: string | undefined;
	Second_Season_Number: string | undefined;
	Second_Episode_Number: string | undefined;
}

export default function translateToDownloadList(input: inputMatches) {
	let downloadList: {
		season: number;
		episodes: number[];
	}[] = [];

	const firstSeasonNumber = Number(input.First_Season_Number);
	const firstEpisodeNumber = Number(input.First_Episode_Number);
	const secondSeasonNumber = Number(input.Second_Season_Number);
	const secondEpisodeNumber = Number(input.Second_Episode_Number);

	// Multiples episode across seasons
	if (input.Second_Season_Number && input.Second_Episode_Number) {
		return downloadList;
	}

	// Multiple episodes in the same season
	if (input.First_Episode_Number && input.Second_Episode_Number) {
		// TODO: Add support for starting with number othen than 1
		downloadList.push({
			season: firstSeasonNumber,
			// TODO: Add safeguard if user input exceeds number of episodes in season
			episodes: numberList(secondEpisodeNumber)
		});

		return downloadList;
	}

	// Single episodes
	if (input.First_Episode_Number) {
		downloadList.push({
			season: firstSeasonNumber,
			episodes: [firstEpisodeNumber]
		});

		return downloadList;
	}

	// Multiple seasons range
	if (input.First_Season_Number && input.Second_Season_Number) {
		for (let index = firstSeasonNumber; index <= secondSeasonNumber; index++) {
			downloadList.push({
				season: index,
				episodes: numberList(findNumberOfEpisodes(index, data))
			});
		}

		return downloadList;
	}

	// Single season
	downloadList.push({
		season: firstSeasonNumber,
		episodes: numberList(findNumberOfEpisodes(firstSeasonNumber, data))
	});

	return downloadList;
}