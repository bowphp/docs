const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
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
  </Block>
);

const Team = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const teams = siteConfig.users.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div>
      <div className="productShowcaseSection paddingBottom">
        <h2>CEUX UTILISE BOW FRAMEWORK?</h2>
        <p>Ce projet est utilisé par toutes ces personnes influentes dans les communautés technologiques de CI.</p>
        <div className="logos">{teams}</div>
        {/* <div className="more-users">
          <a className="button" href={pageUrl('users.html', props.language)}>
            Afficher ceux qui utilisent Bow
          </a>
        </div> */}
      </div>
    </div>
  );
};

const Showcase = (props) => {
  return (
    <div>
      <div className="productShowcaseSection paddingBottom">
        <h2>BOW FRAMEWORK IN ACTION</h2>
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

const Sponsors = props => {
  if ((siteConfig.sponsors || []).length === 0) {
    return null;
  }

  const sponsors = siteConfig.sponsors.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink} target="_blank">
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>NOS SPONSORS</h2>
      <p>Ce projet est parrainé par ces START-UP TECH.</p>
      <div className="logos">{sponsors}</div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    const language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer" style={{textAlign: "center", fontSize: "25px"}}>
          <strong>Bow Framework est apprécié par +{siteConfig.numberOfFollowers} Développeur(se)s</strong>
        </div>
        <div className="mainContainer" style={{backgroundColor: "#f0f0f0"}}>
          <Features />
        </div>
        <div className="mainContainer">
          <Sponsors language={language} />
        </div>
        <div className="mainContainer">
          <Showcase language={language} />
        </div>
        <div className="mainContainer">
          <Team language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
