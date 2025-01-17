import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SponsorsFeatures from '@site/src/components/SponsorsFeatures';
import styles from './index.module.css';
import TeamFeatures from '../components/TeamFeatures';
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col text--center">
            <div className="text--center">
              <img src={siteConfig.favicon} style={{ width: 250 }} alt={siteConfig.title} title={siteConfig.title}/>
            </div>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p
              className="hero__subtitle"
              style={{
                fontSize: 20,
                display: "inline-block"
              }}
              dangerouslySetInnerHTML={{
                __html: siteConfig.customFields.landingText,
              }}
            ></p>
          </div>
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
      <HomepageHeader/>
      <SponsorsFeatures />
      <HomepageFeatures />
      <TeamFeatures />
    </Layout>
  );
}
