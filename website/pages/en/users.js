/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

class Users extends React.Component {
  render() {
    if ((siteConfig.users || []).length === 0) {
      return null;
    }

    const editUrl = `${siteConfig.repoUrl}/edit/master/website/siteConfig.js`;
    const users = siteConfig.users.map(user => {
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
              <h1>QUI UTILISE BOW FRAMEWORK?</h1>
              <p>Ce projet est utilisé par beaucoup de gens</p>
            </div>
          </div>
          <Block layout="fourColumn" background="#b6b6b6">{users}</Block>
          <div className="showcaseSection">
            <p>Utilisez-vous ce projet?</p>
            <a href="mailto:dakiafranck@gmail.com" className="button">
              Ajouter votre entreprise
            </a>
          </div>
      </div>
    );
  }
}

module.exports = Users;
