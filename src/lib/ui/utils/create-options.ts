export const createOptions = (labels: string[]) => labels.map((v, i) => ({
  label: v,
  value: (i + 1).toString()
}));
