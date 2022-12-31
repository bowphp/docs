import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SponsorsFeatures from '@site/src/components/SponsorsFeatures';
import styles from './index.module.css';
import TeamFeatures from '../components/TeamFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="hero__subtitle" style={{fontSize: 15, borderLeft: "5px solid red", display: "inline-block", paddingLeft: 3}}>
          Bowphp a été conçu dès le départ pour être facilement installé et utilisé pour rendre votre application opérationnel rapidement.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tutorial">
            Tutoriel - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <SponsorsFeatures />
      <main>
        <HomepageFeatures />
        <TeamFeatures />
      </main>
    </Layout>
  );
}
