---
sidebar_position: 2
---

# Covert Flow to TS

# Action plan
- transform portal (w mobile) 🐶
- transform sdk generated flow to ts
- (transform webportal)

# Looking for a code mod
There are 3 code mods, [none of them good](./flow-to-ts-code-mods.md). But one can be fixed and tweaked to get what we want https://github.com/fingerartur/flow-to-ts.git
- the tweak
```ts
    // 0 capitals => .ts
    import context from "managers/context.js"; -> "managers/context.ts";
    // 1 capital => .tsx
    import Buttons from "components/Button.js"; -> "components/Button.tsx";
    // 2 capitals => .ts
    import { TPlayerContentType } from 'lib/player/TPlayerConstants.js'; -> 'lib/player/TPlayerConstants.ts'
```

# Run the mod
- install `yarn global add https://github.com/fingerartur/flow-to-ts.git`
- to make the transition smoother, rename files according the convention above (see tweak)
- run `flow-to-ts --prettier=false --write --delete-source 'src/**/*'`
  - run it again, this time it will not show symlink-related errors
  - there will be some (20) skipped files. Just comment out the problematic line in them, re-run the mod, uncomment, fix manually

# Manual work after
## 1. Configure webpack and tsconfig
Arny

## 2. Discard changes of any 3rd party code in `src`
- `src/custom/o2sk/webos/webOSTVjs-1.1.0/webOSTV.js` etc.

## 3. Make all enum objects const (50)
Otherwise `$Values` do not give me enum, only string, which is useless.

```tsx
import { $Values } from "utility-types";
const NOTIFICATION_TYPES = {
    WARNING: "WARNING",
    INFO: "INFO"
} const; 🐶
export type TNotificationType = $Values<typeof NOTIFICATION_TYPES>;
```

## 4. Do a few other easy things (5)
- Transform declaration of global types
```ts
    /* globals BUILD */

    -> // types.d.ts
    -> declare global BUILD { ... }
```
- Move `flow-custom/*` to `types/*.d.ts`
- Delete `flow-types` and `yarn add --dev @types/*` instead
- Redefine `TExtractReturn` like this
```ts
export type TExtractReturn = ReturnType
```
- Delete rest of `$Exact`s


## 5. Bonus transforms (2)
- Delete `any` where it is redundant (e.g. return of action)
- Remove flow-specific comments and comment types
```ts
    // $FlowFixMe ...
    /* :: _windowedList = createRef<VariableSizeList<any>>(); */
```

# Why to migrate
Reading comparisons is mostly useless. In short syntax power of Flow and TS basically the same and TS is slightly better in some aspects (utility types, enums, etc.).

The main point is speed of engine
- portal codebase (Flow) 124 lines (58s of flow initializing on pull)
- vscode codebase (TS) 570K lines (no noticeable delay)

Plus interoperability with Angular and therefore much more libs, more stable (no memory leaks) and ability to infer and handle more complex syntax


# Sources
- migration https://skovhus.github.io/blog/flow-to-typescript-migration/
- original code mod https://github.com/Khan/flow-to-ts
- comparison https://github.com/niieani/typescript-vs-flowtype
- comparison https://danielrotter.at/2020/06/05/typing-in-javascript-flow-vs-typescript.html
- comparison https://mariusschulz.com/blog/typescript-vs-flow



# Available code mods (3)

1. `https://gist.github.com/skovhus/`c57367ce6ecbc3f70bb7c80f25727a11` not strong enough, does not even use AST
2. `https://github.com/MarcoPolo/flowToTs` quite good but has a bunch of bugs (see below)
3. `https://github.com/Khan/flow-to-ts` is a fork of MarcoPolo, also runs prettier. Is pretty good but has a bunch of bugs (see below)


# Marco Polo bugs (3)

## 1. Inserts invalid syntax to class methods

```ts
class InputField extends PureComponent<TProps> {
    render function(): Element<typeof NanguView> { // TODO function() should not have been added here
        return (null);
    }
}
```

## 2. bug in optional chains and null coalescing

```ts

// before
const button = buttonBack ?? buttonCancel ?? buttonClose;

// after
const button = // Auto generated from flowToTs. Please clean me!
    (buttonBack !== null && buttonBack !== undefined ? buttonBack : buttonCancel) !== null && (buttonBack !== null && buttonBack !== undefined ? buttonBack : buttonCancel) !== undefined ? buttonBack !== null && buttonBack !== undefined ? buttonBack : buttonCancel : buttonClose;

// before
return Boolean(
    program?.name
        && program?.startTimestamp
        && program?.endTimestamp
        && program.description
        && channel?.channelName,
);

// after
return Boolean(
    // Auto generated from flowToTs. Please clean me!
    (program === null || program === undefined ? undefined : program.name)
        && // Auto generated from flowToTs. Please clean me!
    (program === null || program === undefined ? undefined : program.startTimestamp)
        && // Auto generated from flowToTs. Please clean me!
    (program === null || program === undefined ? undefined : program.endTimestamp)
        && program.description
        && // Auto generated from flowToTs. Please clean me!
    (channel === null || channel === undefined ? undefined : channel.channelName),
);
```

## 3. does nothing about `any`

# Khan bugs (5)

## 1. Does not support optional chaining
Internal prettier throws SyntaxError. Can be fixed by upgrade.
## 2. Crashes when it finds directories
Can by fixed by filtering in only .js, .jsx
## 3. Cannot be run multiple times, because then it deletes any .ts files it finds
Can by fixed by filtering in only .js, .jsx
## 4. Does not convert import/export paths to .ts/.tsx
Can be fixed by removing the file extensions.
## 5. Setting --prettier=false runs prettier anyway
Does not have to be fixed, but it's funny
## 6. Does not correctly rewrite and delete React related Flow types to Typescript equivalents
Can be fix by specifying correct mappings and applying them with and without `React.` prefix
