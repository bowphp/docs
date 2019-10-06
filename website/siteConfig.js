/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Abou KONE',
    description: "Frontend Architect, CTO @akilTech. Magician @codedivoire.",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: 'https://avatars1.githubusercontent.com/u/582061?s=460&v=4',
    infoLink: 'https://github.com/devakone',
    pinned: true,
  },
  {
    caption: 'Franck DAKIA',
    description: "Web and Mobile Developer, DevOps Lover, Trainer and Coach in Web Development. Creator of Bow Framework",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: 'https://avatars1.githubusercontent.com/u/9353811?s=460&v=4',
    infoLink: 'https://github.com/papac',
    pinned: true,
  },
  {
    caption: 'François KOBON',
    description: "#Coder. #Builder. #Hacker - Free & Open Source Software enthusiast (#ilovefs, #FOSS) - Innovation and Social Transformation - Ivorian - Jesus's Lovers",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: 'https://avatars1.githubusercontent.com/u/10742869?s=460&v=4',
    infoLink: 'https://github.com/fkobon',
    pinned: true,
  },
  {
    caption: 'Salomon DION',
    description: "Aspiring Cloud Engineer with strong interest in software development and data science and I’m a member of the core development team.",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: 'https://avatars3.githubusercontent.com/u/25983025?s=460&v=4',
    infoLink: 'https://github.com/mrdionjr',
    pinned: true,
  }
];

const partainers = [
  {
    caption: 'Fablab Ayiyikoh',
    description: "",
    image: 'http://ayiyikoh.org/wp-content/uploads/2018/04/logo-main-dummy.png',
    infoLink: 'http://ayiyikoh.org/',
    pinned: true,
  },
  {
    caption: 'Babilab',
    description: "",
    image: 'http://ayiyikoh.org/wp-content/uploads/2018/04/logo-main-dummy.png',
    infoLink: 'http://ayiyikoh.org/',
    pinned: true,
  },
]

const siteConfig = {
  title: 'Bow Framework', // Title for your website.
  tagline: 'Simplify Your Web Development',
  url: 'https://bowphp.github.io', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'bowphp.github.io',
  organizationName: 'bowphp',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'installation', label: 'Documentation'},
    // {page: 'users', label: 'Utilisateur'},
    // {blog: true, label: 'Blog'},
    {href: 'https://github.com/bowphp', label: 'Github'},
    {href: 'https://bowphp.github.io/api/master', label: 'API'},
  ],

  apiUrl: "https://bowphp.github.io/api/master",

  // If you have users set above, you add it here:
  users,

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
  copyright: `Copyright © ${new Date().getFullYear()} Franck DAKIA`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    "https://www.googletagmanager.com/gtag/js?id=UA-127753823-1",
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

  gaTrackingId: "UA-127753823-1",

  defaultVersionShown: "4.x",

  twitter: true,
  twitterUsername: "franck_dakia",

  // editUrl: "https://github.com/bowphp/docs/edit/4.0/docs",
  enableUpdateTime: false,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/bowphp/app',

  numberOfFollowers: 220
};

module.exports = siteConfig;
