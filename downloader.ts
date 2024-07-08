import progressBar from "./progressIndicator";

export default async function download(URL: string) {
	const response = await fetch(URL);

	console.log("Downloading...");

	// Throw error if problem with fetching
	if (!response.ok) throw new Error("Problem with downloading content.");

	// Get content length
	const contentLength = response.headers.get("Content-Length") as string;
	const contentLengthMb = Math.floor(
		Number.parseInt(contentLength) / 1024 / 1024
	);

	// Variable for received bits
	let receivedLength = 0;

	// Start reader for response
	const reader =
		response?.body?.getReader() as ReadableStreamDefaultReader<Uint8Array>;

	// Start progress bar
	progressBar.start(contentLengthMb, 0, {
		speed: "N/A",
	});

	// TODO: Add download speed indicator
	while (true) {
		// Init chunks reader
		const { done, value } = await reader.read();

		// Break loop if there are no more chunks
		if (done) {
			break;
		}

		// Summarize received bits
		receivedLength += value.length;

		// Calculate current progress
		const progress = Math.floor(
			(receivedLength / Number.parseInt(contentLength)) * contentLengthMb
		);

		// Update progress indicator
		progressBar.update(progress);
	}

	// Release reader
	reader.releaseLock();
}
