---
sidebar_position: 4
---

# JavaScript

JavaScript has a long history, it started with prototype chains instead of inheritance, closures of scope, variable `this` and that legacy drags on in the the future. New versions of JavaScript are much cleaner, but the old skeletons have not been removed and thus you have to be aware of them.

## Skeletons
1. Closure
2. Variable scope / functions scope
3. Variable this + bind, etc.


## ESNext
ESNext comes with new features every year, however sometimes they are just syntax sugar for a weird old skeleton, so beware! :)

## ES 2022
Array `.at()` method
```js
[1,2,3,4,5].at(3)  // returns item at position 3 from the left
[1,2,3,4,5].at(-2)   // returns item at position 2 from the right
```

Regex `/d` modifier. The groups can also be named
```js
const matchObj = /(a+)(b+)/d.exec('aaaabb');
matchObj.indices[0]; /* Output - [0, 6]  (group 0 - whole expression) */
matchObj.indices[1]; /* Output - [0, 4]  (group 1 - group of "a") */
matchObj.indices[2]; /* Output - [4, 6]  (group 2 - group of "b"), starts at index 4 ends before 6 */
```
Check if prop belongs to object, NOT it's prototype chain ancestor.
```js
Object.hasOwn(obj, 'prop')
```
[src](https://dev.to/jasmin/whats-new-in-es2022-1de6)

Error cause, like in Java. Finally! However, browser (Google chrome) does not print the cause chain to console when error occurs. So still pretty useless. Let's hope they add it soon.
```js
try {
  // ···
} catch (error) {
  throw new Error(`While processing ${filePath}`, {cause: error});
}
```

Top level await in browser
```js
const response = await fetch('whats-new-in-es2022-1de6')
```

Native support for private fields

```js
class A {
  static #p = 'static private';
  #p = 'private';
  pub = 'public';
}
```

## ES 2021
Numeric separators for nice readability :)

```js
const x = 100_000_000
```

String `replace` was confusing, it works only on the first occurrence. That's why `replaceAll()` comes to the rescue.

```js
"abba".replace("a", "x") // xbba
"abba".replaceAll("a", "x") // xbbx
```

Nullish assignment, andy and ory assignment. Honestly this was a bad idea, don't know which idiot came up with this, but this will just create a shitload of bugs.

```js

let x = null // null
x ??= 6 // 6
x ??= 7 // 6
// Assigns only if x is nullish

let x = 666
x &&= 777 // 777
// Assigns only if x is truthy

let x = 666
x ||= 777 // 777
// Assigns only if x is falsy
```

Promise `any` resolves when any/first promise resolves. Rejects when all reject.

```js
await Promise.any([
  fetch('https://cdn1'),
  fetch('https://cdn1'),
])
```

Native support for private methods, getters and setters.

```js
class A {
  #go() {}
  get #age() {}
}
```

`WeakRef` is an extremely idiotic concept, the authors themselves are saying it should never be used. I have honestly no idea why they added it to ES? WeakRef, allows the referenced object/thing to be garbage collected ... why the fuck would I ever use that?

