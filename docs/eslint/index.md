---
sidebar_position: 2.1
---

# Eslint 🎖️

Should I use Eslint or not? If you're working on a solo project, nobody cares. If you're working on a team project,
configure Eslint as soon as possible and avoid a world of pain. If you want your project to be big and successful,
it **will** become a team effort, trust me, ...configure the damn Eslint.

## Choose your rules

People will endlessly fight about Eslint rules, yet nobody seems to have a rule pack in his pocket ready to use.

That's why I created **[@finga/eslint-config](https://github.com/fingerartur/eslint-config)**.

:::note
Why alternatives such as AirBnb, Facebook, Google, Github were not good enough? I had a quick look and basically they
do not look like something you can use out of the box. Either they are not strict enough or it has a very complicated
setup, or there is no setup at all.
:::

There is a bunch of recommended rules, for JS, for TS, etc. Are they good or not? [What do they actually do?](./recommended)


## Make sure everything works as it should

**Check that your `eslintrc.js` is valid** by linting a random file. If the config is invalid, you will see errors.
```bash
yarn eslint ./src/file.ts
```

**Show all** eslint problems
```bash
yarn eslint .
```

**Fix all** eslint problems
```bash
yarn eslint . --fix
```

### Debug

List all the rules applied to a specific file. (Different files can have different configs applied to them thanks to the `overrides` config property.):
```bash
yarn eslint --print-config ./src/index.ts
```

## How to create a shareable eslint-config plugin

https://eslint.org/docs/latest/developer-guide/shareable-configs


## Vscode with Vscode

Vscode has a [plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Configure it to trigger auto-fixing every time you save a file.

Settings:
```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
    },
}
```

Here are a few important commands for this plugin:

**Restart eslint server**
Do this whenever you change Eslint config.

```
CMD + SHIFT + P: Eslint Restart eslint server
```

**Show output of running eslint server**
Do this whenever you change Eslint config.
```
CMD + SHIFT + P: Eslint Show output channel
```

*This plugin takes eslint executable from the local ./node_modules so don't worry it runs the same version as your CLI.*

## Git hooks with eslint
And create a git pre-push hook to check for lint errors and make sure you never push un-linted code.
