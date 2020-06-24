const getNodeIndent = (depth) => {
  const stylishIndent = 2;
  return stylishIndent + (depth * stylishIndent * 2);
};

const formatStyledNode = (indent, operation, name, value) => `${' '.repeat(indent)}${operation} ${name}: ${value}`;

const formatStyledObjectValues = (values, indent) => `{\n${values}\n${' '.repeat(indent - 2)}}`;

const formatValue = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }

  const [key, val] = Object.entries(value)[0];
  const indent = getNodeIndent(depth + 1);
  const styledValue = formatStyledNode(indent, ' ', key, val);

  return formatStyledObjectValues(styledValue, indent);
};

const stylish = (tree, depth = 0) => {
  const indent = getNodeIndent(depth);
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
            formatStyledNode(indent, '-', name, formatValue(oldValue, depth)),
            formatStyledNode(indent, '+', name, formatValue(newValue, depth)),
          ];
        case 'nested':
          return formatStyledNode(indent, ' ', name, stylish(children, depth + 1));
        case 'unchanged':
          return formatStyledNode(indent, ' ', name, formatValue(value, depth));
        case 'added':
          return formatStyledNode(indent, '+', name, formatValue(value, depth));
        case 'deleted':
          return formatStyledNode(indent, '-', name, formatValue(value, depth));
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    },
  );

  return formatStyledObjectValues(styledTree.join('\n'), indent);
};

export default stylish;
