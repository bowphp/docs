import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'S2R',
    Svg: require('@site/static/img/idea.svg').default,
    description: (
      <>
        Simple, Rapide et Robuste. Concentrez-vous sur votre projet sans vous soucier de la complexité. 
        Bow Framework offre une architecture claire et intuitive qui vous permet de développer rapidement 
        tout en maintenant un code propre et maintenable.
      </>
    ),
  },
  {
    title: 'ORM',
    Svg: require('@site/static/img/orm.svg').default,
    description: (
      <>
        Un ORM extrêmement simple qui se nomme Barry. Interagissez avec votre base de données de manière 
        élégante et expressive. Barry simplifie les opérations CRUD et les relations entre modèles, 
        rendant la gestion des données plus naturelle et productive.
      </>
    ),
  },
  {
    title: 'Extensible',
    Svg: require('@site/static/img/compose.svg').default,
    description: (
      <>
        Structure personnalisable à l'infini. Support de plugin et composants réutilisables. 
        Bow Framework s'adapte à vos besoins spécifiques grâce à son architecture modulaire 
        et son système de packages, vous permettant d'étendre les fonctionnalités selon vos exigences.
      </>
    ),
  },
  {
    title: 'Reactjs / Vuejs',
    Svg: require('@site/static/img/layers.svg').default,
    description: (
      <>
        Par défaut Bow est preset Reactjs et Vuejs. Créez des interfaces utilisateur modernes et 
        réactives avec vos frameworks JavaScript préférés. L'intégration native facilite le développement 
        d'applications web full-stack performantes et évolutives.
      </>
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
              Pourquoi choisir Bow Framework ?
            </h2>
            <p className="text--center" style={{
              fontSize: '1.125rem',
              color: 'var(--ifm-color-emphasis-700)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Un framework PHP moderne qui combine simplicité et puissance pour accélérer votre développement
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
