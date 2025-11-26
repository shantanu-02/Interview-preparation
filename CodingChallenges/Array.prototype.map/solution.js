/**
 * @template T, U
 * @param { (value: T, index: number, array: Array<T>) => U } callbackFn
 * @param {any} [thisArg]
 * @return {Array<U>}
 */
Array.prototype.myMap = function (callbackFn, thisArg) {
  const len = this.length;
  const array = new Array(len);

  for (let k = 0; k < len; k++) {
    // Ignore index if value is not defined for index (e.g. in sparse arrays).
    if (Object.hasOwn(this, k)) {
      array[k] = callbackFn.call(thisArg, this[k], k, this);
    }
  }

  return array;
};


const arr = [];
arr[2] = 10;

console.log([1, 2, 3, 4].myMap(i => i * i)); 
// [1, 4, 9, 16]

console.log([0, false, null, ""].myMap((val, idx) => `${idx}:${val}`)); 
// ["0:0", "1:false", "2:null", "3:"]

console.log(arr.myMap(x => x * 2)); 
// [ <2 empty items>, 20 ]