import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import parser from './parser/index.js';

export default (filepath1, filepath2) => {
  const currDir = process.cwd();
  const resolvedPathToFile1 = resolve(currDir, filepath1);
  const resolvedPathToFile2 = resolve(currDir, filepath2);
  const file1 = readFileSync(resolvedPathToFile1).toString('utf-8');
  const file2 = readFileSync(resolvedPathToFile2).toString('utf-8');
  const extension = extname(resolvedPathToFile1);
  const parserFunc = parser(extension);

  const parsedFile1 = parserFunc(file1);
  const parsedFile2 = parserFunc(file2);

  const mergedKeys = _.uniq([...Object.keys(parsedFile1), ...Object.keys(parsedFile2)]);
  const reducedResults = mergedKeys.reduce(
    (acc, key) => {
      if (parsedFile1[key] === parsedFile2[key]) {
        acc.push(`  ${key}: ${parsedFile1[key]}`);
      } else {
        if (typeof parsedFile1[key] !== 'undefined') {
          acc.push(`+ ${key}: ${parsedFile1[key]}`);
        }

        if (typeof parsedFile2[key] !== 'undefined') {
          acc.push(`- ${key}: ${parsedFile2[key]}`);
        }
      }

      return acc;
    },
    [],
  );
  const diff = reducedResults.map((item) => `  ${item}`).join('\n');

  return `{\n${diff}\n}`;
};
