export const rotate = (arr: any[], k = 3) => {
  const n = arr.length;
  if (n === 0) return [];
  k %= n;

  const result = new Array(n);
  let idx = 0;

  for (let i = n - k; i < n; i++) result[idx++] = arr[i];
  for (let j = 0; j < n - k; j++) result[idx++] = arr[j];

  return result;
};

const list = [1, 2, 3, 4, 5, 6, 7];
console.info(rotate(list));