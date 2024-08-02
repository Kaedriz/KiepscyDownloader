import progressBar from './progressIndicator';

export default async function download(URL: string, fileName: string) {
	const response = await fetch(URL);

	console.log(`Downloading ${fileName} from ${URL}.`);

	// Throw error if problem with fetching
	if (!response.ok) throw new Error('Problem with downloading content.');

	// Get content length
	const contentLength = response.headers.get('Content-Length') as string;
	const contentLengthMb = Math.floor(Number.parseInt(contentLength) / 1024 / 1024);

	// Variable for received bits
	let receivedLength = 0;

	// Start reader for response
	const reader = response?.body?.getReader() as ReadableStreamDefaultReader<Uint8Array>;

	// Start progress bar
	progressBar.start(contentLengthMb, 0, {
		speed: 'N/A'
	});
	
	const file = Bun.file(`${fileName}.mp4`);
	const writeStream = file.writer();

	// TODO: Add download speed indicator
	while (true) {
		// Init chunks reader
		const { done, value } = await reader.read();

		// Break loop if there are no more chunks
		if (done) {
			break;
		}

		writeStream.write(value);

		// Summarize received bits
		receivedLength += value.length;

		// Calculate current progress
		const progress = Math.floor((receivedLength / Number.parseInt(contentLength)) * contentLengthMb);

		// Update progress indicator
		progressBar.update(progress);
	}

	// Close file writing stream
	writeStream.end();

	// Release reader
	reader.releaseLock();
}
