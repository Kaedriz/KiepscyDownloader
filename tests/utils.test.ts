import { expect, test, describe } from 'bun:test';

import { numberList, findNumberOfEpisodes } from './utils';
import data from '../source.json';

console.log('Tests for utility functions');

describe('numberList', () => {
	test('Starting number less than 1', () => {
		expect(() => numberList(3, 0)).toThrow();
	})

	test('Simple list, starting from default value (1)', () => {
		expect(numberList(3)).toEqual([1, 2, 3]);
	});

	test('List with starting value #1', () => {
		expect(numberList(3, 5)).toEqual([5, 6, 7]);
	});

	test('List with starting value #2', () => {
		expect(numberList(7, 3)).toEqual([3, 4, 5, 6, 7, 8, 9]);
	});
});

describe('findNumberOfEpisodes', () => {
	test('Season number less than 1', () => {
		expect(() => findNumberOfEpisodes(0, data)).toThrow();
	});

	test('Season number lesser than number of seasons', () => {
		expect(() => findNumberOfEpisodes(45, data)).toThrow();
	});

	test('Test episodes count #1', () => {
		expect(findNumberOfEpisodes(1, data)).toEqual(38);
	});

	test('Test episodes count #2', () => {
		expect(findNumberOfEpisodes(14, data)).toEqual(15);
	});
})