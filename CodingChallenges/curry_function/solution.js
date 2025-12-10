/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
    return function curried(...args){
        const context = this;
        if( args.length >= func.length){
            return func.apply(context, args)
        } else {
            return function(...nextArgs){
                return curried.apply(context, [...args, ...nextArgs])
            }
        }
    }
}

// --------------------------------------
// TEST CASES
// --------------------------------------

// 1️⃣ Basic: simple 2-argument function
function add(a, b) {
  return a + b;
}
const cAdd = curry(add);

console.log(cAdd(3)(4)); 
// Expected: 7


// 2️⃣ Partial application
const add3 = cAdd(3);
console.log(add3(10)); 
// Expected: 13


// 3️⃣ Function with 3 parameters — collected over multiple calls
function mul(a, b, c) {
  return a * b * c;
}
const cMul = curry(mul);

console.log(cMul(2)(3)(4)); 
// Expected: 24


// 4️⃣ Mixed argument collection: supplying more than one at a time
console.log(cMul(2, 3)(4)); 
// Expected: 24

console.log(cMul(2)(3, 4)); 
// Expected: 24


// 5️⃣ Should preserve `this` context
const obj = {
  x: 10,
  addToX(a, b) {
    return this.x + a + b;
  },
};

const curriedMethod = curry(obj.addToX.bind(obj));

console.log(curriedMethod(5)(5));
// Expected: 20  (10 + 5 + 5)