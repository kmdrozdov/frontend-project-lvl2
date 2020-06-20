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
    (format, beforeFileName, afterFileName) => {
      const beforeFile = getFixturesPath(beforeFileName);
      const afterFile = getFixturesPath(afterFileName);
      const resultContent = readFile(`${format}_result.txt`);
      const result = format === 'json' ? JSON.parse(resultContent) : resultContent;

      expect(genDiff(beforeFile, afterFile, format)).toEqual(result);
    },
  );
});
