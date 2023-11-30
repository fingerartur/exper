---
sidebar_position: 5
---

## Vue 2

### Components
[Components.](https://v2.vuejs.org/v2/guide/components.html)

### state

### Props

Passing props.
(TODO how to pass props to state that is the question.)

### Props and state

### For loop

```jsx
<blog-post
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
  :content="post.content"
  :publishedAt="post.publishedAt"
  :comments="post.comments"
></blog-post>
```

### Vue syntax aliases

Passing props:

```jsx
<blog-post
  :key="post.id"
  v-bind:key="post.id"
></blog-post>
```

Listening to events:

```jsx
<blog-post
  @click="() => {}"
  v-on:click="() => {}"
></blog-post>
```

### Events

HTML events. There is a whole shitload of goodies to work with events. `v-on:click.prevent/stop` etc.

Events can also be listened once `v-on:click.once` .

TODO strange callback syntax `v-on:click={hello('message')}`

Emitting [events](https://v2.vuejs.org/v2/guide/components-custom-events.html#ad).


### Html Class
[Classes](https://v2.vuejs.org/v2/guide/class-and-style.html#ad) are pretty straight forward.

But passing a class to a custom component passes it to the to-level element of that component.

Also, it is possible to pass an object of booleans or an array or array of these objects.


### Two way data binding.
[`v-model`](https://v2.vuejs.org/v2/guide/forms.html?) for input/textarea/select or custom (for custom inputs). 

Extra: There can be only **one** `v-model` per component. If you want multiple, use the 

### Rendering children.

[Slots](https://v2.vuejs.org/v2/guide/components-slots.html#ad) are used for that. There can also be [named slots](https://v2.vuejs.org/v2/guide/components-slots.html#ad).

### Reactivity

Reactivity is something missing in React, which is all about immutability. Vue basically has built-in mobx.
`data() {}` returns an observable, arrays are proxied.

Special: Most observable array methods mutate it in-place, but some do not (slice, etc.).


### Re-rendering.

TODO

### Rendering fragment.

```jsx
<template/>
```
### TODO

Passing data to Routes.

Keys.

Component lifecycle and re-usability.
TODO test with reused "input" how the lifecycle looks.

Observable state.

Hooks?

Vuex?

ROuter.

TODO ref
