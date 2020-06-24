import { describe, expect, test } from '@jest/globals';
import { join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const getFixturesPath = (filename) => join('__fixtures__', filename);
const readFile = (fileName) => readFileSync(getFixturesPath(fileName), 'utf-8');
const cartesian = (...arrays) => arrays.reduce(
  (acc, currElem) => acc.flatMap((x) => currElem.map((y) => x.concat([y]))),
  [[]],
);

const cases = cartesian(
  ['stylish', 'plain', 'json'],
  ['before.json', 'before.yml', 'before.ini'],
  ['after.json', 'after.yml', 'after.ini'],
);

describe('Main cases', () => {
  test.each(cases)(
    'Case for "%s" format with "%s" and "%s" files',
    (format, firstFileName, secondFileName) => {
      const firstFilePath = getFixturesPath(firstFileName);
      const secondFilePath = getFixturesPath(secondFileName);
      const resultContent = readFile(`${format}_result.txt`);

      expect(genDiff(firstFilePath, secondFilePath, format)).toEqual(resultContent);
    },
  );
});
