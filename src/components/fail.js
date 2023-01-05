import React from 'react';

export const Fail = (props) => {
  return (
    <div>
      <span className="failEmoji">🐷</span>
      <span className="fail">
        {props.children}
      </span>
    </div>
  );
}
