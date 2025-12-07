/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
function throttle(func, wait = 0) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) return;

    shouldThrottle = true;
    func.apply(this, args);

    setTimeout(() => {
      shouldThrottle = false;
    }, wait);
  };
}

// Helper for timestamps
const start = Date.now();
const log = (...msg) => console.log(`[${Date.now() - start}ms]`, ...msg);

// --------------------------------------
// Test 1️⃣ — Basic throttling behavior
// --------------------------------------
log("Test 1 start");
let count1 = 0;

const fn1 = throttle(() => {
  count1++;
  log("fn1 executed, count =", count1);
}, 100);

fn1(); // should run immediately → count = 1
fn1(); // ignored
setTimeout(fn1, 50);  // ignored (50ms < 100ms)
setTimeout(fn1, 120); // runs → count = 2

setTimeout(() => {
  log("Expected: fn1 executed twice (count = 2)");
}, 200);


// --------------------------------------
// Test 2️⃣ — Preserves `this` context
// --------------------------------------
log("Test 2 start");

const obj = {
  value: 42,
  method: throttle(function () {
    log("this.value =", this.value);
  }, 80),
};

obj.method(); // should print 42
obj.method(); // ignored

setTimeout(() => {
  log("Expected: only one log of this.value = 42");
}, 150);


// --------------------------------------
// Test 3️⃣ — Passes arguments correctly
// --------------------------------------
log("Test 3 start");

const fn3 = throttle((a, b) => {
  log(`Args received: ${a}, ${b}`);
}, 60);

fn3("Hello", "World"); // should log
fn3("Ignored", "Call"); // ignored

setTimeout(() => {
  log("Expected: Args received: Hello, World");
}, 120);


// --------------------------------------
// Test 4️⃣ — Separate throttle instances should not interfere
// --------------------------------------
log("Test 4 start");

let aCount = 0;
let bCount = 0;

const tA = throttle(() => { aCount++; log("A ran"); }, 70);
const tB = throttle(() => { bCount++; log("B ran"); }, 70);

tA();
tB();
tA(); // ignored
tB(); // ignored

setTimeout(() => {
  log(`Expected: A ran once, B ran once → counts: A=${aCount}, B=${bCount}`);
}, 150);


// --------------------------------------
// Test 5️⃣ — No trailing edge call should run
// (Leading-edge only throttle)
// --------------------------------------
log("Test 5 start");

let count5 = 0;
const fn5 = throttle(() => {
  count5++;
  log("fn5 executed");
}, 100);

fn5();  // runs
setTimeout(fn5, 10);  // ignored
setTimeout(fn5, 20);  // ignored
setTimeout(fn5, 30);  // ignored

// After 100ms window ends, we do NOT want a trailing call
// Only next manual call triggers execution

setTimeout(() => {
  log("Window ended; calling fn5 manually now");
  fn5(); // should run now
}, 150);

setTimeout(() => {
  log(`Expected: fn5 executed exactly twice (count5 = ${count5})`);
}, 250);
