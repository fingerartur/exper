---
sidebar_position: 6
---


# React 17 🎖️

## Hooks

* why: because it is a better way of reacting to prop changes than lifecycle methods. All `effect` logic is in one place. Can be reused, composed, tested
  * all logic in a separate hook
  * hooks can be reused
  * hooks can be used inside other hooks
  * hooks can be tested (`react-hooks-testing-library`)
* `useMemo(, [])` ... utility like memoize-one
* `useCallback(, [])` ... use for all callbacks! ... don't forget to put empty array for no deps!
* to pass up ref ... forwardRef + useImperativeHandle
* `useRef()`
    * for element ref (`ref=ref`)
    * for anything ... e.g. as private (non-state) variable/field
    * to react to its changes use `ref=factory method`
* `useEffect(() => {  return function cleanup(){} }, [])` ... never forget to return cleanup, especially when setting timers
* `useLayoutEffect`
    * eg. I change the number of cells, then I want to get the width of parent element
        maybe to render a scroll arrow ... if I don't use useLayoutEffect, there will be 2x browser paint and a visual glitch
* `React.memo()` - always use
* `useState(default)` - changing default does NOTHING

### Implementation details

* `setStateX` causes a rerender only if it sets is a new value
* `setStateX in useEffect` causes a rerender each time (if new value)
* we can make a `setState + useEffect` infinite loop, it will log error in StrictMode, but otherwise work
* `useEffect vs useLayoutEffect`
  * `useEffect` = render -> DOM mutation -> paint -> useEffect called -> maybe another render
    * sometimes useEffect works the same as useLayoutEffect, (we have multiple renders but only on repaint) but there is no guarantee, that's the point
  * `useLayoutEffect` = render -> DOM mutation -> useLayoutEffect called -> maybe another render -> maybe DOM mutation -> paint

## Redux
* `useSelector, useDispatch, (useStore)`
* `connect(mapStateToProps, mapDispatchToProps)` subscribes to store changes, calls forceRender when mapped state changed
* cons
  * if we have 100s of living components, it can slow us down `mapStateToProps, useSelector` are recomputed on each change
  * if `mapStateToProps, useSelector` are slow it can slow us down. Can be mitigated by `reselect`

## Others

* `ErrorBoundary` - good, use it. But remember, it only catches errors during render
  * errors during `onClick` etc are NOT handled
* `<StrictMode/>` - enables react checks in subtree in dev mode (will write out warning about using deprecated stuff or about infinite loops, etc. things like this. In production it is off, in order not to decrease perf)

## WTFs
* 🐷 `useEffect(() => {})` - does nothing!, should be forbidden
* 🐷 passing component ref up is too wordy (`useRef, forwardRef, useImperativeHandle`)
* 🐷 hooks and redux-hooks are very wordy, especially with reselect
* 🐷 everything renders 2x - caused by `<StrictMode/>`
* 🐷 redux connect kill refs, unless you hack it like this `connect(mapStateToProps, null, null, { forwardRef: true })(Components)`


### TODO
* redux
  * returning from middleware is an antipattern?
* react fiber rendering engine
* reselect
* mobx
* (recompose)
* 🎃 TODO other hooks
* 🎃 TODO useful hook libs
    * @rehooks/component-size (may need polyfill ResizeObserver)
    * @rehooks/window-scroll-position
    * @rehooks/local-storage
    * react-use-form-state
    * react-fetch-hook
    * use-onclickoutside
* 🎃 TODO https://usehooks.com/
* cons
* too wordy to make private attr (useRef), to create callback (useCallback), to pass up ref (useImperativeHandle, forwardRef)
* - never never return in react component above hook!
# 🎃 TODO libs react-hook-form

# Testing
* @testing-library/react-hooks
* enzyme
* jest

# Redux

# react-router, @reach/router
- it uses history object from history lib, and this way it can listen to route changes and show only routed components.
It is not possible to listen to vanilla history
- in order to work we have to navigate using the history object `useHistory(), history.replace()`, using vanilla `history.pushState()` will not be picked up by the router
- in the background the router calls `history.pusState()`
```jsx
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route path="/user/:id">
        <Component>
      </Route>
    </Switch>
  </Router>
```
- reach/router has a bit different and weird api
```jsx
  <Router>
    <Switch>
      <Component path="/user/:id">
    </Switch>
  </Router>
```
- routers can be nested no problem
- route options
  - `location.hash=` based `google.cz/#/user/me`
  - `pushState()` based `google.cz/user/me`. Here is a bit of a problem when deploying to a subdirectory `google.cz/subdir/user/me`, but it can be configured `createBrowserHistory({ basepath: '/subdir' })`
  - in-memory - does not change routes at all, cannot be bookmarked
- routers can be nested and even use different history objects and uri shape, but of course if I use history object A it
will influence only router A

# xx
* connect explained https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e
* why hooks good https://blog.bitsrc.io/why-we-switched-to-react-hooks-48798c42c7f
* react rendering explained https://github.com/reactjs/react-basic
* react fiber explained https://github.com/acdlite/react-fiber-architecture


# REACT tips
- name the components same as file names! (and make sure they are not anonymous too))
- TODO for settings up a new project use yarn or npm? ... what is up with yarn publish?,
- however yarn workspaces are very nice )
- find . -name "*.jsx" | rename 's/.jsx/.tsx/'


## reselect
// called always --- same as our code
channelsSelector
palyerSelector
// /selectors

// memoized -- should be not performance drawback for 1-5 args
// no advantage for 2-6 operation mappings

// can be shared only if it is not based on args!!! --> only one computation for one change across all components
palyedChannelMapper
// /reselect_mappers


# hoc
````
export function withVideosToItems<P extends PropsOut>(WrappedComponent: ComponentType<PropsOut>) {
    // component
    return function withVideosToItems(props: Omit<PropsOut, 'items'> & PropsIn) {
        return <WrappedComponent {...props} items={props.videos} />
    }
}


// Omit is important, therefore TS does not require omitted prop to be inserted/present :)
```
