import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import formatterFabric from './formatter/index.js';
import parserFabric from './parser.js';

const getDiffTree = (tree1, tree2) => {
  const treePathNames = _.uniq([...Object.keys(tree1), ...Object.keys(tree2)]).sort();

  return treePathNames.reduce(
    (acc, key) => {
      if (typeof tree1[key] === 'object' && typeof tree2[key] === 'object') {
        return [...acc, {
          name: key,
          children: getDiffTree(tree1[key], tree2[key]),
        }];
      }

      if (tree1[key] === tree2[key]) {
        return [...acc, {
          name: key,
          value: tree1[key],
        }];
      }

      return [
        ...acc,
        typeof tree1[key] !== 'undefined' ? {
          operation: '-',
          name: key,
          value: tree1[key],
        } : [],
        typeof tree2[key] !== 'undefined' ? {
          operation: '+',
          name: key,
          value: tree2[key],
        } : [],
      ];
    },
    [],
  ).flat();
};

export default (filepath1, filepath2, format) => {
  const currDir = process.cwd();
  const resolvedPathToFile1 = resolve(currDir, filepath1);
  const resolvedPathToFile2 = resolve(currDir, filepath2);
  const file1 = readFileSync(resolvedPathToFile1).toString('utf-8');
  const file2 = readFileSync(resolvedPathToFile2).toString('utf-8');
  const fileType = extname(resolvedPathToFile1).substring(1);
  const parser = parserFabric(fileType);
  const formatter = formatterFabric(format);

  const parsedFile1 = parser(file1);
  const parsedFile2 = parser(file2);
  const diffTree = getDiffTree(parsedFile1, parsedFile2);

  return formatter(diffTree);
};
