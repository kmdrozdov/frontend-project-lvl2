const stylish = (tree, indent = 2) => {
  const styledTree = tree.reduce(
    (acc, [operand, key, value]) => {
      let preparedValue = value;
      if (Array.isArray(value)) {
        preparedValue = stylish(value, indent + 4);
      } else if (typeof value === 'object') {
        const [k, v] = Object.entries(value)[0];
        preparedValue = stylish([[' ', k, v]], indent + 4);
      }

      return [...acc, `${' '.repeat(indent)}${operand} ${key}: ${preparedValue}`];
    },
    [],
  );

  return `{\n${styledTree.join('\n')}\n${' '.repeat(indent - 2)}}`;
};

export default stylish;
