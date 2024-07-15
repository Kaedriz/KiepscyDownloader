/**
 * Generates an array of numbers from 1 to the specified input.
 *
 * @param input - The upper limit of the range.
 * @return An array of generated numbers.
 */
export function numberList(input: number) {
	return Array.from({ length: input }, (_, index) => index + 1);
}

/**
 * Returns the number of episodes in the specified season.
 *
 * @param seasonNumber - The number of the season.
 * @param data - The data object containing information about the seasons and episodes.
 * @return The number of episodes in the specified season.
 */
export function findNumberOfEpisodes(seasonNumber: number, data: any): number {
	return data[seasonNumber - 1].episodes.length;
}
