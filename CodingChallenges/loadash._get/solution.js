/**
 * @param {Object} objectParam
 * @param {string|Array<string>} pathParam
 * @param {*} [defaultValue]
 * @return {*}
 */
export default function get(objectParam, pathParam, defaultValue) {
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split('.');

  let object = objectParam;
  let index = 0;
  let length = path.length;

  while(index<length && object != null){
    object = object[String(path[index])];
    index++;
  }

  let answer = index && index == length ? object : undefined;

  return answer !== undefined ? answer : defaultValue;
}


console.log(get({ a: [{ b: { c: 3 } }] }, 'a.0.b.c')); // 3
console.log(get({ a: { b: 2, c: { foo: 2 } } }, ['a', 'c'])); // foo: 2