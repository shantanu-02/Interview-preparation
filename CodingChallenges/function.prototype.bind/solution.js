/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
  const originalMethod = this;
  return function (...args) {
    return originalMethod.apply(thisArg, [...argArray, ...args]);
  };
};

// --------------------------------------
// Test Cases
// --------------------------------------

// 1️⃣ Basic binding of `this`
const person = {
  name: "Alice",
  getName() {
    return this.name;
  },
};

const unbound = person.getName;
console.log(unbound()); // ❌ undefined

const bound = person.getName.myBind(person);
console.log(bound()); // ✅ "Alice"


// 2️⃣ Pre-binding arguments
function multiply(a, b) {
  return a * b;
}

const double = multiply.myBind(null, 2);
console.log(double(5)); // ✅ 10


// 3️⃣ Binding + additional call-time arguments
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const greetHello = greet.myBind(null, "Hello");
console.log(greetHello("Bob")); // ✅ "Hello, Bob!"


// 4️⃣ Binding with object dynamic context
function sayAge() {
  return this.age;
}

const obj = { age: 30 };
const boundAge = sayAge.myBind(obj);
console.log(boundAge()); // ✅ 30


// 5️⃣ Works even if `thisArg` is a primitive
function getX() {
  return this.x;
}

const boundPrimitive = getX.myBind({ x: 99 });
console.log(boundPrimitive()); // ✅ 99


// Bonus - Reference from prompt
const john = {
  age: 42,
  getAge: function () {
    return this.age;
  },
};

const unboundGetAge = john.getAge;
console.log(unboundGetAge()); // ❌ undefined

const boundGetAge = john.getAge.myBind(john);
console.log(boundGetAge()); // ✅ 42
