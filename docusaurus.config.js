import { themes as prismThemes } from "prism-react-renderer";
const versions = require("./versions.json");

const isDev = process.env.NODE_ENV === "development";

const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === "deploy-preview";

// Netlify branch deploy like "docusaurus-v2"
const isBranchDeploy =
  !!process.env.NETLIFY && process.env.CONTEXT === "branch-deploy";

// Used to debug production build issues faster
const isBuildFast = !!process.env.BUILD_FAST;

const baseUrl = process.env.BASE_URL ?? "/";

function getNextVersionName() {
  return "CANARY";
}

module.exports = {
  baseUrl,
  title: "BOWPHP",
  tagline: "Simplify Your Web Development",
  url: "https://bowphp.com",
  organizationName: "bowphp",
  projectName: "bowphp.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    localeConfigs: {
      en: { label: "English", htmlLang: "en-US" },
      fr: { label: "Français", htmlLang: "fr-FR" },
    },
  },
  scripts: [
    "https://www.googletagmanager.com/gtag/js?id=UA-97409420-1",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
      async: true,
    },
    "static/js/script.js",
  ],
  favicon: "img/favicon.svg",
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "log",
    },
  },
  customFields: {
    startTutorial: "/blog/installation",
    landingText:
      "BowPHP was designed from the ground up to be easy to install and use, getting your application up and running quickly, and is trusted by <strong>+2500</strong> developers",
    apiUrl: "https://bowphp.com/api/master",
    users: [
      {
        caption: "Abou KONE",
        description: "Engineering Manager. CTO @akiltech.",
        image: "https://avatars1.githubusercontent.com/u/582061?s=460&v=4",
        infoLink: "https://github.com/devakone",
        pinned: true,
      },
      {
        caption: "Franck DAKIA",
        description:
          "Principal Maintainer, Working on <a href='https://github.com/bowphp'>BowPHP</a> and <a href='https://codelearningclub.com'>Code Learning Club</a>. Passionate about software development and DevOps lover ❤️",
        image: "https://avatars1.githubusercontent.com/u/9353811?s=460&v=4",
        infoLink: "https://github.com/papac",
        pinned: true,
      },
      {
        caption: "Chun-Sheng, Li",
        description: "Hacker's thought. Don't know, but want to do.",
        image:
          "https://avatars1.githubusercontent.com/u/9021747?s=460&u=b224b484728023911b47a55d5e09612516f8e468&v=4",
        infoLink: "https://github.com/peter279k",
        pinned: true,
      },
      {
        caption: "Salomon DION",
        description:
          "Artificial Intelligence Enthusiast; Afro Optimist; Data Junkie",
        image: "https://avatars3.githubusercontent.com/u/25983025?s=460&v=4",
        infoLink: "https://github.com/detygon",
        pinned: true,
      },
      {
        caption: "François KOBON",
        description:
          "#Coder. #Builder. #Hacker - Free & Open Source Software enthusiast (#ilovefs, #FOSS) - Innovation and Social Transformation - Ivorian - Jesus's Lovers",
        image: "https://avatars1.githubusercontent.com/u/10742869?s=460&v=4",
        infoLink: "https://github.com/fkobon",
        pinned: true,
      },
    ],
    sponsors: [
      {
        caption: "Adjemin",
        description:
          'Adjemin is a mobile application that lets you do e-commerce without intermediaries. The startup also offers <a href="https://smartlivraison.com">SmartLivraison</a>, which helps you better manage your delivery services in real time.',
        image: "/img/logoadjemin.png",
        infoLink: "https://adjemin.com",
      },
      {
        caption: "Akil Technologies",
        description:
          "In existence since 2015, AKIL is fundamentally about showcasing African — and more specifically Ivorian — technological expertise, from Abidjan where we are based. We are proud of our teams, representative of talent trained locally to international development standards.",
        image: "/img/logoakil.png",
        infoLink: "https://akiltechnologies.com",
      },
      {
        caption: "Etudesk",
        description:
          "Improving the learning experience for the new generation of professionals.",
        image: "/img/logoetudesk.png",
        infoLink: "https://www.etudesk.com",
      },
      {
        caption: "Papac&Co",
        description:
          "We help you bring your digital project to life.",
        image: "/img/papacandco.png",
        infoLink: "https://papacandco.com/services",
      },
    ],
    fans: [
      {
        name: "Ange BAGUI",
        description: "Co-Founder & CEO at Adjemin but Software Developer",
        github: "https://github.com/angebagui",
        image:
          "https://avatars3.githubusercontent.com/u/5214752?s=460&u=9d819e10cf354081517b488f9e50b0020620f1d8&v=4",
      },
      {
        name: "Jean-Vincent KASSI",
        github: "https://github.com/jvkassi",
        image: "https://avatars2.githubusercontent.com/u/3010867?s=460&v=4",
      },
      {
        name: "TechNov",
        github: "https://github.com/TechNov",
        image: "https://avatars2.githubusercontent.com/u/7539516?s=400&v=4",
      },
      {
        name: "Daniel Jonatan NOUGBELE",
        github: "https://github.com/agatapouglof",
        image:
          "https://avatars3.githubusercontent.com/u/23237383?s=400&u=c8ee1b6c1cffeb9b41e2017a9525dba4766582e4&v=4",
      },
      {
        name: "Ismaël DIOMANDÉ",
        github: "https://github.com/Benito225",
        image:
          "https://avatars0.githubusercontent.com/u/23212440?s=400&u=bbec7cf3be80486fe3225e67723d83799ac4668d&v=4",
      },
      {
        name: "Agnaramon BORIS-CARNOT",
        github: "https://github.com/agnamc",
        image:
          "https://avatars3.githubusercontent.com/u/4026625?s=400&u=2e19b9857a206b8efb391081d6144250b4aae311&v=4",
      },
      {
        name: "FEBE Dev",
        github: "https://github.com/dev-febe",
        image: "https://avatars2.githubusercontent.com/u/48589808?s=460&v=4",
      },
    ],
    defaultVersionShown: "4.x",
    repoUrl: "https://github.com/bowphp/app",
    numberOfFollowers: 5500,
  },
  onBrokenLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "docs",
          sidebarPath: "sidebars.json",
          editUrl: ({ locale, docPath }) => {
            if (locale !== "en") {
              return `https://crowdin.com/project/bowphp/${locale}`;
            }
            // We want users to submit doc updates to the upstream/next version!
            // Otherwise, we risk losing the update on the next release.
            const nextVersionDocsDirPath = "docs";
            return `https://github.com/bowphp/docs/edit/main/${nextVersionDocsDirPath}/${docPath}`;
          },
          rehypePlugins: [],
          disableVersioning: false,
          lastVersion:
            isDev || isDeployPreview || isBranchDeploy ? "current" : undefined,
          onlyIncludeVersions: (() => {
            if (isBuildFast) {
              return ["current"];
            } else if (isDev || isDeployPreview || isBranchDeploy) {
              return ["current", ...versions.slice(0, 2)];
            }
            return undefined;
          })(),
          versions: {
            current: {
              label: `${getNextVersionName()} 🚧`,
            },
          },
        },
        blog: {
          blogTitle: "Blog",
          blogDescription: "Find tips and tricks about bowphp",
          showReadingTime: true,
          routeBasePath: "blog",
          path: "blog",
          postsPerPage: 10,
        },
        theme: {
          customCss: ["src/css/customTheme.css", "static/css/custom.css"],
        },
        gtag: {
          trackingID: "G-309894919",
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      },
    ],
  ],
  plugins: [
    // [
    //   require.resolve("@cmfcmf/docusaurus-search-local"),
    //   {
    //     indexDocs: true,
    //     indexDocSidebarParentCategories: 10,
    //     indexBlog: true,
    //     indexPages: true,
    //     maxSearchResults: 10
    //   },
    // ],
  ],
  themeConfig: {
    metadata: [
      {
        name: "keywords",
        content:
          "php, bowphp, BowPHP, tintin, routing, i18n, request, http",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    navbar: {
      hideOnScroll: true,
      title: "Bowphp",
      logo: {
        src: "img/bow-logo.svg",
        alt: "BowPHP",
      },
      items: [
        {
          to: "docs/installation",
          label: "Documentation",
          position: "left",
        },
        {
          to: "blog",
          label: "Blog",
          position: "left",
        },
        {
          href: "https://bowphp.com/api/master",
          label: "Api reference",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "left",
          dropdownActiveClassDisabled: true,
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          href: "https://t.me/+PiAXH-w9qLUyOTU0",
          label: "Community",
          position: "right",
        },
        {
          href: "https://shop.papac.dev",
          label: "Shop",
          position: "right",
        },
        {
          href: "https://github.com/bowphp",
          className: "header-github-link",
          "aria-label": "GITHUB REPOSITORY",
          position: "right",
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    footer: {
      style: "dark",
      links: [
        {
          title: " ",
          items: [
            {
              label:
                "BowPHP was designed from the ground up to be easy to install and use, getting your application up and running quickly.",
              to: "#",
            },
          ],
        },
        {
          title: "Documentation",
          items: [
            {
              label: "Get started with BowPHP",
              to: "https://bowphp.com/docs/installation",
            },
            {
              label: "Want to contribute?",
              to: "https://bowphp.com/docs/contribution",
            },
            {
              label: "API Reference",
              to: "https://bowphp.com/api/master",
            },
          ],
        },
        {
          title: "Communities",
          items: [
            {
              label: "Code D'ivoire",
              to: "https://codedivoire.slack.com/",
            },
            {
              label: "Galsen Dev",
              to: "https://discord.gg/u8aAaCnyGn",
            },
            {
              label: "Papac Dev",
              to: "https://papac.dev",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "X",
              to: "https://x.com/papacdev",
            },
            {
              label: "Github",
              to: "https://github.com/bowphp",
            },
            {
              label: "Telegram",
              to: "https://t.me/+PiAXH-w9qLUyOTU0",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} built with 💚 by <a href="https://github.com/papac">Franck DAKIA</a>`,
    },
    mermaid: {
      theme: {
        dark: "forest",
      },
    },
    prism: {
      darkTheme: prismThemes.vsDark,
      theme: prismThemes.github,
      additionalLanguages: ["php", "javascript", "css", "typescript", "bash"],
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://bowphp.com",
      },
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Organization",
        name: "BowPHP",
        url: "https://bowphp.com",
        logo: "https://bowphp.com/img/bow.png",
      }),
    },
  ],
};
