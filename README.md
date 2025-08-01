# Kiepscy Downloader (Work in Progress)
CLI used to download episodes of popular polish series "Świat według Kiepskich" and organize them.

> [!WARNING]  
> This no longer works as of 28.07.2025.
>
> Links that directed to videos are no longer working, and as this tool relies on that, it no longer works as well.

All links used to download are publicly accessible and stored in JSON format with small metadata in `source.json`

# Goal
- [ ] Fully working downloading
    - [X] Downloading of individual episodes
    - [ ] Downloading of episodes range
    - [ ] Downloading of episodes range, across seasons
    - [X] Downloading of entire seasons
    - [ ] Downloading of entire seasons range
- [ ] Fully working organizing
	- [ ] Customizable organization
- [ ] Options (ex. change parallelization of download)
- [ ] Web UI _(not confirmed)_
- [ ] Standalone executable
- [ ] Health check utility for links

# Using
1. Clone this repo somewhere
2. Simply run `bun index.ts`, _for now, later there will be standalone executable_

## Examples
`S2` - Single seasons  
`S3 S4 S5` - Multiple seasons  
`S10-S14` - Multiple seasons range  
`S3E1 S3E2 S3E3` - Multiple episodes  
`S3E1-E12 S4E1-S4E5` - Multiple episodes range within multiple seasons  
`S6E5-S8E7` - Multiple episodes range spanning across seasons _(maybe after release)_

# Contributions
- [Humberd/kiepscy-downloader](https://github.com/Humberd/kiepscy-downloader) - for original links, over time several were replaced as they were broken.
- ATM Group - For creating such a funny series
