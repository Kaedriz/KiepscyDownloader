/**
 * Prints instructions to the console for downloading episodes of a series.
 *
 * This function displays a welcome message and provides information on how to
 * specify the seasons and episodes to download. It includes examples of different
 * formats that can be used to specify the episodes.
 *
 * @return This function does not return a value.
 */
export default function instructions() {
	process.stdout.write(`Hi!
		
Use this format for specifying the seasons and episodes to download:
- S{season number} for full seasons
- S{season number}E{episode number} for selected episode
- S{season number}E{episode number}-E{episode number} for selected episodes in range

Examples:
S2 - Single season
S3 S4 S5 - Multiple seasons
S10-S14 - Multiple seasons range
S3E1 S3E2 S3E3 - Multiple episodes
S3E1-E12 S4E1-S4E5 - Multiple episodes range spanning across seasons

Your input: `);
}
