---
sidebar_position: 4
---

# MOBX 5.15
- observable
- attribute @observable - object, arrays, class instances, primitives
- var numbers = observable([1, 2, 3])
- mobx creates an enhanced copy of the attribute/array/Object
- toJS() in order to convert back to pure JS and e.g. log to console
-  TODO is it a JS proxy?
- @computed - function, getter. Should be called lazily (only when im listening to it)
- Observing
- const Todo = observer(({ todo }) => (<h1>{todo}</h1>), @observer class TodoListView extends Component {
- import { observer } from "mobx-react"
- probably via HOC + forceUpdate
- observables that are accessible to the component, but not actually read, won't ever cause a re-render.
- autorun
- autorun(() => {console.log()}
- const disposer = autorun(reactFunction)
- autorun(() => {}, { delay: 300}) // delay is throttling ;)
- onError ... TODO isnt it better to use try {} catch{}? does it work?
- reaction
- const disposer = reaction(mapFunction, reactFunction, options)
- when
- const disposer = when(predicateFunction, reactFunction)
- !! it gets called only once!, should be called whenOnce()
- action = transaction (atomicity, less recomputations)
- const do  = action(() => { x=1 y=1 }) - mark event handlers as action (as high as possible :))
- runInAction(() => {})
- @action
- @action.bound - also does this.fn.bind(this)
- use this and keep actions on the store class, this is best practice
- async flow - very hard to use actually
- TODO
- Pass store down via react context - best practice

```
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

- There will be an makeAutoObservable(this, exceptions?) that will default to observable for fields, computed for getters, action for functions
- toJS
- for console.log
- for passing prop to non-mobx/non-observer component
- best prac
- 1-Nx domain store, 1x UI store
- backend integration should be part of store
- example domain store
- todoStore ma firebase umi smazat, load, create, update pres firebase
- todos maji referenci na todoStore a tim padem se umi smazat
- umi se samo ulozit, smazat
- implementuje from/toJSON
- example UI store
- theme
- language
- step of wizard
- network state
- pending request indication
- interations between UserStore and TodoStore can be done by using RootStore and passing refs to each store
- testing should be normal unit testing (personal note: maybe use action(() => {}), but that's all)
- import { trace } from "mobx"
- WTF
- autorun(() => {    console.log(message.likes[0]) }) // will not work if it is out of bounds
- autorun(() => { //observable.map() // works fine for undefined key/value pair )
    console.log(twitterUrls.get("Sara"))
})

# mobx6
- decorators are deprecated
- mobx cannto makeObservable private fields unless thay are in constructor
- observable cannot be used for call that has super classes or sub classes
- @observable private x: number; .... will not work! (because undefined) ... wtf :(
- does work with makeObservable, makeAutoObservable
- testing mobx getter, which depends on an autorun value which came by async request ... this is a pain... because you have to wait for the async to resolve, but how? solved by await on a random statement :)
- does pull-based observing ... if I want push based i can autorun() in intervals or something
- always run in action after await !!!


TODO mobx tips and tricks
   TODO something about proxy support https://mobx.js.org/understanding-reactivity.html
TODO mobx-react-lite
TODO mobx-state-tree
TODO mobx-keystone
TODO https://github.com/mobxjs/mobx-state-tree
src: https://iconof.com/best-practices-for-mobx-with-react/
https://mobx.js.org/react-optimizations.html

MOBx vs REDUX/REACT
- react likes passing primitives as props (better React.memo), mobx likes passing object references (better for observer())
- redux needs selectors to access deep state, mobx does not need anything )

MOBX
	* sometimes you don't want every method to be transactioned action

```
	makeAutoObservable(this, {
			onPlaybackEnded: false,
		})
	}
	onPlaybackEnded() { // not action
		this.triggerEvent('playbackEnded') // action
		// observers are notified
		this.playNextSource() // action
	}
```

- TODO see mobx.test.ts
