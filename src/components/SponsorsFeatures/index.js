import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Feature({caption, infoLink, image}) {
  return (
    <a href={infoLink}><img src={image} alt={caption}/></a>
  );
}

export default function SponsorsFeatures() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col')}>            
            <div className="sponsors">
              {siteConfig.customFields.sponsors.map((sponsor, idx) => (
                <Feature key={idx} {...sponsor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
