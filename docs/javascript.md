---
sidebar_position: 1
---

# Experience in JS development

## Eslint
Should I use Eslint or not? If you're working on a solo project, nobody cares. If you're working on a team project, configure Eslint as soon as possible and avoid a world of pain. If you want your project to be big and successful, it **will** become a team effort, trust me, ...configure the damn Eslint.

People will endlessly fight about Eslint rules, yet nobody seems to have a rule pack in his pocket, ready to use.

:::note

TODO let's get a nice rule pack, now!
TODO what about by import sorter??? :)

TODO extends
- AirBnb?, Facebook?, Google, github?
Extends
- https://github.com/jest-community/eslint-plugin-jest
- https://github.com/cypress-io/eslint-plugin-cypress
Rules
- https://github.com/selaux/eslint-plugin-filenames
:::

Check that your `eslintrc.js` is valid by running it:
```bash
yarn eslint ./src/file.ts
```

List all the rules applied to a specific file:
```bash
yarn eslint --print-config ./src/index.ts
```
(Different files can have different configs applied to them thanks to the `overrides` config property.)

Show all eslint problems
```bash
yarn eslint .
```
Fix all eslint problems
```bash
yarn eslint . --fix
```


### eslint:recommended https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js

```
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
```

### plugin:@typescript-eslint/recommended https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts

```
'@typescript-eslint/adjacent-overload-signatures': 'error',
'@typescript-eslint/ban-ts-comment': 'error',
'@typescript-eslint/ban-types': 'error',
'no-array-constructor': 'off',
'@typescript-eslint/no-array-constructor': 'error',
'no-empty-function': 'off',
'@typescript-eslint/no-empty-function': 'error',
'@typescript-eslint/no-empty-interface': 'error',
'@typescript-eslint/no-explicit-any': 'warn',
'@typescript-eslint/no-extra-non-null-assertion': 'error',
'no-extra-semi': 'off',
'@typescript-eslint/no-extra-semi': 'error',
'@typescript-eslint/no-inferrable-types': 'error',
'no-loss-of-precision': 'off',
'@typescript-eslint/no-loss-of-precision': 'error',
'@typescript-eslint/no-misused-new': 'error',
'@typescript-eslint/no-namespace': 'error',
'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
'@typescript-eslint/no-non-null-assertion': 'warn',
'@typescript-eslint/no-this-alias': 'error',
'@typescript-eslint/no-unnecessary-type-constraint': 'error',
'no-unused-vars': 'off',
'@typescript-eslint/no-unused-vars': 'warn',
'@typescript-eslint/no-var-requires': 'error',
'@typescript-eslint/prefer-as-const': 'error',
'@typescript-eslint/prefer-namespace-keyword': 'error',
'@typescript-eslint/triple-slash-reference': 'error',
```

### plugin:@typescript-eslint/recommended-requiring-type-checking https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts

```
'@typescript-eslint/await-thenable': 'error',
'@typescript-eslint/no-floating-promises': 'error',
'@typescript-eslint/no-for-in-array': 'error',
'no-implied-eval': 'off',
'@typescript-eslint/no-implied-eval': 'error',
'@typescript-eslint/no-misused-promises': 'error',
'@typescript-eslint/no-unnecessary-type-assertion': 'error',
'@typescript-eslint/no-unsafe-argument': 'error',
'@typescript-eslint/no-unsafe-assignment': 'error',
'@typescript-eslint/no-unsafe-call': 'error',
'@typescript-eslint/no-unsafe-member-access': 'error',
'@typescript-eslint/no-unsafe-return': 'error',
'require-await': 'off',
'@typescript-eslint/require-await': 'error',
'@typescript-eslint/restrict-plus-operands': 'error',
'@typescript-eslint/restrict-template-expressions': 'error',
'@typescript-eslint/unbound-method': 'error',
```

# Create a shareable
https://eslint.org/docs/latest/developer-guide/shareable-configs


# Vscode

Settings
```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
    },
}
```

Restart eslint server
```
CMD + SHIFT + P: Eslint Restart eslint server
```

Show output of running eslint server
```
CMD + SHIFT + P: Eslint Show output channel
```







## How to write a library

In your NPM account create an organization **finga** for public purposes. The all the packages you create should be named **@finga/package**.

Start by publishing a few beta versions in your namespace `1.0.0-beta.1`, test them out
```
npm publish --access public --tag beta
```

and when you're satisfied, publish your stable version in your namespace.

```
npm publish --access public --tag beta
```

It is tempting to use **yarn link** or **npm link** to test out your package, but it's just not good enough. You can use
it as a helpful tool for debugging, but to really prepare a good package, go with the betas.

Why is linking just not good enough? First of all not all the contents on your disk gets uploaded to NPM when you publish, that's what [.npmrc](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc) is for btw. Plus it gives you a change to review your readme file and make sure package.json metadata is on point. Trust me, go with beta.
