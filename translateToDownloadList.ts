// File which changes returned objects from interpreter to list of episodes to downlaod

import { findNumberOfEpisodes, numberList } from './tests/utils';
import { seasonList } from './types';

import data from './source.json';

export interface inputMatches {
	First_Season_Number: string;
	First_Episode_Number: string | undefined;
	Second_Season_Number: string | undefined;
	Second_Episode_Number: string | undefined;
}

export default function translateToDownloadList(input: inputMatches) {
	let downloadList: seasonList[] = [];

	const firstSeasonNumber = Number(input.First_Season_Number);
	const firstEpisodeNumber = Number(input.First_Episode_Number);
	const secondSeasonNumber = Number(input.Second_Season_Number);
	const secondEpisodeNumber = Number(input.Second_Episode_Number);

	// Multiples episode across seasons
	if (input.Second_Season_Number && input.Second_Episode_Number) {
		return downloadList;
	}

	// Multiple episodes range in the same season
	if (input.First_Episode_Number && input.Second_Episode_Number) {
		// Safeguard if user input exceeds number of episodes in season
		if (
			firstEpisodeNumber > findNumberOfEpisodes(firstSeasonNumber, data) ||
			secondEpisodeNumber > findNumberOfEpisodes(firstSeasonNumber, data)
		) {
			throw new Error('Episode number exceeds number of episodes in the season');
		}

		downloadList.push({
			season: firstSeasonNumber,
			episodes: data[firstSeasonNumber - 1].episodes
				.slice(firstEpisodeNumber - 1, secondEpisodeNumber)
				.map((episode) => {
					return {
						number: episode.number,
						link: episode.link_url
					};
				})
		});

		return downloadList;
	}

	// Single episodes
	if (input.First_Episode_Number) {
		downloadList.push({
			season: firstSeasonNumber,
			episodes: [
				{
					number: firstEpisodeNumber,
					link: data[firstSeasonNumber - 1].episodes[firstEpisodeNumber - 1].link_url
				}
			]
		});

		return downloadList;
	}

	// Multiple seasons range
	if (input.First_Season_Number && input.Second_Season_Number) {
		for (let seasonNumber = firstSeasonNumber; seasonNumber <= secondSeasonNumber; seasonNumber++) {
			downloadList.push({
				season: seasonNumber,
				episodes: data[seasonNumber - 1].episodes.map((episode) => {
					return {
						number: episode.number,
						link: episode.link_url
					};
				})
			});
		}

		return downloadList;
	}

	// Single season
	downloadList.push({
		season: firstSeasonNumber,
		episodes: data[firstSeasonNumber - 1].episodes.map((episode) => {
			return {
				number: episode.number,
				link: episode.link_url
			};
		})
	});

	return downloadList;
}
