import React from 'react';
import { SmartImage } from './smartImage';

const style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
}

export function Stars({ srcs }) {
  return (
    <div style={style}>
      {srcs.map(src => {
        return <SmartImage key={src} src={src} />
      })} 
    </div>
  );
}
