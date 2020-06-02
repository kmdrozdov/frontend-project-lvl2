export default (tree) => {
  const iter = (node, path) => (
    node.flatMap(({
      name,
      value,
      children,
      operation = '',
    }) => {
      const currPath = path === '' ? name : `${path}.${name}`;
      if (children) {
        return iter(children, currPath);
      }

      if (operation.length > 0) {
        return {
          action: operation === 'added' ? 'added with value' : 'deleted',
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
