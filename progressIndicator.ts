import cliProgress from "cli-progress";

// Create progress bar
const progressBar = new cliProgress.SingleBar(
	{},
	cliProgress.Presets.shades_classic
);

export default progressBar;
