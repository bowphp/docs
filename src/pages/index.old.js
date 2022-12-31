import React from 'react';
import Layout from '@theme/Layout';

const config = require("../../docusaurus.config.js");

function imgUrl(img) {
  return `${config.baseUrl}img/${img}`;
}

const Button = (props) => {
  return (
    <div className="pluginWrapper buttonWrapper">
      <a className="button" href={props?.href} target={props?.target}>
        {props?.children}
      </a>
    </div>
  );
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = (props) => (
  <div className="homeContainer" style={{padding: 50}}>
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props?.children}</div>
    </div>
  </div>
);

const Logo = (props) => (
  <div className="projectLogo">
    <img src={props?.source} alt="Project Logo" />
  </div>
);

const ProjectTitle = () => (
  <h2 className="projectTitle">
    {config.title}
    <small>{config.tagline}</small>
  </h2>
);

const HomeSplash = () => {
  return (
    <SplashContainer>
      <Logo source={imgUrl("bow.jpg")} />
      <div className="inner">
        <ProjectTitle />
      </div>
    </SplashContainer>
  );
}

const Features = () => (
  <Layout layout="fourColumn" background="#b6b6b6">
    {[
      {
        content: 'Simple, Rapide et Robuste. Concentrez-vous sur votre projet.',
        imageAlign: 'top',
        image: imgUrl("idea.svg"),
        title: 'S2R',
      },
      {
        content: "Un ORM extrêmement simple qui se nomme Barry.",
        imageAlign: 'top',
        image: imgUrl("orm.svg"),
        title: 'ORM',
      },
      {
        content: 'Structure personnalisable à l\'infini. Support de plugin',
        imageAlign: 'top',
        title: 'Extensible',
        image: imgUrl("compose.svg"),
      },
      {
        content: 'Par défaut Bow est preset Reactjs et Vuejs.',
        imageAlign: 'top',
        image: imgUrl("layers.svg"),
        title: 'Reactjs / Vuejs',
      }
    ]}
  </Layout>
);

const Team = () => {
  if ((config.users || []).length === 0) {
    return null;
  }

  const teams = config.users.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div>
      <div className="productShowcaseSection paddingBottom">
        <h2 style={{color: "#181818"}}>CEUX QUI UTILISENT BOW FRAMEWORK?</h2>
        <p>
          Ce projet est utilisé par toutes ces personnes influentes dans les
          communautés technologiques de Côte d'ivoire et dans reste du Monde.
        </p>
        <div className="logos">{teams}</div>
      </div>
    </div>
  );
};

const Showcase = () => {
  return (
    <div>
      <div className="productShowcaseSection paddingBottom">
        <h2 style={{color: "#181818"}}>BOW FRAMEWORK IN ACTION</h2>
        <p>Utilisation de l'API de traduction.</p>
        <script
          id="asciicast-zxbid2giZdnaJjOhOkALKBC8G"
          src="https://asciinema.org/a/zxbid2giZdnaJjOhOkALKBC8G.js"
          data-rows="30"
          data-speed="2"
          data-theme="tango"
          data-t="10"
          data-loop="true"
          async/>
      </div>
    </div>
  )
}

const Sponsors = () => {
  if ((config.sponsors || []).length === 0) {
    return null;
  }

  const sponsors = config.sponsors.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink} target="_blank">
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2 style={{color: "#181818"}}>NOS SPONSORS</h2>
      <p>Ce projet est parrainé par ces START-UP TECH.</p>
      <div className="logos">{sponsors}</div>
    </div>
  );
};

const IndexPage = (props) => {
  return (
    <div>
      <HomeSplash language={props?.language || ''} />
      <div className="mainContainer" style={{textAlign: "center", fontSize: "25px"}}>
        <strong>Bow Framework est apprécié par +{config.numberOfFollowers} Développeur(se)s</strong>
      </div>
      <div className="mainContainer" style={{backgroundColor: "#f0f0f0"}}>
        <Features />
      </div>
      <div className="mainContainer">
        <Sponsors />
      </div>
      <div className="mainContainer" style={{backgroundColor: "#f0f0f0"}}>
        <Showcase />
      </div>
      <div className="mainContainer">
        <Team />
      </div>
    </div>
  );
}

export default IndexPage;
