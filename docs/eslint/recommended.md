---
sidebar_position: 1.1
---

# Recommended rules
There are a few recommended rule packs, such as `eslint:recommended`, `plugin:@typescript-eslint/recommended`, that everybody should use, bla bla bla. But what the hell do they actually do?

I did a bit of reverse-engineering to find out...


## eslint:recommended
These rules first of all protect you from writing complete bullshit, such as multiple semi colons, trying to call an object, trying
to assign to a function, using undeclared variables, having duplicated keys in an object. Second, they some pretty useful rules, such as making sure you do not forget to return a value form a getter, call super() in a constructor that inherits, or you do not use a number so big that javascript cannot work with it and it loses precision.

All in all it is a **very useful pack of rules 👍.**

Some of them are debatable, you may want to allow them: `no-empty`, `no-unused-vars`, `no-useless-catch`.

Dynamic source https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js

Rules applied:
```json
{
  "constructor-super": "error",
  "for-direction": "error",
  "getter-return": "error",
  "no-async-promise-executor": "error",
  "no-case-declarations": "error",
  "no-class-assign": "error",
  "no-compare-neg-zero": "error",
  "no-cond-assign": "error",
  "no-const-assign": "error",
  "no-constant-condition": "error",
  "no-control-regex": "error",
  "no-debugger": "error",
  "no-delete-var": "error",
  "no-dupe-args": "error",
  "no-dupe-class-members": "error",
  "no-dupe-else-if": "error",
  "no-dupe-keys": "error",
  "no-duplicate-case": "error",
  "no-empty": "error",
  "no-empty-character-class": "error",
  "no-empty-pattern": "error",
  "no-ex-assign": "error",
  "no-extra-boolean-cast": "error",
  "no-extra-semi": "error",
  "no-fallthrough": "error",
  "no-func-assign": "error",
  "no-global-assign": "error",
  "no-import-assign": "error",
  "no-inner-declarations": "error",
  "no-invalid-regexp": "error",
  "no-irregular-whitespace": "error",
  "no-loss-of-precision": "error",
  "no-misleading-character-class": "error",
  "no-mixed-spaces-and-tabs": "error",
  "no-new-symbol": "error",
  "no-nonoctal-decimal-escape": "error",
  "no-obj-calls": "error",
  "no-octal": "error",
  "no-prototype-builtins": "error",
  "no-redeclare": "error",
  "no-regex-spaces": "error",
  "no-self-assign": "error",
  "no-setter-return": "error",
  "no-shadow-restricted-names": "error",
  "no-sparse-arrays": "error",
  "no-this-before-super": "error",
  "no-undef": "error",
  "no-unexpected-multiline": "error",
  "no-unreachable": "error",
  "no-unsafe-finally": "error",
  "no-unsafe-negation": "error",
  "no-unsafe-optional-chaining": "error",
  "no-unused-labels": "error",
  "no-unused-vars": "error",
  "no-useless-backreference": "error",
  "no-useless-catch": "error",
  "no-useless-escape": "error",
  "no-with": "error",
  "require-yield": "error",
  "use-isnan": "error",
  "valid-typeof": "error"
}
```

## plugin:@typescript-eslint/recommended

This set of light-weight TS rules, which are fast to run, and it is pretty small. First it takes some rules from `eslint:recommended` and modifies them to work better with TS.
Second, it prevents your from creating empty interfaces, prevents turning TS off using directives such as `@ts-ignore` and `@ts-nocheck`, prevents non-null assertion such as `obj!.attribute`, and prevents the use of `any` type [(`unknown` should be used instead)](https://stackoverflow.com/questions/51439843/unknown-vs-any).

All in all it is a **very useful pack of rules 👍**, even though it is pretty small.

Dynamic source https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts

Rules applied:
```json
{
  "@typescript-eslint/adjacent-overload-signatures": "error",
  "@typescript-eslint/ban-ts-comment": "error",
  "@typescript-eslint/ban-types": "error",
  "no-array-constructor": "off",
  "@typescript-eslint/no-array-constructor": "error",
  "no-empty-function": "off",
  "@typescript-eslint/no-empty-function": "error",
  "@typescript-eslint/no-empty-interface": "error",
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/no-extra-non-null-assertion": "error",
  "no-extra-semi": "off",
  "@typescript-eslint/no-extra-semi": "error",
  "@typescript-eslint/no-inferrable-types": "error",
  "no-loss-of-precision": "off",
  "@typescript-eslint/no-loss-of-precision": "error",
  "@typescript-eslint/no-misused-new": "error",
  "@typescript-eslint/no-namespace": "error",
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
  "@typescript-eslint/no-non-null-assertion": "warn",
  "@typescript-eslint/no-this-alias": "error",
  "@typescript-eslint/no-unnecessary-type-constraint": "error",
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": "warn",
  "@typescript-eslint/no-var-requires": "error",
  "@typescript-eslint/prefer-as-const": "error",
  "@typescript-eslint/prefer-namespace-keyword": "error",
  "@typescript-eslint/triple-slash-reference": "error",
}
```

## plugin:@typescript-eslint/recommended-requiring-type-checking

This is a set of more complex TS rule, which take longer to run. *(If you run it on the whole codebase at once it may take some time, if you run it on a single file at a time, they are very fast, don't worry.)*

These rules protect not against creating `any` type but against using any-typed variable (e.g. when it comes from some lib and "leaks" into your code), it protects against adding up differently typed vars such as string + number, makes sure you interpolate string only with string values, etc.

All in all it is a **very useful pack of rules 👍**, even though it is pretty small.

Some rules are debatable, such as `no-floating-promises`, sometimes you want to create a promise and catch it's errors in a different file.

Dynamic source: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts

Rules applied:
```json
{
  "@typescript-eslint/await-thenable": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-for-in-array": "error",
  "no-implied-eval": "off",
  "@typescript-eslint/no-implied-eval": "error",
  "@typescript-eslint/no-misused-promises": "error",
  "@typescript-eslint/no-unnecessary-type-assertion": "error",
  "@typescript-eslint/no-unsafe-argument": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "require-await": "off",
  "@typescript-eslint/require-await": "error",
  "@typescript-eslint/restrict-plus-operands": "error",
  "@typescript-eslint/restrict-template-expressions": "error",
  "@typescript-eslint/unbound-method": "error",
}
```

## Future reading
- https://github.com/selaux/eslint-plugin-filenames
- https://github.com/jest-community/eslint-plugin-jest
- https://github.com/cypress-io/eslint-plugin-cypress
- https://www.npmjs.com/package/eslint-plugin-react
