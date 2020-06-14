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
    }) => {
      const currPath = path === '' ? name : `${path}.${name}`;
      if (type === 'nested') {
        return iter(children, currPath);
      }

      if (type === 'added') {
        return `Property '${currPath}' was added with value: ${formatValue(value)}`;
      }

      if (type === 'deleted') {
        return `Property '${currPath}' was deleted`;
      }

      if (type === 'changed') {
        const { oldValue, newValue } = value;
        return `Property '${currPath}' was changed from ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      }

      return [];
    })
  );
  const result = iter(tree, '');

  return result.join('\n');
};
