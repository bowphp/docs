const fans = require('./communauty');
const users = require('./users');
const sponsors = require('./sponsors');

const siteConfig = {
  title: 'Bow Framework', // Title for your website.
  tagline: 'Simplify Your Web Development',
  url: 'https://bowphp.com', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'bowphp.com',
  organizationName: 'bowphp',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'installation', label: 'Documentation'},
    {page: 'sponsors', label: 'Sponsors'},
    {href: 'https://bowphp.com/api/master', label: 'API'},
    {href: 'https://github.com/bowphp', label: 'Github'},
    {href: 'https://join.slack.com/t/bowphp/shared_invite/zt-9c90n2iv-Rx1zdUG0YRAnDULhgELD0g', label: 'Rejoignez-nous'}
  ],

  apiUrl: "https://bowphp.com/api/master",

  // If you have users set above, you add it here:
  users,
  sponsors,
  fans,

  /* path to images for header/footer */
  headerIcon: 'img/bow.jpg',
  footerIcon: 'img/bow.jpg',
  favicon: 'img/bow.jpg',

  /* Colors for website */
  colors: {
    primaryColor: '#181818', // #d80027
    secondaryColor: '#404040', // #404040
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/papac">Franck DAKIA</a>`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'github',
    // androidstudio
    // atom-one-dark
    // dracula
    // atom-one-dark
  },

  // version "4.1.x"

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    "https://www.googletagmanager.com/gtag/js?id=UA-97409420-1",
    'https://buttons.github.io/buttons.js',
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/script.js"
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/bow.jpg',
  twitterImage: 'img/bow.jpg',

  gaTrackingId: "UA-97409420-1",

  defaultVersionShown: "4.x",

  twitter: true,
  twitterUsername: "franck_dakia",

  // editUrl: "https://github.com/bowphp/docs/edit/4.0/docs",
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/bowphp/app',

  numberOfFollowers: 1500
};

module.exports = siteConfig;
