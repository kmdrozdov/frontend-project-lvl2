import { describe, expect, test } from '@jest/globals';
import { join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const getFixturesPath = (filename) => join('__fixtures__', filename);
const readFile = (fileName) => readFileSync(getFixturesPath(fileName), 'utf-8');

const firstFileNames = ['before.json', 'before.yml', 'before.ini'];
const secondFileNames = ['after.json', 'after.yml', 'after.ini'];

const stylishContent = readFile('stylish_result.txt');
const plainContent = readFile('plain_result.txt');
const jsonContent = readFile('json_result.txt');
const cases = firstFileNames.flatMap(
  (firstFileName) => secondFileNames.map((secondFileName) => [firstFileName, secondFileName]),
);

describe('Main cases', () => {
  test.each(cases)(
    'Case for "%s" and "%s" files',
    (firstFileName, secondFileName) => {
      const firstFilePath = getFixturesPath(firstFileName);
      const secondFilePath = getFixturesPath(secondFileName);

      expect(genDiff(firstFilePath, secondFilePath, 'stylish')).toEqual(stylishContent);
      expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(plainContent);
      expect(genDiff(firstFilePath, secondFilePath, 'json')).toEqual(jsonContent);
    },
  );
});
