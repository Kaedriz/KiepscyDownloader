/**
 * Generates an array of numbers from `startingNumber` to `startingNumber`.
 *
 * @param endingNumber - The end of the range.
 * @param startingNumber - The start of the range. (Default: 1)
 * @return An array of generated numbers.
 */
export function numberList(endingNumber: number, startingNumber: number = 1) {
	if (startingNumber < 1) {
		throw new Error('Starting number must be greater than 0');
	}

	if (startingNumber > endingNumber) {
		throw new Error('Ending number must be greater than starting number');
	}

	return Array.from(Array(endingNumber - startingNumber + 1), (_, index) => index + startingNumber);
}

/**
 * Returns the number of episodes in the specified season.
 *
 * @param seasonNumber - The number of the season.
 * @param data - The data object containing information about the seasons and episodes.
 * @return The number of episodes in the specified season.
 */
export function findNumberOfEpisodes(seasonNumber: number, data: any): number {
	if (seasonNumber < 1) {
		throw new Error('Season number must be greater than 0');
	}

	if (seasonNumber > data.length) {
		throw new Error('Season number is not present in the data source');
	}
	
	return data[seasonNumber - 1].episodes.length;
}
