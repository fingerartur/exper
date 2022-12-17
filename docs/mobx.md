---
sidebar_position: 5
---

# MOBX 6
Mobx makes data observable.

For everything to be correctly observable it requires some boiler plate code. The most common problem with using mobx
is that people simply forget to write this boiler plate and then are surprised that it does not work.

## Basic usage


## Under the hood
Under the hood mobx creates JS Proxies for your observable objects in order to create a [publish/subscribe mechanism](https://github.com/mobxjs/mobx-react/issues/504) between observable and observer/reaction/computed.

The big question is: how does mobx know which observable attributes are being accessed in a reaction (aka how to get the result of [getDependencyTree()](https://mobx.js.org/analyzing-reactivity.html#getdependencytree)). The trick here is that mobx runs every reaction/autorun/observer once immediately when it is created/used, and it also stores in a global variable an identifier of the reaction while running. This is why autorun runs once when created and then on any change, because mobx needs to run it once first - in this first run, the accessed observables look at the global variable and this is how they know that they are being used in such and such reaction.

*Note that the source code of mobx is very poor quality. Even the function getDependencyTree is wrongly named, it should be getDependencyArray.*

## Lessons learnt
- `autorun` runs once immediately after it is created
- `reaction` mapper fn is memoized and does not get computed immediately, but on the next change. To make it compute immediately, which is often useful, use `reaction(m, e, { fireImmediately: true })`. When mapper function returns a new object memoization does not work anymore, to fix that we can redefine memoization equality function to `reaction(m, e, { equality: comparer.structural / comparer.shallow })`
- `autorun` and `reaction` can be throttled `reaction(m, e, { delay: 1000 })`
- `when` can be cancelled after a certain time `when(c, e, { timeout: 10_000 })`
- errors die inside `autorun`, `reaction`, etc., so Sentry will not catch them etc., this can be changed either by global `configure({ disableErrorBoundaries: true })` or local `reaction(m, e, { onError: (error: any) => {}})`
- `makeObservable` can be called multiple times and accumulates the effect. This works also for inheriting classes.
```ts
class Dummy {
    constructor() {
        makeObservable(this, { items: observable })
        makeObservable(this, { items2: observable })
    }
}
class Child extends Dummy {
    constructor() {
        super()
        makeObservable(this, { prices: observable })
    }
}
```
- `makeAutoObservable` works on private fields / methods, but `makeObservable` does not, because it does not compile. A workaround is to use `@ts-ignore` and make also `makeObservable` work, but that's terrible.
- `makeAutoObservable` does not work on uninitialized fields. To fix this, use a [babel config](https://mobx.js.org/installation.html#use-spec-compliant-transpilation-for-class-properties).
```ts
class Car {
  // Does not become observable, unless the babel plugin is used
  name: string | undefined

  constructor() {
    makeAutoObservable(this)
  }
}
```
- actions and computed can be overridden in sub class with the [override](https://mobx.js.org/subclassing.html) annotation.
-

## Best practices
- prevent memory/resource leaks by always disposing reactions. This leads you to very quickly need destructors in your classes.
```ts
class Car {
  disposers = []

  constructor() {
    this.disposers.push(disposer1)
    this.disposers.push(disposer2)
  }

  destroy() {
    this.disposers.forEach(disposer => disposer())
    this.disposers = []
  }
}
```

## Cons of mobx
1. **Potential bugs** - There is a bit of a danger with mobx, because it's implementation is very complicated, and as a result it has many bugs. Just read this [changelog](https://github.com/mobxjs/mobx/blob/main/packages/mobx/CHANGELOG.md#600) and you'll see how many bugs they found.
2. **Documentation lacks** - Mobx is pretty complicated, and even though it's documentation is great, it still misses some important details.
3. Mobx boiler-plate gets complicated if you use it on **classes with inheritance**, and it becomes very error-prone.
4. It is not great for old device without Proxy API. It still works, [but not fully](https://mobx.js.org/configuration.html#limitations-without-proxy-support), and that just adds extra complexity on top.
5. You cannot easily see what is observable and what is not. You have to annotate it in JSdoc (similar to @throws annotations).
6. All mobx observable objects are hard to log / debug. You have to use `toJS()` before logging / debugging - otherwise everything is full of Proxies and it is a terrible mess. In chrome there are console/debugger formatters to fix this issue, but they suck (e.g. [formatter](https://github.com/motion/mobx-formatters)).
7. In Typescript using `makeObservable` on private fields / methods causes a TS error (even though it works in Jest ironically). `makeAutoObservable` cannot be used with inheritance (neither for super nor sub class).

All in all, you can still use mobx in production, no problem. Just be aware that you will run into problems with
missing documentation, and possibly some bugs and that will slow you down.

And don't use it on old devices and don't use it with inheritance.

## Tooling
- [Dev Tools extension](https://chrome.google.com/webstore/detail/mobx-developer-tools-pro/kbkofmkelombofknjlippaelfjhbpena) to inspect data. It is not perfect.
- I made this [Mobx Prettifier](https://chrome.google.com/webstore/detail/mobx-prettier/helikjgacgldannkhjdncofmeodpabmp) to fix readability problem in console and debugger.


### TODO

- @action.bound - also does this.fn.bind(this)
- async flow
- TODO what is this injecting?
```tsx
<Provider productStore={ProductStore} uiStore={UiStore}>
  <div>{children}</div>
</Provider>

@inject('productStore')
@observer
class Items extends React.Component {
  render() {
    return <span>{this.props.productStore.itemCount}</span>
  }
}

// inject in function component
const Items = inject('productStore')(
  observer(({ productStore }) => <span>{productStore.itemCount}</span>)
)

```

- TODO mobx domain store etc. example pattern
- 1-Nx domain store, 1x UI store
- TODO overriding action in inheritance .. works?
- testing mobx getter, which depends on an autorun value which came by async request ... this is a pain... because you have to wait for the async to resolve, but how? solved by await on a random statement :)
- testAwaiter ...
- does pull-based observing ... if I want push based i can autorun() in intervals or something
- API:, annotations https://mobx.js.org/observable-state.html#available-annotations

TODO mobx-state-tree
TODO mobx-keystone
TODO https://github.com/mobxjs/mobx-state-tree
src: https://iconof.com/best-practices-for-mobx-with-react/
https://mobx.js.org/react-optimizations.html

## Pros of mobx
- It is optimized. Unlike Redux where mapper `mapStateToProps` or `useSelector` run on every dispatch and if they return a new array or a new object this can very easily lead to a rerender on every dispatch. And a second problem is if `mapStateToProps` or `useSelector` are expensive, in that case `reselect` must be used.
