import React from "react";

const SuggestionFeature = () => (
  <div style={{ margin: '2rem 0', padding: '1.5rem', borderRadius: '8px', background: 'var(--ifm-card-background-color)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
    <h2>Il manque quelque chose ?</h2>
    <p>
      Si vous rencontrez des problèmes avec la documentation ou si vous avez des
      suggestions pour améliorer la documentation ou le projet en général,
      veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le
      compte Twitter{" "}
      <a href="https://twitter.com/@bowframework">@bowframework</a> ou sur
      directement sur le{" "}
      <a href="https://github.com/bowphp/docs/issues">github</a>.
    </p>
  </div>
);

export default SuggestionFeature;
