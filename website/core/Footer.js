/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Documentation</h5>
            <a href={this.docUrl('installation', this.props.language)}>
              Commencer
            </a>
            <a href={this.docUrl('contribution.html', this.props.language)}>
              Voulez-vous contribuer ?
            </a>
            <a href={this.props.config.apiUrl}>
              API Reference
            </a>
          </div>
          <div>
            <h5>Communité</h5>
            <a
              href="http://ayiyikoh.org/"
              target="_blank"
              rel="noreferrer noopener">
              @Ayiyikoh
            </a>
            <a href="https://codedivoire.slack.com">@Codedivoire</a>
          </div>
          <div>
            <h5>En plus</h5>
            <a href="https://twitter.com/@bowFramework"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
            <a href="https://bowphp.slack.com">Slack</a>
            <a href="https://github.com/bowphp">GitHub</a>
          </div>
        </section>
        <section className="copyright" dangerouslySetInnerHTML={{__html: this.props.config.copyright}}></section>
      </footer>
    );
  }
}

module.exports = Footer;
