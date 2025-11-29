/**
 * @param {string} selector
 * @return {{css: Function}}
 */
export default function $(selector) {
  const element = document.querySelector(selector);

  let cssMethod = function(prop, value){

    //if the second parameter is missing, treat it as a getter and get a value
    if(value == undefined){
        if(element == null){
            return undefined;
        }
        const value = element.style[prop];
        return value === undefined ? undefined : value;
    }

    if(element != null){
        element.style[prop] = value;
    }

    //return this which will allow chaining
    return this;
  }
}

// <!-- Put this HTML into your test page before running JS tests -->
// <body>
//  <button id="btn1">Submit</button>
//  <div id="div1" style="color: blue;">Box</div>
//  <span class="s1">Hello</span>
// </body>




// --------------------------------------
// Test 1 — Basic set then get (inline style)
// --------------------------------------
$('#btn1').css('color', 'red');
console.log($('#btn1').css('color')); // Expected: "red"

// --------------------------------------
// Test 2 — Getter for pre-existing inline style
// --------------------------------------
// <div id="div1" style="color: blue;">Box</div>
console.log($('#div1').css('color')); // Expected: "blue"

// --------------------------------------
// Test 3 — Chaining setters returns same interface and values apply
// --------------------------------------
$('#btn1')
  .css('backgroundColor', 'tomato')
  .css('fontSize', '16px');

console.log($('#btn1').css('backgroundColor')); // Expected: "tomato"
console.log($('#btn1').css('fontSize'));        // Expected: "16px"

// --------------------------------------
// Test 4 — Getter for computed style (style set by stylesheet, not inline)
// --------------------------------------
// Add stylesheet rule then create element that uses it:
const styleTag = document.createElement('style');
styleTag.innerHTML = '.big-text { font-size: 20px; }';
document.head.appendChild(styleTag);

const el = document.createElement('p');
el.className = 'big-text';
el.id = 'p1';
el.textContent = 'Paragraph';
document.body.appendChild(el);

// Now the element #p1 gets font-size from stylesheet (computed)
console.log($('#p1').css('fontSize')); // Expected: "20px"

// --------------------------------------
// Test 5 — Selector types: id, class, tag
// --------------------------------------
// id:
console.log($('#btn1').css('color'));   // Expected: "red" (from Test 1)
// class:
console.log($('.s1').css('display') !== undefined); // Expected: true  (should return some computed value like "inline")
// tag:
console.log($('button').css('color'));  // Expected: "red" (same element as #btn1 if only one button exists)

// --------------------------------------
// Test 6 — Setting then overwriting
// --------------------------------------
$('#btn1').css('fontSize', '12px');
console.log($('#btn1').css('fontSize')); // Expected: "12px"
$('#btn1').css('fontSize', '18px');
console.log($('#btn1').css('fontSize')); // Expected: "18px"

// --------------------------------------
// Test 7 — Unknown property returns empty string or undefined (implementation-defined)
// --------------------------------------
// (Recommended behavior: if property is unknown, return '' or undefined. Here we assert non-throwing)
console.log(typeof $('#btn1').css('nonExistentProp') !== 'object'); // Expected: true

// --------------------------------------
// Test 8 — No matched element: getter returns undefined; setter is chain-friendly
// --------------------------------------
console.log($('#does-not-exist').css('color')); // Expected: undefined

// Setting on a non-existent element should not throw and should still allow chaining (no-op)
$('#does-not-exist')
  .css('color', 'green')
  .css('fontSize', '10px');

console.log($('#does-not-exist').css('color')); // Expected: undefined

// --------------------------------------
// Test 9 — Multiple properties sequentially and read back
// --------------------------------------
$('#btn1').css('padding', '4px');
$('#btn1').css('margin', '8px');
console.log($('#btn1').css('padding')); // Expected: "4px"
console.log($('#btn1').css('margin'));  // Expected: "8px"

// --------------------------------------
// Test 10 — Confirm setter does not return the raw DOM element (ensures chaining)
// --------------------------------------
const result = $('#btn1').css('color', 'purple');
// We expect result.css to be a function (the chainable interface)
console.log(typeof result.css === 'function'); // Expected: true
console.log($('#btn1').css('color'));          // Expected: "purple"