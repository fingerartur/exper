# Warnings configuration
Type compiler does not checks all the types that it could. Some type checks are simply disabled by default. Let's have a look at them and see what I can use in my advantage.

[The list is here](https://github.com/google/closure-compiler/wiki/Warnings). I looked at the ones that are OFF to see if I should turn them ON.

**Sadly and ironically, most of them don't work or have something wrong with them.**

1. `checkDebuggerStatement` ✅
2. `unusedLocalVariables` ✅
3. `reportUnknownTypes` ✅
4. `visibility`, `accessControls` - 🚨 both are ON by default. Fix doc
5. `const` (includes `constantProperty`) - 🚨 both are ON by default. Fix doc
6. `missingReturn` - 🚨 is ON by default. Fix doc
7. `missingRequire` - 🚨 works by default on ESM modules
8. `strictCheckTypes`
   - includes `strictMissingProperties` ✅
   - includes `strictPrimitiveOperators` 🚨 does nothing
9.  `unusedPrivateMembers` 🚨 does nothing
10. `missingProperties` 🚨 - do not know what it means
11. `strictModuleDepCheck` 🚨 - do not know what it means
12. `typeInvalidation` 🚨 - do not know what it means (probably related to this http://closuretools.blogspot.com/2011/01/property-by-any-other-name-part-3.html)
13. `undefinedNames` 🚨 - UKNOWN to compiler

### unusedPrivateMembers
```js
class Car {
  constructor() {
    /**
     * @private
     */
    this.color = 'red'; // should error
  }
}
```

### strictPrimitiveOperators
```js
function go() {
  return 555 + 'hello' + {} + new Element() // should error
}
```

### reportUnknownTypes

Actually the documentation is wrong. it says *Warnings for any place in the code where type is inferred to ?. NOT RECOMMENDED!* But if you declare ?, it also fails (this is not inferred, it is declared).
```js
/**
 * @param {?} z // produces error. Problem here is that now I cannot use ? type at all it is just not possible and that sucks, so I cannot use both flags at the same time even though I would like to.
 * 
 * Because reportUnknownTypes can tell me that I forgot to type a param or return value etc.
 */
function hello(z) {
  console.log('hello', z);
}
```

Also a good question: why is it `NOT RECOMMENDED!`?
