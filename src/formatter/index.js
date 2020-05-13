import plain from './plain/index.js';
import stylish from './stylish/index.js';

export default (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
