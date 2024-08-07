import { expect, test, describe } from 'bun:test';

import { numberList } from './utils';
import translateToDownloadList from '../translateToDownloadList';

console.log('Tests for translation interface for interpretation layer');

describe('Multiple episodes range', () => {
	test('User input exceeds number of episodes in season', () => {
		expect(() =>
			translateToDownloadList({
				First_Season_Number: '5',
				First_Episode_Number: '8',
				Second_Season_Number: undefined,
				Second_Episode_Number: '24'
			})
		);
	});

	// S1E1-E3
	test('Multiple episodes in the same season', () => {
		expect(
			translateToDownloadList({
				First_Season_Number: '1',
				First_Episode_Number: '1',
				Second_Season_Number: undefined,
				Second_Episode_Number: '3'
			})
		).toEqual([
			{
				season: 1,
				episodes: numberList(1, 3).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			}
		]);
	});

	// S3E4-E6
	test('Multiple episodes in the same season, starting from middle of the season', () => {
		expect(
			translateToDownloadList({
				First_Season_Number: '3',
				First_Episode_Number: '4',
				Second_Season_Number: undefined,
				Second_Episode_Number: '6'
			})
		).toEqual([
			{
				season: 3,
				episodes: numberList(4, 6).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			}
		]);
	});

	test.todo('Multiple episodes across seasons', () => {
		expect(
			translateToDownloadList({
				First_Season_Number: '1',
				First_Episode_Number: '3',
				Second_Season_Number: '2',
				Second_Episode_Number: '6'
			})
		).toEqual([
			{
				season: 1,
				episodes: numberList(3, 38).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			},
			{
				season: 2,
				episodes: numberList(1, 6).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			}
		]);
	});
});

describe('Episodes', () => {
	// S1E1
	test('Single episode #1', () => {
		expect(
			translateToDownloadList({
				First_Season_Number: '1',
				First_Episode_Number: '1',
				Second_Season_Number: undefined,
				Second_Episode_Number: undefined
			})
		).toEqual([
			{
				season: 1,
				episodes: [
					{
						number: 1,
						link: expect.any(String)
					}
				]
			}
		]);
	});

	// S3E5
	test('Single episode #2', () => {
		expect(
			translateToDownloadList({
				First_Season_Number: '4',
				First_Episode_Number: '7',
				Second_Season_Number: undefined,
				Second_Episode_Number: undefined
			})
		).toEqual([
			{
				season: 4,
				episodes: [
					{
						number: 7,
						link: expect.any(String)
					}
				]
			}
		]);
	});
});

describe('Multiple seasons range', () => {
	// S1-S2
	test('Test #1', () => {
		expect(
			translateToDownloadList({
				First_Season_Number: '1',
				First_Episode_Number: undefined,
				Second_Season_Number: '2',
				Second_Episode_Number: undefined
			})
		).toEqual([
			{
				season: 1,
				episodes: numberList(1, 38).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			},
			{
				season: 2,
				episodes: numberList(1, 38).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			}
		]);
	});

	// S3-S5
	test('Test #2', () => {
		expect(
			translateToDownloadList({
				First_Season_Number: '3',
				First_Episode_Number: undefined,
				Second_Season_Number: '5',
				Second_Episode_Number: undefined
			})
		).toEqual([
			{
				season: 3,
				episodes: numberList(1, 34).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			},
			{
				season: 4,
				episodes: numberList(1, 23).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			},
			{
				season: 5,
				episodes: numberList(1, 21).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			}
		]);
	});
});

describe('Seasons', () => {
	// S1
	test('Test #1', () => {
		expect(
			translateToDownloadList({
				First_Season_Number: '1',
				First_Episode_Number: undefined,
				Second_Season_Number: undefined,
				Second_Episode_Number: undefined
			})
		).toEqual([
			{
				season: 1,
				episodes: numberList(1, 38).map((number) => {
					return {
						number,
						link: expect.any(String)
					};
				})
			}
		]);
	});
});
