import json from './json/index.js';
import plain from './plain/index.js';
import stylish from './stylish/index.js';

export default (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
