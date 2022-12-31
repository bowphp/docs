import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'S2R',
    Svg: require('@site/static/img/idea.svg').default,
    description: (
      <>
        Simple, Rapide et Robuste. Concentrez-vous sur votre projet.
      </>
    ),
  },
  {
    title: 'ORM',
    Svg: require('@site/static/img/orm.svg').default,
    description: (
      <>
        Un ORM extrêmement simple qui se nomme Barry.
      </>
    ),
  },
  {
    title: 'Extensible',
    Svg: require('@site/static/img/compose.svg').default,
    description: (
      <>
        Structure personnalisable à l'infini. Support de plugin
      </>
    ),
  },
  {
    title: 'Reactjs / Vuejs',
    Svg: require('@site/static/img/layers.svg').default,
    description: (
      <>
        Par défaut Bow est preset Reactjs et Vuejs.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img"/>
      </div>
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
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
