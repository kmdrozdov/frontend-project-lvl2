import { beforeAll, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

let afterJSON;
let beforeJSON;
let afterYAML;
let beforeYAML;
let afterINI;
let beforeINI;

let jsonResult;
let stylishResult;
let plainResult;

beforeAll(() => {
  afterJSON = './__fixtures__/after.json';
  beforeJSON = './__fixtures__/before.json';
  afterYAML = './__fixtures__/after.yml';
  beforeYAML = './__fixtures__/before.yml';
  afterINI = './__fixtures__/after.ini';
  beforeINI = './__fixtures__/before.ini';

  jsonResult = readFileSync('./__fixtures__/result.json', 'utf-8');
  plainResult = readFileSync('./__fixtures__/plain_result.txt', 'utf-8');
  stylishResult = readFileSync('./__fixtures__/stylish_result.txt', 'utf-8');
});

test('JSON, stylish format', () => {
  expect(genDiff(beforeJSON, afterJSON, 'stylish')).toBe(stylishResult);
});

test('YAML, stylish format', () => {
  expect(genDiff(beforeYAML, afterYAML, 'stylish')).toBe(stylishResult);
});

test('INI, stylish format', () => {
  expect(genDiff(beforeINI, afterINI, 'stylish')).toBe(stylishResult);
});

test('JSON, plain format', () => {
  expect(genDiff(beforeJSON, afterJSON, 'plain')).toBe(plainResult);
});

test('YAML, plain format', () => {
  expect(genDiff(beforeYAML, afterYAML, 'plain')).toBe(plainResult);
});

test('INI, plain format', () => {
  expect(genDiff(beforeINI, afterINI, 'plain')).toBe(plainResult);
});

test('JSON, json format', () => {
  expect(genDiff(beforeJSON, afterJSON, 'json')).toBe(jsonResult);
});

test('YAML, json format', () => {
  expect(genDiff(beforeYAML, afterYAML, 'json')).toBe(jsonResult);
});

test('INI, json format', () => {
  expect(genDiff(beforeINI, afterINI, 'json')).toBe(jsonResult);
});
