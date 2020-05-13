import { beforeAll, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

let afterJSON;
let beforeJSON;
let afterYAML;
let beforeYAML;
let afterINI;
let beforeINI;
let stylishResult;
let plainResult;

beforeAll(() => {
  afterJSON = './__fixtures__/after.json';
  beforeJSON = './__fixtures__/before.json';
  afterYAML = './__fixtures__/after.yml';
  beforeYAML = './__fixtures__/before.yml';
  afterINI = './__fixtures__/after.ini';
  beforeINI = './__fixtures__/before.ini';

  stylishResult = readFileSync('./__fixtures__/stylish_result.txt', 'utf-8');
  plainResult = readFileSync('./__fixtures__/plain_result.txt', 'utf-8');
});

test('JSON, stylish', () => {
  expect(genDiff(beforeJSON, afterJSON, 'stylish')).toBe(stylishResult);
});

test('YAML', () => {
  expect(genDiff(beforeYAML, afterYAML, 'stylish')).toBe(stylishResult);
});

test('INI', () => {
  expect(genDiff(beforeINI, afterINI, 'stylish')).toBe(stylishResult);
});

test('JSON, plain', () => {
  expect(genDiff(beforeJSON, afterJSON, 'plain')).toBe(plainResult);
});

test('YAML, plain', () => {
  expect(genDiff(beforeYAML, afterYAML, 'plain')).toBe(plainResult);
});

test('INI, plain', () => {
  expect(genDiff(beforeINI, afterINI, 'plain')).toBe(plainResult);
});
