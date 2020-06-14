const formatOperation = (type) => {
  switch (type) {
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    case 'changed':
    case 'unchanged':
    case 'nested':
      return ' ';
    default:
      throw new Error(`Unknown operation: ${type}`);
  }
};


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

  const styledTree = tree.reduce(
    (
      acc,
      {
        name,
        value,
        type,
        children,
      },
    ) => {
      const formattedOperation = formatOperation(type);

      if (type === 'changed') {
        const { oldValue, newValue } = value;
        return [
          ...acc,
          `${' '.repeat(indent)}- ${name}: ${formatValue(oldValue)}`,
          `${' '.repeat(indent)}+ ${name}: ${formatValue(newValue)}`,
        ];
      }

      if (type === 'nested') {
        return [
          ...acc,
          `${' '.repeat(indent)}${formattedOperation} ${name}: ${stylish(children, indent + 4)}`,
        ];
      }

      return [...acc, `${' '.repeat(indent)}${formattedOperation} ${name}: ${formatValue(value)}`];
    },
    [],
  );

  return `{\n${styledTree.join('\n')}\n${' '.repeat(indent - 2)}}`;
};

export default stylish;
