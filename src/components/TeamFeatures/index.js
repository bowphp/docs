import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const TeamFeatures = () => {
  const {siteConfig} = useDocusaurusContext();

  if ((siteConfig.customFields.users || []).length === 0) {
    return null;
  }

  const teams = siteConfig.customFields.users.map((user, index) => (
    <div className={clsx('col')} key={index}>
      <div className="text--center">
        <a href={user.infoLink} key={user.infoLink}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      </div>
    </div>
  ));

  return (
    <section className={styles.features}>
      <div className="container text--center">
        <div className="row">
          <div className="col">
            <h2 style={{color: "#181818"}}>CEUX QUI UTILISENT BOW FRAMEWORK?</h2>
            <p>
              Ce projet est utilisé par toutes ces personnes influentes dans les
              communautés technologiques de Côte d'ivoire et dans reste du Monde.
            </p>
          </div>
        </div>
        <div className="row">
          {siteConfig.customFields.users.map((user, index) => (
            <div className={clsx('col', styles.teamPadding)} key={index}>
              <div className="text--center">
                <a href={user.infoLink} key={user.infoLink}>
                  <img src={user.image} alt={user.caption} title={user.caption} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamFeatures;
