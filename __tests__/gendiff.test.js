import { describe, expect, test } from '@jest/globals';
import { join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const getFixturesPath = (filename) => join('__fixtures__', filename);
const readFile = (fileName) => readFileSync(getFixturesPath(fileName), 'utf-8');

const afterJSONFileName = 'after.json';
const beforeJSONFileName = 'before.json';
const afterYAMLFileName = 'after.yml';
const beforeYAMLFileName = 'before.yml';
const afterINIFileName = 'after.ini';
const beforeINIFileName = 'before.ini';
const jsonResultFileName = 'result.json';
const plainResultFileName = 'plain_result.txt';
const stylishResultFileName = 'stylish_result.txt';

const cases = [
  ['stylish', beforeJSONFileName, afterJSONFileName, stylishResultFileName],
  ['stylish', beforeYAMLFileName, afterYAMLFileName, stylishResultFileName],
  ['stylish', beforeINIFileName, afterINIFileName, stylishResultFileName],
  ['plain', beforeJSONFileName, afterJSONFileName, plainResultFileName],
  ['plain', beforeYAMLFileName, afterYAMLFileName, plainResultFileName],
  ['plain', beforeINIFileName, afterINIFileName, plainResultFileName],
  ['json', beforeJSONFileName, afterJSONFileName, jsonResultFileName],
  ['json', beforeYAMLFileName, afterYAMLFileName, jsonResultFileName],
  ['json', beforeINIFileName, afterINIFileName, jsonResultFileName],
];

describe('Main cases', () => {
  test.each(cases)(
    'Case for "%s" format with "%s" and "%s" files',
    (format, beforeFileName, afterFileName, resultFileName) => {
      const beforeFile = getFixturesPath(beforeFileName);
      const afterFile = getFixturesPath(afterFileName);
      const resultContent = readFile(resultFileName);

      expect(genDiff(beforeFile, afterFile, format)).toBe(resultContent);
    },
  );
});
