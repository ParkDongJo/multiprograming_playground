export const indexBy = (keyFn: (item: any) => any, items: any[]) => {
  return items.reduce((acc, item) => {
    acc[keyFn(item)] = item;
    return acc;
  }, {});
};