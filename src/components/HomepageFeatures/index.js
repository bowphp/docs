import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: 'S2R',
    Svg: require('@site/static/img/idea.svg').default,
    description: (
      <Translate id="home.feature.s2r">
        Simple, Fast and Robust. Focus on your project without worrying about complexity. BowPHP offers a clear and intuitive architecture that lets you develop quickly while keeping your code clean and maintainable.
      </Translate>
    ),
  },
  {
    title: 'ORM',
    Svg: require('@site/static/img/orm.svg').default,
    description: (
      <Translate id="home.feature.orm">
        An extremely simple ORM named Barry. Interact with your database in an elegant and expressive way. Barry simplifies CRUD operations and relationships between models, making data management more natural and productive.
      </Translate>
    ),
  },
  {
    title: 'Extensible',
    Svg: require('@site/static/img/compose.svg').default,
    description: (
      <Translate id="home.feature.extensible">
        Infinitely customizable structure. Plugin support and reusable components. BowPHP adapts to your specific needs thanks to its modular architecture and package system, letting you extend functionality to fit your requirements.
      </Translate>
    ),
  },
  {
    title: 'Reactjs / Vuejs',
    Svg: require('@site/static/img/layers.svg').default,
    description: (
      <Translate id="home.feature.frontend">
        By default, Bow ships with React and Vue presets. Build modern, reactive user interfaces with your favorite JavaScript frameworks. Native integration makes it easy to develop performant, scalable full-stack web applications.
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--6 col--md-3')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img"/>
        </div>
        <div className="text--center padding-horiz--md">
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row margin-bottom--lg">
          <div className="col col--12">
            <h2 className="text--center" style={{
              fontSize: 'clamp(1.875rem, 5vw, 2.5rem)',
              fontWeight: 800,
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, var(--ifm-color-primary-darker), var(--ifm-color-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              <Translate id="home.features.title">Why choose BowPHP?</Translate>
            </h2>
            <p className="text--center" style={{
              fontSize: '1.125rem',
              color: 'var(--ifm-color-emphasis-700)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              <Translate id="home.features.subtitle">
                A modern PHP framework that combines simplicity and power to accelerate your development
              </Translate>
            </p>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
