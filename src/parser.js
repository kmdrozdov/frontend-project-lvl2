import ini from 'ini';
import yaml from 'js-yaml';

export default (fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse;
    case 'yml':
      return yaml.safeLoad;
    case 'ini':
      return ini.parse;
    default:
      throw new Error(`Unknown extension: ${fileType}`);
  }
};
