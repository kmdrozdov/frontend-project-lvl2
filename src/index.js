import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import formatter from './formatter/index.js';
import parser from './parser.js';

const getSortedNodeNames = (firstContent, secondContent) => (
  _.union(Object.keys(firstContent), Object.keys(secondContent)).sort()
);

const getDiffTree = (firstContent, secondContent) => {
  const sortedNodeNames = getSortedNodeNames(firstContent, secondContent);

  return sortedNodeNames.map((nodeName) => {
    const hasNodeInFirstContent = _.has(firstContent, nodeName);
    const hasNodeInSecondContent = _.has(secondContent, nodeName);

    if (hasNodeInFirstContent && hasNodeInSecondContent) {
      if (typeof firstContent[nodeName] === 'object' && typeof secondContent[nodeName] === 'object') {
        return {
          name: nodeName,
          children: getDiffTree(firstContent[nodeName], secondContent[nodeName]),
        };
      }

      if (firstContent[nodeName] === secondContent[nodeName]) {
        return {
          name: nodeName,
          value: firstContent[nodeName],
        };
      }
    }

    return [
      hasNodeInFirstContent ? {
        operation: 'deleted',
        name: nodeName,
        value: firstContent[nodeName],
      } : [],
      hasNodeInSecondContent ? {
        operation: 'added',
        name: nodeName,
        value: secondContent[nodeName],
      } : [],
    ];
  }).flat(2);
};

export default (firstFilePath, secondFilePath, parseFormat) => {
  const currDir = process.cwd();
  const firstResolvedFilePath = resolve(currDir, firstFilePath);
  const secondResolvedFilePath = resolve(currDir, secondFilePath);
  const firstContent = readFileSync(firstResolvedFilePath).toString('utf-8');
  const secondContent = readFileSync(secondResolvedFilePath).toString('utf-8');
  const fileType = extname(firstResolvedFilePath).substring(1);
  const parse = parser(fileType);
  const format = formatter(parseFormat);

  const firstParsedContent = parse(firstContent);
  const secondParsedContent = parse(secondContent);
  const diffTree = getDiffTree(firstParsedContent, secondParsedContent);

  return format(diffTree);
};
