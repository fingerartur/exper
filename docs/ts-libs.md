---
sidebar_position: 3
---

# How to create a TS library

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
