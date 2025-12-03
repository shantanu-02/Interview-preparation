/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
function debounce(func, wait = 0) {
  let timeoutID = null;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      timeoutID = null;
      func.apply(context, args);
    }, wait);
  };
}

// --------------------------------------
// Test Helpers
// --------------------------------------
function log(msg) {
  console.log(`[${Date.now() - start}ms]`, msg);
}

const start = Date.now();

// --------------------------------------
// Test Cases
// --------------------------------------

// 1️⃣ Basic: function executes after wait
log("Test 1 start");
const fn1 = debounce(() => log("fn1 executed"), 100);
fn1();
setTimeout(() => log("Expected: fn1 executed once after ~100ms"), 150);


// 2️⃣ Rapid calls: only last call should execute
log("Test 2 start");
let count2 = 0;
const fn2 = debounce(() => {
  count2++;
  log("fn2 executed count=" + count2);
}, 100);

fn2();
fn2();
fn2();
setTimeout(() => {
  log("Expected: fn2 executed once (count=1)");
}, 150);


// 3️⃣ `this` binding should be preserved
log("Test 3 start");
const obj = {
  value: 42,
  method: debounce(function () {
    log("this.value = " + this.value);
  }, 80),
};

obj.method();
setTimeout(() => log("Expected: this.value = 42"), 150);


// 4️⃣ Arguments should be passed correctly
log("Test 4 start");
const fn4 = debounce((a, b) => {
  log(`Received args: ${a}, ${b}`);
}, 50);

fn4("Hello", "World");
setTimeout(() => log("Expected: Received args: Hello, World"), 120);


// 5️⃣ Independent debounce instances should not interfere with each other
log("Test 5 start");
let countA = 0, countB = 0;

const debA = debounce(() => { countA++; log("A executed"); }, 60);
const debB = debounce(() => { countB++; log("B executed"); }, 60);

debA();
debB();

setTimeout(() => {
  log(`Expected: A executed once, B executed once`);
  log(`Final counts -> A: ${countA}, B: ${countB}`);
}, 150);


// 6️⃣ Cancellation check: calling again resets timer
log("Test 6 start");
let executed6 = false;
const fn6 = debounce(() => {
  executed6 = true;
  log("fn6 executed");
}, 120);

fn6();
setTimeout(() => fn6(), 80);  // resets timer
setTimeout(() => log(`Expected: fn6 executed once after ~200ms total`), 250);


// 7️⃣ Zero wait debounce should run in next event loop tick
log("Test 7 start");
const fn7 = debounce(() => log("fn7 executed (0 wait)"), 0);
fn7();
log("Expected: fn7 should execute after this line");
