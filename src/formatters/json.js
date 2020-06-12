export default (tree) => {
  const iter = (node, path) => (
    node.flatMap(({
      name,
      value,
      children,
      type = '',
    }) => {
      const currPath = path === '' ? name : `${path}.${name}`;
      if (children) {
        return iter(children, currPath);
      }

      if (type.length > 0) {
        return {
          action: type === 'added' ? 'added with value' : 'deleted',
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
