import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';

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
              <Translate id="home.team.title">Who uses BowPHP?</Translate>
            </h2>
            <p className={styles.sectionDescription}>
              <Translate id="home.team.description">
                This project is used by all these influential people in the tech communities of Côte d'Ivoire and around the world.
              </Translate>
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
