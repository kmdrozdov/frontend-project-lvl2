import ini from 'ini';
import yaml from 'js-yaml';

export default (dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse;
    case 'yml':
      return yaml.safeLoad;
    case 'ini':
      return ini.parse;
    default:
      throw new Error(`Unknown data type: ${dataType}`);
  }
};
