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
          <div className="col">
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p
              className="hero__subtitle"
              style={{
                fontSize: 15,
                borderLeft: "10px solid #452c2c",
                display: "inline-block",
                paddingLeft: 10,
              }}
              dangerouslySetInnerHTML={{
                __html: siteConfig.customFields.landingText,
              }}
            ></p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to={siteConfig.customFields.startTutorial}
              >
                Tutoriel - 5min ⏱️
              </Link>
            </div>
          </div>
          <div className="col" style={{ textAlign: "left" }}>
            <CodeBlock
              language="php"
              title="routes/app.php"
              showLineNumbers
            >
              {`<?php
use App\Controllers\WelcomeController;

$app->get('/', WelcomeController::class)->name('app.index');`}
            </CodeBlock>
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
      <HomepageHeader />
      <SponsorsFeatures />
      <main>
        <HomepageFeatures />
        <TeamFeatures />
      </main>
    </Layout>
  );
}
