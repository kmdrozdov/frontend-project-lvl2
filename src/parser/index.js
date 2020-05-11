import yaml from 'js-yaml';

export default (extension) => {
  let func;
  switch (extension) {
    case '.json':
      func = JSON.parse;
      break;
    case '.yml':
      func = yaml.safeLoad;
      break;
    default:
      throw new Error(`Unknown extension: ${extension}`);
  }

  return func;
};
