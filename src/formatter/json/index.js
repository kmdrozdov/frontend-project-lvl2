export default (tree) => {
  const iter = (node, path) => (
    node.flatMap(([operand, key, value]) => {
      const currPath = path === '' ? key : `${path}.${key}`;
      if (Array.isArray(value)) {
        return iter(value, currPath);
      }

      if (operand !== ' ') {
        return {
          action: operand === '+' ? 'added with value' : 'deleted',
          path: currPath,
          value,
        };
      }

      return [];
    })
  );
  const result = iter(tree, '');

  return JSON.stringify(result);
};
