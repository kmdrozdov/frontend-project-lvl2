import stylish from '../stylish/index.js';

export default (format) => {
  let func;

  if (format === 'stylish') {
    func = stylish;
  } else {
    throw new Error(`Unknown format: ${format}`);
  }

  return func;
};
