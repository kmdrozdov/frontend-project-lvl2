import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import format from './formatters/index.js';
import parse from './parser.js';

const getSortedNodeNames = (firstContent, secondContent) => (
  _.union(Object.keys(firstContent), Object.keys(secondContent)).sort()
);

const getDiffTree = (firstContent, secondContent) => {
  const sortedNodeNames = getSortedNodeNames(firstContent, secondContent);

  return sortedNodeNames.flatMap((nodeName) => {
    const hasNodeInFirstContent = _.has(firstContent, nodeName);
    const hasNodeInSecondContent = _.has(secondContent, nodeName);

    if (hasNodeInFirstContent && !hasNodeInSecondContent) {
      return {
        name: nodeName,
        type: 'deleted',
        value: firstContent[nodeName],
      };
    }

    if (hasNodeInSecondContent && !hasNodeInFirstContent) {
      return {
        name: nodeName,
        type: 'added',
        value: secondContent[nodeName],
      };
    }

    if (typeof firstContent[nodeName] === 'object' && typeof secondContent[nodeName] === 'object') {
      return {
        name: nodeName,
        type: 'nested',
        children: getDiffTree(firstContent[nodeName], secondContent[nodeName]),
      };
    }

    if (firstContent[nodeName] === secondContent[nodeName]) {
      return {
        name: nodeName,
        type: 'unchanged',
        value: firstContent[nodeName],
      };
    }

    return {
      name: nodeName,
      type: 'changed',
      value: {
        oldValue: firstContent[nodeName],
        newValue: secondContent[nodeName],
      },
    };
  });
};

export default (firstFilePath, secondFilePath, parseFormat) => {
  const currDir = process.cwd();
  const firstResolvedFilePath = resolve(currDir, firstFilePath);
  const secondResolvedFilePath = resolve(currDir, secondFilePath);
  const firstContent = readFileSync(firstResolvedFilePath).toString('utf-8');
  const secondContent = readFileSync(secondResolvedFilePath).toString('utf-8');
  const firstFileType = extname(firstResolvedFilePath).substring(1);
  const secondFileType = extname(secondResolvedFilePath).substring(1);

  const firstParsedContent = parse(firstFileType)(firstContent);
  const secondParsedContent = parse(secondFileType)(secondContent);
  const diffTree = getDiffTree(firstParsedContent, secondParsedContent);

  return format(parseFormat)(diffTree);
};
