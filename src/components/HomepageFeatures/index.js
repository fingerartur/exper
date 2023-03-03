import clsx from 'clsx';
import React from 'react';
import { SmartImage } from '../smartImage';
import styles from './styles.module.css';

const FEATURE_LIST = [
  {
    title: 'Tools',
    src: '18813486.png',
    description: (
      <>
        Webpack, Eslint, Test runners, CI.
      </>
    ),
  },
  {
    title: 'Javascript',
    src: '20757939.png',
    description: (
      <>
        Javascript, Typescript, React, Redux, Mobx, etc.
      </>
    ),
  },
  {
    title: 'Backend / serverless',
    src: '24279176.png',
    description: (
      <>
        Firebase, Node.js
      </>
    ),
  },
];

function Feature({src, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      {/* <div className="text--center">
        <SmartImage src={src} />
      </div> */}
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FEATURE_LIST.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
