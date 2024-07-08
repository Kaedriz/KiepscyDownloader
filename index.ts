import { input, interpret } from './interpreter';
import instructions from './instructions';
import download from './downloader';

import data from './source.json';

// Read instructions to the user
instructions();

// Input from user
const userInput = await input();

const links = interpret(userInput);

// console.log("Downloading...");
await download(
	// "http://ipla-e1-78.pluscdn.pl/p/movies/8f/8fc6aa7d3808f476dee9b99722343b30.mp4"
	'http://cachefly.cachefly.net/100mb.test'
);

// const file = Bun.file("output/video.mp4");
// const writeStream = file.writer();

// writeStream.write(await response.arrayBuffer());
// writeStream.end();

process.exit(0);
