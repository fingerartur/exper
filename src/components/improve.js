import React from 'react';

export const Improve = (props) => {
  return (
    <div>
      <span className="improveEmoji">💰</span>
      <span className="improve">
        {props.children}
      </span>
    </div>
  );
}
