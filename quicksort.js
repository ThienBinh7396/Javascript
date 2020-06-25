let arr = [2, 5, 2, 3, 1, 19, 11, 2, 3, 22, 11, 1, 12];

const swap = (i, j) => {
  let temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
};

function quicksort(l, h) {
  if (l > h) return;

  let pivot = arr[Math.floor((l + h) / 2)];

  let i = l,
    j = h;

  while (i <= j) {
    while (arr[i] < pivot) i++;

    while (arr[j] > pivot) j--;

    if (i <= j) {
      swap(i, j);
      i++;
      j--;
    }
  }

  if (i < h) quicksort(i, h);
  if (l < j) quicksort(l, j);
}

quicksort(0, arr.length - 1);

console.log(arr);
