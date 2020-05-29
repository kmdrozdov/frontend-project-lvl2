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
    node.flatMap(({ name, value, children, operation = ' ' }) => {
      const currPath = path === '' ? name : `${path}.${name}`;
      if (children) {
        return iter(children, currPath);
      }

      if (operation !== ' ') {
        return {
          currPath,
          value,
          action: operation === '+' ? 'added with value' : 'deleted',
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

  const result = Object.entries(preparedObj).reduce(
    (acc, [key, { action, value }]) => {
      const [firstValue, secondValue] = value.map(formatValue);
      if (value.length > 1) {
        return [...acc, `Property '${key}' was ${action} ${firstValue} to ${secondValue}`];
      }

      if (value.length && action !== 'deleted') {
        return [...acc, `Property '${key}' was ${action}: ${firstValue}`];
      }

      return [...acc, `Property '${key}' was ${action}`];
    },
    [],
  );

  return result.join('\n');
};
