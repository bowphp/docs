/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} alt="Project Logo" />
  </div>
);

const ProjectTitle = () => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl("bow.jpg")} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href="/api/master">API</Button>
            <Button href={docUrl('installation', language)}>Documentation</Button>
            <Button href="https://github.com/bowphp">Github</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = () => (
  <Block layout="fourColumn" background="#b6b6b6">
    {[
      {
        content: 'Simple, Rapide et Robuste. <br/>Concentrez-vous sur votre projet.',
        imageAlign: 'top',
        image: imgUrl("idea.svg"),
        title: 'S2R',
      },
      {
        content: "Un ORM extrêmement simple qui se nomme `Barry`.",
        imageAlign: 'top',
        image: imgUrl("orm.svg"),
        title: 'ORM',
      },
      {
        content: 'Structure personnalisable à l\'infini. <br/>Support de plugin',
        imageAlign: 'top',
        title: 'Extensible',
        image: imgUrl("compose.svg"),
      },
      {
        content: 'Par défaut Bow est preset <br/>Reactjs et Vuejs.',
        imageAlign: 'top',
        image: imgUrl("layers.svg"),
        title: 'Reactjs / Vuejs',
      }
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.users.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom" style={{backgroundColor: "b6b6b6"}}>
      <h2>Qui utilise Bow ?</h2>
      <p>Ce projet est utilisé par toutes ces personnes.</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          Afficher ceux qui utilisent Bow
        </a>
      </div>
    </div>
  );
};

const Partners = props => {
  if ((siteConfig.partainers || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.partainers.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom" style={{backgroundColor: "b6b6b6"}}>
      <h2>Supports</h2>
      <p>Ce projet est support par ces communautés.</p>
      <div className="logos">{showcase}</div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    const language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer" style={{textAlign: "center", fontSize: "25px", backgroundColor: "#303030", color: "#fff"}}>
          <strong>Bow Framework est apprécié par 150+ Développeur(se)s</strong>
        </div>
        <div className="mainContainer" style={{backgroundColor: "#f0f0f0"}}>
          <Features />
        </div>
        <div className="mainContainer">
          <Showcase language={language} />
        </div>
        <div className="mainContainer" style={{textAlign: "center", fontSize: "13px", backgroundColor: "#eee"}}>
          <SplashContainer>
            <div className="inner">
              <h4 className="projectTitle" style={{fontSize: "30px"}}>
                Franck DAKIA
                <small>Développeur Full Stack</small>
              </h4>
              <PromoSection>
                <MarkdownBlock>
                  **Franck DAKIA** est un Développeur Full Stack basé actuellement en Afrique, Côte d'ivoire, Abidjan. Passionné de code, et développement collaboratif, Speaker, Formateur et Membre de plusieurs communautés de développeurs.
                </MarkdownBlock>
                <MarkdownBlock>
                  **SVP s'il y a un bogue sur le projet veuillez me contacter par email ou laissez moi un message sur le [slack](https://bowphp.slack.com).**
                  Contact: [dakiafranck@gmail.com](mailto:dakiafranck@gmail.com) - [@franck_dakia](https://twitter.com/franck_dakia)
                </MarkdownBlock>
              </PromoSection>
            </div>
          </SplashContainer>
        </div>
      </div>
    );
  }
}

module.exports = Index;
