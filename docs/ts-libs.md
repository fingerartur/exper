---
sidebar_position: 4
sidebar_label: "Create TS library 🎖️"
---

# How to create a TS library 🎖️

In your NPM account create an organization **finga** for public purposes. Then all the packages you create should be named **@finga/package**.

## Create the project
Even to write a mini 4kB lib, the setup process is a little tedious, you have to set up Typescript, webpack, package.json,
Jest, gitignore, there's a bunch of stuff.

That's why I created this [spawner](https://github.com/fingerartur/spawn-tslib). Just run

```
npx @finga/spawn-tslib my-lib
```

and you are ready to go.

## Publish a beta
**Always publish a beta first.**

It is tempting to skip beta phase and just use **yarn link** or **npm link** to test out your package, but it's just not good enough. You can use it as a helpful tool for debugging, but to really prepare a good package, go with the betas.

Why is linking just not good enough? First of all not all the contents on your disk gets uploaded to NPM when you publish, that's what [.npmrc](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc) or `package.json > files` is for btw. Second, you don't know if dependencies in you package.json are correct, if you didn't forget any etc. Plus it gives you a chance to review your readme file and make sure package.json metadata is on point. Trust me, go with beta.

A beta version might look something like this `1.0.0-beta.1`.

```
npm publish --access public --tag beta
```

1. Publish a beta
2. Try to install it. Did all dependencies install as they should?
3. Look into you package in `node_modules/my-lib`, check that it does not contain any extra files, or god forbid secret files.
4. Double-check the size of `./my-lib` and `./my-lib/index.js`
5. Check that all your methods are documented in a readme, check that your changelog is up-to-date.

When everything checks out, go on and publish your lib.

### Alpha vs. beta
**Alpha** is for internal testing by your developers only it can be undocumented bullshit, it can be hacks, whatever.

**Beta** is for testing by 3rd parties, everything public has to be well documented, there should not be unfinished code.

## Publish

When you are satisfied, publish the lib

```
npm publish --access public
```

## Future reading
- [Microsoft Api extractor](https://api-extractor.com/) is a tool for generating smarter typings, it should be able to bundle them into a single file like webpack and remove private types that are not used by any public API. What is more, in a single class some methods / attributes can be annotated as public / private and only the public ones will be exported.
