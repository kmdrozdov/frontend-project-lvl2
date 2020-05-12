import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import formatterFabric from './formatter/index.js';
import parser from './parser/index.js';

const genDiffTree = (tree1, tree2) => {
  const mergedKeys = _.uniq([...Object.keys(tree1), ...Object.keys(tree2)]).sort();

  return mergedKeys.reduce(
    (acc, key) => {
      if (typeof tree1[key] === 'object' && typeof tree2[key] === 'object') {
        acc.push([' ', key, genDiffTree(tree1[key], tree2[key])]);
      } else if (tree1[key] === tree2[key]) {
        acc.push([' ', key, tree1[key]]);
      } else {
        if (typeof tree1[key] !== 'undefined') {
          acc.push(['-', key, tree1[key]]);
        }

        if (typeof tree2[key] !== 'undefined') {
          acc.push(['+', key, tree2[key]]);
        }
      }

      return acc;
    },
    [],
  );
};

export default (filepath1, filepath2, format) => {
  const currDir = process.cwd();
  const resolvedPathToFile1 = resolve(currDir, filepath1);
  const resolvedPathToFile2 = resolve(currDir, filepath2);
  const file1 = readFileSync(resolvedPathToFile1).toString('utf-8');
  const file2 = readFileSync(resolvedPathToFile2).toString('utf-8');
  const extension = extname(resolvedPathToFile1);
  const parserFunc = parser(extension);
  const formatter = formatterFabric(format);

  const parsedFile1 = parserFunc(file1);
  const parsedFile2 = parserFunc(file2);
  const diffTree = genDiffTree(parsedFile1, parsedFile2);

  return formatter(diffTree);
};
