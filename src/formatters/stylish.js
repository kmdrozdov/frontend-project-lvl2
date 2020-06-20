const formatStyledNode = (indent, operation, name, value) => `${' '.repeat(indent)}${operation} ${name}: ${value}`;

const stylish = (tree, indent = 2) => {
  const formatValue = (value) => {
    if (typeof value === 'object') {
      const [key, val] = Object.entries(value)[0];
      const node = {
        name: key,
        type: 'unchanged',
        value: val,
      };

      return stylish([node], indent + 4);
    }

    return value;
  };

  const styledTree = tree.flatMap(
    ({
      name,
      value,
      type,
      children,
      oldValue,
      newValue,
    }) => {
      switch (type) {
        case 'changed':
          return [
            formatStyledNode(indent, '-', name, formatValue(oldValue)),
            formatStyledNode(indent, '+', name, formatValue(newValue)),
          ];
        case 'nested':
          return formatStyledNode(indent, ' ', name, stylish(children, indent + 4));
        case 'unchanged':
          return formatStyledNode(indent, ' ', name, formatValue(value));
        case 'added':
          return formatStyledNode(indent, '+', name, formatValue(value));
        case 'deleted':
          return formatStyledNode(indent, '-', name, formatValue(value));
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    },
  );

  return `{\n${styledTree.join('\n')}\n${' '.repeat(indent - 2)}}`;
};

export default stylish;
