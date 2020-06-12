import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

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
