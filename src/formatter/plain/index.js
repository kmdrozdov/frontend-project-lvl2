const formatValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

export default (tree) => {
  const iter = (node, path) => (
    node.flatMap(([operand, key, value]) => {
      const currPath = path === '' ? key : `${path}.${key}`;
      if (Array.isArray(value)) {
        return iter(value, currPath);
      }

      if (operand !== ' ') {
        return {
          currPath,
          value,
          action: operand === '+' ? 'added with value' : 'deleted',
        };
      }

      return [];
    })
  );
  const flattenedTreeWithFullPaths = iter(tree, '');

  const preparedObj = flattenedTreeWithFullPaths.reduce(
    (acc, { currPath, action, value }) => {
      const preparedAction = acc[currPath] ? 'changed from' : action;
      const preparedValue = acc[currPath] ? [...acc[currPath].value, value] : [value];

      return { ...acc, [currPath]: { action: preparedAction, value: preparedValue } };
    },
    {},
  );
  const result = [];

  for (let i = 0, { length } = Object.keys(preparedObj); i < length; i += 1) {
    const path = Object.keys(preparedObj)[i];
    const { action, value } = preparedObj[path];
    const [firstValue, secondValue] = value.map(formatValue);
    let preparedValue = '';

    if (value.length > 1) {
      preparedValue = ` ${firstValue} to ${secondValue}`;
    } else if (value.length && action !== 'deleted') {
      preparedValue = `: ${firstValue}`;
    }

    result.push(`Property '${path}' was ${action}${preparedValue}`);
  }

  return result.join('\n');
};
