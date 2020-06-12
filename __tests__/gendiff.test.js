import { describe, expect, test } from '@jest/globals';
import { join } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import genDiff from '../src/index.js';

const getFixturesPath = (filename) => join('__fixtures__', filename);
const readFile = (fileName) => readFileSync(getFixturesPath(fileName), 'utf-8');
const cartesian = (...arrays) => _.reduce(
  arrays,
  (acc, currElem) => _.flatten(
    _.map(acc, (x) => _.map(currElem, (y) => x.concat([y]))),
  ),
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

      expect(genDiff(beforeFile, afterFile, format)).toBe(resultContent);
    },
  );
});
