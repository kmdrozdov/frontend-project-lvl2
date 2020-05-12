import { beforeAll, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

let afterJSON;
let beforeJSON;
let afterYAML;
let beforeYAML;
let afterINI;
let beforeINI;
let result;

beforeAll(() => {
  afterJSON = './__fixtures__/after.json';
  beforeJSON = './__fixtures__/before.json';
  afterYAML = './__fixtures__/after.yml';
  beforeYAML = './__fixtures__/before.yml';
  afterINI = './__fixtures__/after.ini';
  beforeINI = './__fixtures__/before.ini';

  result = readFileSync('./__fixtures__/result.txt', 'utf-8');
});

test('JSON', () => {
  expect(genDiff(beforeJSON, afterJSON, 'stylish')).toBe(result);
});

test('YAML', () => {
  expect(genDiff(beforeYAML, afterYAML, 'stylish')).toBe(result);
});

test('INI', () => {
  expect(genDiff(beforeINI, afterINI, 'stylish')).toBe(result);
});
