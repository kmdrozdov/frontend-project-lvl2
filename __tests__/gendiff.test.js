import { beforeAll, expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

let after;
let before;

beforeAll(() => {
  after = './__fixtures__/after.json';
  before = './__fixtures__/before.json';
});

test('Different files', () => {
  const result = `{
    host: hexlet.io
  + timeout: 50
  - timeout: 20
  + proxy: 123.234.53.22
  + follow: false
  - verbose: true
}`;

  expect(gendiff(before, after)).toBe(result);
});

test('Same file', () => {
  const result = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;

  expect(gendiff(before, before)).toBe(result);
});
