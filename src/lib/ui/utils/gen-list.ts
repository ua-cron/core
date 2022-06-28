export const genList = (from: number, to: number) => {
  const list: {value: string, label: string}[] = [];
  for (let x = from; x <= to; x++) {
    list.push({value: `${x}`, label: `${x}`});
  }
  return list;
};