[src](https://dev.to/naimlatifi5/ecmascript-2021-es12-new-features-2l67)

## ES 2020

BigInt is the infinitely precise integer, cool.
```js
10101010101010101011;
10101010101010100000;
// Integer number gets cropped, because there is a limit on precision.
Number.MAX_SAFE_INTEGER; //9007199254740991 (2^53 - 1)

BigInt(9007199254740992);
9007199254740992n;
// BigInt has no such limitation! It will never get cropped.
```

`Promise.allSettled` can wait until all promises resolved or rejected and it resolved, as opposed tot `Promise.all` which reject when a single child rejects.
```js
await Promise.allSettled([p1, p2])
// [
//   { status: 'fulfilled', value: undefined },
//   { status: 'rejected', reason: undefined }
// ]
```

Nullish coalescing operator is great! I use it all the time.

```js
const x = map.get(id) ?? 666
```

Optional chaining operator again is amazing. I use it a lot.

```js
const name = response?.data?.user?.name ?? null
```

Dynamic import can import a module asynchronously. Obviously this is a bit tricky, because it's support really depends on what bundling mechanism you are using. And the behavior will differ in the bundler and in browser.

```js
const Print = await import('./print.js');
```

String `.matchAll()` finds all regex matches, not just the first one as was the case with `.match()`. This is the same story as `.replace()` and `.replaceAll()` which was introduced in ES2021.

```js
Array.from("hello me hello".matchAll("hello"))

// ['hello', index: 0, input: 'hello me hello', groups: undefined]
// ['hello', index: 9, input: 'hello me hello', groups: undefined]
```

## ES 2019
Array `.flat()` flattens array, default depth is `1`, but can be configured.

```js
[1,2,3,[1,2]].flat() // [1, 2, 3, 1, 2]

[1, [1], [[2]]].flat() // [1, 1, [2]]
[1, [1], [[2]]].flat(Infinity) // [1,1,2]
```

Array `.flatMap()`, first calls map, then flat.

```js
[[1,2,3], [1,2,3]].flatMap(a => a.slice(0,2))
// [ 1,2,1,2]
```

String trim can now be limited only to start and end with `.trimStart()` and `.trimEnd()`. These make a fine addition to the notorious `String.trim()` which trims all.

```js
"   hello".trimStart() // "hello"
"   hello ".trimEnd() // "   hello"
```

Map can be converted to object with `Object.fromEntries()`. Array of tuple arrays can be also converted to map.

```js
Object.fromEntries([["hello", 2], ["name", "Miguel"]]) // {age: 2, name: 'Miguel'}
Object.fromEntries(new Map([["age", 2], ["name", "Miguel"]])) //{age: 2, name: 'Miguel'}
```

Incidentally array of tuples can also be used to initialize a map.
```js
new Map(["hello", 2], ["name", "Miguel"]) // Map(2) {'hello' => 2, 'name' => 'Miguel'}
```

Function `toString()` returns the whole source code of the function. May be useful for debugging.

```js
function A() { return 1 + 1}
A.toString() // 'function A() { return 1 + 1}'
```

`globalThis` is the global object, which differs between browser, browser web worker and node.js.

```js
globalThis // window - in browser
globalThis // self - in web worker
globalThis // global - in node.js
```

[src](https://dev.to/prabusubra/es2019-es10-features-5b14)

## ES 2018

Spread operator, used for shallow copy.

```js
const merge = [...arr1, ...arr2];

const obj2 = {
  ...obj1,
  c: 30
};

const {a, ...rest} = obj;

const sort = (...values) => {}

// Older Alternative is
Object.assign({}, obj1, obj2, obj3)

// Spread only works on enumerable properties, not non-enumerable
// Non-enumerable can be defined like this:
Object.defineProperty(car, 'type', {
  value: 'coupe',
  enumerable: false
});
```

Async iteration aka for-await

```js
async function fetchSequentially * () {
    for (let i = 0; i < 10; i++) {
      yield i;
    }
}

for await (const response of fetchSequentially()) {
  // ...
}
```

Promise `.finally()` to execute after either resolve or reject.

```js
fetch('https://www.google.com')
  .finally(() => {
    // resolved or rejected, anyways I executes
  });
```

Regex matcher with option to match line breaks

```js
/one.two/.test('one\ntwo')     // → false, This is old style, and it does not match CR/LF
/one.two/s.test('one\ntwo')    // → true, The /s modifier allows . to match CR/LF
```

Regex named capture groups

```js
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = re.exec('2019-01-10');

match.groups.year    // → 2019
match.groups.mont    // → 01
match.groups.day     // → 10</day></month></year>

// Replace with captured group
str.replace(/(?<red>red) &amp; (?<blue>blue)/, '$<blue> &amp; $<red>')
// Old style with numbers
console.log(str.replace(/(red) &amp; (blue)/, '$2 &amp; $1'));
```

Lookbehind test was added to Regexp. However, still not supported on Safari.

```js
"1 turkey costs €30".match(/(?<=€)\d+/) // 30
```

TODO tagged literal

[src](https://css-tricks.com/new-es2018-features-every-javascript-developer-should-know/)

## ES 2017

Async / await

```js
async () => {
  await fetch('https://xxx')
}
```

String padding

```js
"hello".padStart(5)
"hello".padEnd(5)
"hello".padEnd(5, "x") // hellox
```

Object.values(), Object.keys(), Object.entries()

```js
Object.values({ a: 1, b: 2 }) // [1,2]
Object.keys({ a: 1, b: 2 }) // ['a', 'b']
Object.entries({ a: 1, b: 2}) // [['a', 1], ['b', 2]]
```

[src](https://flaviocopes.com/es2017/#string-padding)

## ES 2016

Array includes
```js
[1,2,3].includes(3) // true
[1,2,3].includes(1, 1) // false (starting from index 1)
```

Power operator
```js
4 ** 2 // 16
Math.pow(4, 2) // 16, this is the old way
```

[src](https://betterprogramming.pub/javascript-es2016-features-with-examples-a41b7aead589)

## ES 2015

Default params
```js
function(limit = 10) {}
```

Rest params

```js
function sum(...values) {}
```

Template literals and multi-line strings

```js
var name = `Your name is ${first} ${last}.`

var fourAgreements = `You have the right to be you.
    You can only be you when you do your best.`
```

Destructuring
```js
var {username, password} = req.body
```

Arrow functions
```js
() => {}
```

Promises
```js
new Promise((resolve, reject)=> {
  setTimeout(resolve, 1000)
})
```

Block scoping with `let` and `const`

```js
let x = 1
const x = 1

function calculateTotalAmount (vip) {
  const amount = 0


  if (true) {
    const amount = 1
  }

  return amount // 0
}

// Old style without block scoping:
function calculateTotalAmount (vip) {
  var amount = 0
  if (true) {
    var amount = 1
  }

  return amount // 1
}
```

Classes

```js
class Car {}
```

[src](https://medium.com/capital-one-tech/my-12-favorite-es6-es2015-features-76e70397fee0)

## ES5

Lookahead test was added to Regex. There is lookahead and also negative lookahead.

```js
"1 turkey costs 30€".match(/\d+(?=€)/) // "30"
// It returns 30, because it has € symbol after it. € is not part of the match tho
"1 turkey costs 30€".match(/\d+(?!€)/) // 1
// Negative lookahead
```
