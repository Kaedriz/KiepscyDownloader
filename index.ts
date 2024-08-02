import { input, interpret } from './interpreter';
import instructions from './instructions';
import download from './downloader';
import { seasonList } from './types';

// Read instructions to the user
instructions();

// Input from user
const userInput = await input();

let links: seasonList[];

try {
	links = interpret(userInput);
	console.log('To download: ');
	console.log(links);
} catch (error: any) {
	console.error('Error:', error.message);
	process.exit(1);
}

// TODO: Add organizing to folders
for (const link of links) {
	for (const episode of link.episodes) {
		await download(
			episode.link
			// TODO: Change to func, to allow for more flexibility
			, `S${link.season}E${episode.number}`
		);
	}
}

process.exit(0);
