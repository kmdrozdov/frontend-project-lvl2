const formatOperation = (operation) => {
  switch (operation) {
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    case '':
      return ' ';
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};

const stylish = (tree, indent = 2) => {
  const styledTree = tree.reduce(
    (
      acc,
      {
        name,
        value,
        children,
        operation = '',
      },
    ) => {
      const formattedOperation = formatOperation(operation);
      if (children) {
        return [
          ...acc,
          `${' '.repeat(indent)}${formattedOperation} ${name}: ${stylish(children, indent + 4)}`,
        ];
      }

      if (typeof value === 'object') {
        const [k, v] = Object.entries(value)[0];
        const node = {
          operation: '',
          name: k,
          value: v,
        };

        return [
          ...acc,
          `${' '.repeat(indent)}${formattedOperation} ${name}: ${stylish([node], indent + 4)}`,
        ];
      }

      return [...acc, `${' '.repeat(indent)}${formattedOperation} ${name}: ${value}`];
    },
    [],
  );

  return `{\n${styledTree.join('\n')}\n${' '.repeat(indent - 2)}}`;
};

export default stylish;
