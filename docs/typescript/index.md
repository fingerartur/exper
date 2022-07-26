---
sidebar_position: 1
---

# Typescript

```
- setup: tsconfig.json
    - compilerOptions: strictNullChecks: true // otherwise anything can be nullable, that not good!
    - TODO webpack or tsc?
- use interface for entities, use type | for union, use extends A,B,C {} for combining types
    - not: type and interface are very similar, it is just best practice to use interface
- use `Type | null` for nullables, use `var!` to help the compiler (assert not null)
    - small problem: bunch of classic js features return undefined such as array methods,
    optional params etc. we have to convert that
- use utility types
    - Omit<> to rewrite attr
    - ReturnType<typeof f> for mapStateToProps
    - typeof Object for style objects
    - Partial<> for configs (everything can be optional) (vs Required)
    - Record<Keys,Type> for object maps :)
    - special
        - Parameters, ConstructorParameters, Pick, NonNullable - basically to steal a type from a lib
- interfaces are
    - strict when instantiating, when passing props one by one
    - not strict when passing args, when spreading props
    - i think that's good enough
```

```ts
interface Doc {
    id: string
}
interface User {
    name: string
}
interface Props extends User, Doc {}
```

```ts
// enum to string union type

enum Event {
    AD_ENDED = 'ad-ended',
    AD_STARTED  = 'ad-started',
    DISABLE_SEEK = 'disable-seek',
    ENABLE_SEEK = 'enable-seek',
}

type EventString = `${Event}`;

// string to enum value
Event[text]
```

# Flow
- setup:
    - vscode: flow-bin, flow plugin, turn of javascript validation, // @flow
    - TODO some preprocessor to remove the types away :)
- always use {||} strict types - so that we dont have extra props (todo is it necessary?)

# Typescript vs flow
- TS inits much faster (1M loc 20s vs. 0.4M loc 1 min)
- if libs have typings it is TS (bc. of Angular), if not, we will write it in TS
- flow engine is weak (e.g. 2x ExtractReturn+| results in any, ts can handle 20x and instantly)
- yarn workspaces, yarn link
    - flow: workspaces need flow-mono-cli or config, link needs config
    - TS: out of the box
- exporting types
    - flow: needs gen-flow-files (probably bugged)
    - TS: out of the box
- TS detects unused imports, methods, vas ... flow does not
- auto-import works in both

## Typescript vs flow - less important
- TS has easier syntax (exact types, utility types, optionals)
- TS has better errors (see e1)

## TS vs FLOW
* `ts is a compiler` ...flow JS or vanilla get's transpiled with webpack anyway, so you use a compiler either way bitch.
Also no, you can use webpack for typescript no problem `ts-loader`
* TS has a faster engine
* TS has auto-import, show unused imports and code
* TS is in more libs ... ofc, if you publish a lib you want it in TS, for Angular users to pick it up
* no `flow server is dead` problems with TS
* `flow-typed update` after each checkout ... is annoying we kill it, we may not have types
* flow can have out-of-memory problems
* TS is fist class - you don't need any plugins


# Typescript vs flow - details
- flow feels slow
    - change propagates long
- type vs interface for objects
    - both can be used in both langs
    - flow best practice: type, TS best practice: interface
- extending a type and intellisense
    - TS: extends +Omit, &, bad hint, intellisense on ctrl+space
    - flow: ... +exact, &, [bad hint]((https://stackoverflow.com/questions/61851075/typescript-extending-interfaces-and-hover-hints))
- exactness
    - TS good: interfaces/types are exact when instantiating them, otherwise not, react components
    are exact but not when spreading
    - flow: not string unless $Exact
- flow bad import syntax
    - flow `import type { Override } from './ind.js'`
    - ts: `import { Override } from './ind.ts'`
- flow reported memory leaks



VYHODY ts vs flow

- podbarvi a zarve na nepouzitych importech. flow je ani nezvyrazni ... po mergi to chci
typescript
- void = undefined/null?
- never = never returns this function
- Good; ? are applied to both sides automatically, unlike flow where you ?: ?x
- ts puts any/object type in red in IDE but can compile, this is exactly what we want :)
- TODO function and arrow function types
* TS is smarter in seeing what is null and isn't (in any case we can use `x.attr!` to assert it)
```ts
function complex() {
  const x: number | null = 4
  const y = x + 2 // flow thinks can be null
}

```




# Flow vs typescript and what is fucked?
* 🐷 flow problems :)
## typescript
* object keyed by string  interface Macros { [key: string]: string | number }
- object keyed by enum    type Macros = { [key in Macro]: string | number }
- Partial<Record<MyEnum, number>>;
https://stackoverflow.com/questions/44243060/use-enum-as-restricted-key-type-in-typescript


# Convert Flow to TS
- 576,905 vscode TS
- 124,060 portal Flow
- 58s of flow initializing (after each pull!!!)

- transform [src](https://skovhus.github.io/blog/flow-to-typescript-migration/)

# TODO LATER
- ts interface does not have type for constructors :/
- pozor typ tridy je typeof Car, typ instance je Car (nemuze mit konstruktor)
- TODO in module declaration cannot import types whty?
TS errors can be cryptic
- cannot use prototype undefined === circular dependency of parent and child class
TS
- to mock easily, skip ts check on one line @ts-ignore
typescript
- typings.d.ts connot import anyting (types will the silently not work)
TS problems
- array.filter(Boolean) ... ts still assumes it can be null
TODO tsconfig.co.strictNullChecks: true .... this is not by default... and ts then does not can if it is null or not!!!! wtf :D


-------------------
