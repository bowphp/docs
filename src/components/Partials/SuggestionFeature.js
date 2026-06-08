import React from "react";
import Translate from "@docusaurus/Translate";

const SuggestionFeature = () => (
  <div style={{ margin: '2rem 0', padding: '1.5rem', borderRadius: '8px', background: 'var(--ifm-card-background-color)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
    <h2>
      <Translate id="suggestion.title">Is something missing?</Translate>
    </h2>
    <p>
      <Translate
        id="suggestion.body"
        values={{
          twitter: (
            <a href="https://twitter.com/@bowframework">@bowframework</a>
          ),
          github: <a href="https://github.com/bowphp/docs/issues">github</a>,
        }}
      >
        {"If you run into problems with the documentation or have suggestions to improve the documentation or the project in general, please open an issue for us, or send a tweet mentioning the Twitter account {twitter} or directly on {github}."}
      </Translate>
    </p>
  </div>
);

export default SuggestionFeature;
