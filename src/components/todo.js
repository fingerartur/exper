import React from 'react';

export const Todo = (props) => {
  return (
    <div>
      <span className="todoEmoji">TODO</span>
      <span className="todo">
        {props.children}
      </span>
    </div>
  );
}
