const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const siteConfig = require(`${process.cwd()}/siteConfig.js`);

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

class Sponsors extends React.Component {
  render() {
    if ((siteConfig.users || []).length === 0) {
      return null;
    }

    const sponsors = siteConfig.sponsors.map(user => {
      return {
        content: user.description,
        imageAlign: 'top',
        image: user.image,
        title: '<a href="' + user.infoLink + '" target="_blank"> ' + user.caption + '</a>'
      }
    });

    return (
      <div className="mainContainer">
          <div className="showcaseSection">
            <div className="prose">
              <h2>NOS SPONSORS</h2>
              <p>Ce projet est parrainé par ces START-UP TECH.</p>
            </div>
          </div>
          <Block layout="fourColumn" background="#b6b6b6">{sponsors}</Block>
          <div className="showcaseSection">
            <p>Devez vous aussi <b>Sponsor</b> ?</p>
            <a href="mailto:papac@bowphp.com" className="button">
              Ajouter votre entreprise
            </a>
          </div>
      </div>
    );
  }
}

module.exports = Sponsors;
