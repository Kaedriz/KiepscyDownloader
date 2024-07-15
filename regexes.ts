export const illegalCharactersRegex = /[^SE\d\-]/i;

export const multipleEpisodesRangeRegex =
	/[S](?<First_Season_Number>[0-9]{1,2})[E](?<First_Episode_Number>[0-9]{1,2})(?:[-][S](?<Second_Season_Number>[0-9]{1,2}))?(?:[E](?<Second_Episode_Number>[0-9]{1,2}))?$/i;

export const episodeRegex = /[S](?<First_Season_Number>[0-9]{1,2})[E](?<First_Episode_Number>[0-9]{1,2})$/i;

export const multipleSeasonsRangeRegex =
	/[S](?<First_Season_Number>[0-9]{1,2})-?([S](?<Second_Season_Number>[0-9]{1,2}))?$/i;

export const seasonsRegex = /[S](?<First_Season_Number>[0-9]{1,2})$/i;
