export const zip = (a: any[], b: any[]) => {
  return a.map((item, index) => [item, b[index]]);
};