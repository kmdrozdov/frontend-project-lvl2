import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import formatter from './formatter/index.js';
import parser from './parser.js';

const getDiffTree = (content1, content2) => {
  const sortedNodeNames = _.uniq([...Object.keys(content1), ...Object.keys(content2)]).sort();

  return sortedNodeNames.reduce(
    (acc, key) => {
      if (typeof content1[key] === 'object' && typeof content2[key] === 'object') {
        return [...acc, {
          name: key,
          children: getDiffTree(content1[key], content2[key]),
        }];
      }

      if (content1[key] === content2[key]) {
        return [...acc, {
          name: key,
          value: content1[key],
        }];
      }

      return [
        ...acc,
        typeof content1[key] !== 'undefined' ? {
          operation: 'deleted',
          name: key,
          value: content1[key],
        } : [],
        typeof content2[key] !== 'undefined' ? {
          operation: 'added',
          name: key,
          value: content2[key],
        } : [],
      ];
    },
    [],
  ).flat();
};

export default (filePath1, filePath2, parseFormat) => {
  const currDir = process.cwd();
  const resolvedFilePath1 = resolve(currDir, filePath1);
  const resolvedFilePath2 = resolve(currDir, filePath2);
  const content1 = readFileSync(resolvedFilePath1).toString('utf-8');
  const content2 = readFileSync(resolvedFilePath2).toString('utf-8');
  const fileType = extname(resolvedFilePath1).substring(1);
  const parse = parser(fileType);
  const format = formatter(parseFormat);

  const parsedContent1 = parse(content1);
  const parsedContent2 = parse(content2);
  const diffTree = getDiffTree(parsedContent1, parsedContent2);

  return format(diffTree);
};
