/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const noInitialValue = initialValue == undefined;
  const len = this.length;

  if (len == 0) {
    throw new Error("Array is empty");
  }

  let acc = noInitialValue ? this[0] : initialValue;
  let startingIndex = noInitialValue ? 1 : 0;

  for (let i = startingIndex; i < len; i++) {
    if (Object.hasOwn(this, i)) {
      acc = callbackFn(acc, this[i], i, this);
    }
  }

  return acc;
};

// --------------------------------------
// Test 1️⃣ Basic sum with initial value
// --------------------------------------
console.log([1, 2, 3].myReduce((prev, curr) => prev + curr, 0));
// Expected: 6

// --------------------------------------
// Test 2️⃣ Sum without initial value
// (first element becomes initial prev)
// --------------------------------------
console.log([1, 2, 3].myReduce((prev, curr) => prev + curr));
// Expected: 6
// Explanation: prev starts as 1, then 1+2 → 3, then 3+3 → 6

// --------------------------------------
// Test 3️⃣ Reduce to find max
// --------------------------------------
console.log([5, 1, 7, 3].myReduce((prev, curr) => (prev > curr ? prev : curr)));
// Expected: 7

// --------------------------------------
// Test 4️⃣ Concatenate strings
// --------------------------------------
console.log(["a", "b", "c"].myReduce((p, c) => p + c, ""));
// Expected: "abc"

// --------------------------------------
// Test 5️⃣ Callback receives correct parameters
// (prev, curr, index, array)
// --------------------------------------
const logs = [];
[10, 20, 30].myReduce((p, c, i, arr) => {
  logs.push([p, c, i, arr.length]);
  return p + c;
}, 0);
console.log(logs);
// Expected:
// [
//   [0, 10, 0, 3],
//   [10, 20, 1, 3],
//   [30, 30, 2, 3]
// ]
