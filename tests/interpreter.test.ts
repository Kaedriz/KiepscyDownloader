import { expect, test, describe } from 'bun:test';

import { numberList } from './utils';
import { interpret } from '../interpreter';

console.log('Tests for interpretation layer between user input & downloading');

// Tests for detecting illegal characters
describe('Illegal characters', () => {
	test('Illegal characters #1', () => {
		// expect(interpret('S1E1G')).toThrow();
		expect(() => interpret('S1E1G')).toThrow();
	});

	test('Illegal characters #2', () => {
		expect(() => interpret('S1F')).toThrow();
	});

	test('Illegal characters #3', () => {
		expect(() => interpret('S6EG5')).toThrow();
	});

	test('Illegal characters #4', () => {
		expect(() => interpret('S3E2-S4E5H')).toThrow();
	});
});

// Tests for detecting invalid syntax
describe('Invalid syntax', () => {
	test('No season', () => {
		expect(() => interpret('E1')).toThrow();
	});

	test('No season number', () => {
		expect(() => interpret('SE1')).toThrow();
	});

	test('No episode number', () => {
		expect(() => interpret('S3E')).toThrow();
	});

	test('Dash without second value', () => {
		expect(() => interpret('S6E1-')).toThrow();
	});

	test('Space around dash, invalid syntax, but for now somewhat supported', () => {
		expect(interpret('S5E14    - S5E17')).toEqual([
			{ season: 5, episodes: [14] },
			{ season: 5, episodes: [17] }
		]);
	});
});

// Test for multiple episodes range detection
describe('Multiple episodes range detection', () => {
	test('Test #1', () => {
		expect(interpret('S1E1-E2')).toEqual([{ season: 1, episodes: numberList(2) }]);
	});
});

// Test for episode detection
describe('Episode detection', () => {
	test('Test #1', () => {
		expect(interpret('S1E1')).toEqual([{ season: 1, episodes: numberList(1) }]);
	});
});

// Test for multiple seasons range detection
describe('Multiple seasons range detection', () => {
	test.todo('Test #1', () => {
		// expect(interpret('S1-S2')).not.toThrow();
	});
});

// Test for season detection
describe('Season detection', () => {
	test.todo('Test #1', () => {
		// expect(interpret('S1')).not.toThrow();
	});
});
