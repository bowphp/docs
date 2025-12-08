import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const TeamFeatures = () => {
  const {siteConfig} = useDocusaurusContext();

  if ((siteConfig.customFields.users || []).length === 0) {
    return null;
  }

  return (
    <section className={styles.features}>
      <div className="container text--center">
        <div className="row margin-bottom--lg">
          <div className="col col--12">
            <h2 className={styles.sectionTitle}>
              Ceux qui utilisent Bow Framework ?
            </h2>
            <p className={styles.sectionDescription}>
              Ce projet est utilisé par toutes ces personnes influentes dans les
              communautés technologiques de Côte d'ivoire et dans reste du Monde.
            </p>
          </div>
        </div>
        <div className="row padding-horiz--md">
          {siteConfig.customFields.users.map((user, index) => (
            <div className={clsx('col', styles.teamPadding)} key={index}>
              <div className={styles.showcaseUser}>
                <div className="text--center">
                  <a href={user.infoLink}>
                    <img src={user.image} alt={user.caption} title={user.caption} />
                  </a>
                  <p>{user.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamFeatures;
