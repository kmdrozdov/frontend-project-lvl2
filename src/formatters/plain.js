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
    node.flatMap(({
      name,
      value,
      type,
      children,
      oldValue,
      newValue,
    }) => {
      const currPath = path === '' ? name : `${path}.${name}`;
      switch (type) {
        case 'nested':
          return iter(children, currPath);
        case 'added':
          return `Property '${currPath}' was added with value: ${formatValue(value)}`;
        case 'deleted':
          return `Property '${currPath}' was deleted`;
        case 'changed':
          return `Property '${currPath}' was changed from ${formatValue(oldValue)} to ${formatValue(newValue)}`;
        default:
          return [];
      }
    })
  );
  const result = iter(tree, '');

  return result.join('\n');
};
