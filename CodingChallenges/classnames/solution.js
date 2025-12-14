/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
  let answer = [];

  args.forEach((arg) => {
    if(!arg){
        return;
    }

    if(typeof arg === "number" || typeof arg === "string"){
        answer.push(arg)
        return;
    }

    if(Array.isArray(arg)){
        answer.push(classNames(...arg))
        return;
    }

    if(typeof arg === "object"){
        for(const key in arg){
            if (Object.hasOwn(arg, key) && arg[key]) answer.push(key)
        }
        return;
    }
  })

  return answer.join(" ")
}

// --------------------------------------
// TEST CASES
// --------------------------------------

// 1️⃣ Basic strings
console.log(classNames('foo', 'bar'));
// Expected: "foo bar"


// 2️⃣ Objects with boolean conditions
console.log(classNames({ foo: true, bar: false, qux: true }));
// Expected: "foo qux"


// 3️⃣ Mixed strings + objects + multiple args
console.log(
  classNames(
    'foo',
    { bar: true, duck: false },
    'baz',
    { quux: true }
  )
);
// Expected: "foo bar baz quux"


// 4️⃣ Arrays should be recursively flattened
console.log(classNames('a', ['b', { c: true, d: false }]));
// Expected: "a b c"


// 5️⃣ Falsey values should be ignored completely
console.log(classNames(null, false, 'bar', undefined, { baz: null }, ''));
// Expected: "bar"