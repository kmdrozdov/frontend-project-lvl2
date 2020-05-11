import { beforeAll, expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

let afterJSON;
let beforeJSON;
let afterYAML;
let beforeYAML;

beforeAll(() => {
  afterJSON = './__fixtures__/after.json';
  beforeJSON = './__fixtures__/before.json';
  afterYAML = './__fixtures__/after.yml';
  beforeYAML = './__fixtures__/before.yml';
});

test('Different files - JSON', () => {
  const result = `{
    host: hexlet.io
  + timeout: 50
  - timeout: 20
  + proxy: 123.234.53.22
  + follow: false
  - verbose: true
}`;

  expect(gendiff(beforeJSON, afterJSON)).toBe(result);
});

test('Same file - JSON', () => {
  const result = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;

  expect(gendiff(beforeJSON, beforeJSON)).toBe(result);
});

test('Different files - YAML', () => {
  const result = `{
    host: hexlet.io
  + timeout: 50
  - timeout: 20
  + proxy: 123.234.53.22
  + follow: false
  - verbose: true
}`;

  expect(gendiff(beforeYAML, afterYAML)).toBe(result);
});

test('Same file - YAML', () => {
  const result = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;

  expect(gendiff(beforeYAML, beforeYAML)).toBe(result);
});
