import { describe, expect, test } from '@jest/globals';
import { join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const getFixturesPath = (filename) => join('__fixtures__', filename);
const readFile = (fileName) => readFileSync(getFixturesPath(fileName), 'utf-8');

const afterJSON = getFixturesPath('after.json');
const beforeJSON = getFixturesPath('before.json');
const afterYAML = getFixturesPath('after.yml');
const beforeYAML = getFixturesPath('before.yml');
const afterINI = getFixturesPath('after.ini');
const beforeINI = getFixturesPath('before.ini');

const jsonResult = readFile('result.json');
const plainResult = readFile('plain_result.txt');
const stylishResult = readFile('stylish_result.txt');

const cases = [
  ['stylish', beforeJSON, afterJSON, stylishResult],
  ['stylish', beforeYAML, afterYAML, stylishResult],
  ['stylish', beforeINI, afterINI, stylishResult],
  ['plain', beforeJSON, afterJSON, plainResult],
  ['plain', beforeYAML, afterYAML, plainResult],
  ['plain', beforeINI, afterINI, plainResult],
  ['json', beforeJSON, afterJSON, jsonResult],
  ['json', beforeYAML, afterYAML, jsonResult],
  ['json', beforeINI, afterINI, jsonResult],
];

describe('Main cases', () => {
  test.each(cases)(
    'Case for "%s" format',
    (format, before, after, result) => {
      expect(genDiff(before, after, format)).toBe(result);
    },
  );
});
