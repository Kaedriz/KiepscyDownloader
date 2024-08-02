# Kiepscy Downloader (Work in Progress)
CLI used to download episodes of popular polish series "Świat według Kiepskich" and organize them.

All links used to download are publicly accessible and stored in JSON format with small metadata in `source.json`

# Goal
- [ ] Fully working downloading
    - [ ] Downloading of selected episodes
    - [ ] Downloading of entire season
- [ ] Fully working organizing
	- [ ] Customizable organization
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
