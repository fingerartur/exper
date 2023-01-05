import React, { useReducer } from 'react';

// @ts-ignore
const URI_DEFAULT = require('@site/static/img/jslogo.png').default

function reducer(state, action) {
  if (state === URI_DEFAULT) {
    return action.src
  } else {
    return URI_DEFAULT
  }
}

const style = {
  height: 200,
  filter: 'drop-shadow(3px 10px 0.45rem rgb(109, 109, 109))'
}

export function SmartImage({ src }) {
  const [state, dispatch] = useReducer(reducer, URI_DEFAULT);

  const toggle = () => {
    const URI_HIDDEN = require(`@site/static/img/hidden/${src}`).default
    // @ts-ignore
    dispatch({ src: URI_HIDDEN })
  }

  return (
    <img src={state} style={style} role="img" onClick={toggle} />
  );
}
