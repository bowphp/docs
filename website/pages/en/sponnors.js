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

class Sponnors extends React.Component {
  render() {
    if ((siteConfig.users || []).length === 0) {
      return null;
    }

    const partainers = siteConfig.partainers.map(user => {
      return {
        content: user.description,
        imageAlign: 'top',
        image: user.image,
        title: '<a href="' + user.infoLink + '"> ' + user.caption + '</a>'
      }
    });

    return (
      <div className="mainContainer">
          <div className="showcaseSection">
            <div className="prose">
              <h1>NOS SPONNORS?</h1>
              <p>Ce projet est sponsorisé par ces Start-UP</p>
            </div>
          </div>
          <Block layout="fourColumn" background="#b6b6b6">{partainers}</Block>
          <div className="showcaseSection">
            <p>Devez vous aussi sponnor</p>
            <a href="mailto:hello@bowphp.com" className="button">
              Ajouter votre entreprise
            </a>
          </div>
      </div>
    );
  }
}

module.exports = Sponnors;
