const isDev = process.env.NODE_ENV === 'development';

const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === 'deploy-preview';

// Netlify branch deploy like "docusaurus-v2"
const isBranchDeploy =
  !!process.env.NETLIFY && process.env.CONTEXT === 'branch-deploy';

// Used to debug production build issues faster
const isBuildFast = !!process.env.BUILD_FAST;

const baseUrl = process.env.BASE_URL ?? '/';

const versions = require("./versions.json");

function getNextVersionName() {
  return 'Canary';
}

module.exports = {
  title: "Bow Framework",
  tagline: "Simplify Your Web Development",
  url: "https://bowphp.com",
  organizationName: 'Capap',
  baseUrl,
  organizationName: "bowphp",
  projectName: "bowphp.com",
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  scripts: [
    "https://www.googletagmanager.com/gtag/js?id=UA-97409420-1",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
      async: true,
    },
    "static/js/script.js"
  ],
  favicon: "img/bow.jpg",
  markdown: {
    mermaid: true,
  },
  customFields: {  
    startTutorial: "/blog/demarrer-bow-framework",
    landingText: "Bow Framework a été conçu dès le départ pour être facilement installé et utilisé pour rendre votre application opérationnel rapidement et est apprécié par <strong>+2500</strong> Développeur(se)s",
    apiUrl: "https://bowphp.com/api/master",
    users: [
      {
        caption: "Abou KONE",
        description: "Frontend Architect, CTO @akilTech. Magician @codedivoire.",
        image: "https://avatars1.githubusercontent.com/u/582061?s=460&v=4",
        infoLink: "https://github.com/devakone",
        pinned: true
      },
      {
        caption: "Franck DAKIA",
        description: "Web and Mobile Developer, DevOps Lover, Trainer and Coach in Web Development. Creator of Bow Framework",
        image: "https://avatars1.githubusercontent.com/u/9353811?s=460&v=4",
        infoLink: "https://github.com/papac",
        pinned: true
      },
      {
        caption: "Chun-Sheng, Li",
        description: "Hacker's thought. Don't know, but want to do.",
        image: "https://avatars1.githubusercontent.com/u/9021747?s=460&u=b224b484728023911b47a55d5e09612516f8e468&v=4",
        infoLink: "https://github.com/peter279k",
        pinned: true
      },
      {
        caption: "François KOBON",
        description: "#Coder. #Builder. #Hacker - Free & Open Source Software enthusiast (#ilovefs, #FOSS) - Innovation and Social Transformation - Ivorian - Jesus's Lovers",
        image: "https://avatars1.githubusercontent.com/u/10742869?s=460&v=4",
        infoLink: "https://github.com/fkobon",
        pinned: true
      },
      {
        caption: "Salomon DION",
        description: "Aspiring Cloud Engineer with strong interest in software development and data science and I’m a member of the core development team.",
        image: "https://avatars3.githubusercontent.com/u/25983025?s=460&v=4",
        infoLink: "https://github.com/detygon",
        pinned: true
      }
    ],
    sponsors: [
      {
        caption: "Adjemin",
        description: "Adjemin est une application mobile qui vous permet de faire du e-commerce sans intermédiaire. La Startup met également à votre disposition <a href=\"https://smartlivraison.com\">SmartLivraison</a> qui vous permet de gérer mieux votre services de livraison en temps réel.",
        image: "https://adjemin.com/assets/icones/LOGO-ADJEMINV3.png",
        infoLink: "https://adjemin.com"
      },
      {
        caption: "Akil Technologies",
        description: "En existence depuis 2015, AKIL a la base c&rsquo;est la mise en avant du savoir faire technologique Africain et plus précisément ivoirien, depuis Abidjan où nous sommes basés. Nous sommes fiers de nos équipes, représentatives du talent formé localement aux normes de développement internationales.",
        image: "https://akiltechnologies.com/wp-content/uploads/2017/09/Akil-Technologies-Logotype_Bleu.png",
        infoLink: "https://akiltechnologies.com"
      },
      {
        caption: "Etudesk",
        description: "ETUDESK permet aux particuliers de se former en ligne sur des compétences orientées-entreprise afin de répondre à la problématique d’inadéquation formation/emploi en Afrique",
        image: "https://www.etudesk.com/images/logo.png",
        infoLink: "https://www.etudesk.com"
      },
      {
        caption: "Gelsen Dev",
        description: "a communauté des développeurs sénégalais.",
        image: "https://www.galsen.dev/_nuxt/img/galsen-dev.11b417e.webp",
        infoLink: "https://www.galsen.dev/"
      }
    ],
    fans: [
      {
        name: "Ange Bagui",
        description: "Co-Founder & CEO at Adjemin but Software Developer",
        github: "https://github.com/angebagui",
        image: "https://avatars3.githubusercontent.com/u/5214752?s=460&u=9d819e10cf354081517b488f9e50b0020620f1d8&v=4"
      },
      {
        name: "Jean-Vincent kassi",
        github: "https://github.com/jvkassi",
        image: "https://avatars2.githubusercontent.com/u/3010867?s=460&v=4"
      },
      {
        name: "TechNov",
        github: "https://github.com/TechNov",
        image: "https://avatars2.githubusercontent.com/u/7539516?s=400&v=4"
      },
      {
        name: "Nougbele Daniel Jonatan",
        github: "https://github.com/agatapouglof",
        image: "https://avatars3.githubusercontent.com/u/23237383?s=400&u=c8ee1b6c1cffeb9b41e2017a9525dba4766582e4&v=4"
      },
      {
        name: "Ismaël Diomandé",
        github: "https://github.com/Benito225",
        image: "https://avatars0.githubusercontent.com/u/23212440?s=400&u=bbec7cf3be80486fe3225e67723d83799ac4668d&v=4"
      },
      {
        name: "Agnaramon Boris-Carnot",
        github: "https://github.com/agnamc",
        image: "https://avatars3.githubusercontent.com/u/4026625?s=400&u=2e19b9857a206b8efb391081d6144250b4aae311&v=4"
      },
      {
        name: "FEBE Dev",
        github: "https://github.com/dev-febe",
        image: "https://avatars2.githubusercontent.com/u/48589808?s=460&v=4"
      }
    ],
    defaultVersionShown: "4.x",
    repoUrl: "https://github.com/bowphp/app",
    numberOfFollowers: 3500
  },
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: "https://github.com/bowphp/docs/edit/4.0/docs/",
          path: "docs",
          sidebarPath: "sidebars.json",
          editUrl: ({locale, docPath}) => {
            if (locale !== 'en') {
              return `https://crowdin.com/project/bowphp/${locale}`;
            }
            // We want users to submit doc updates to the upstream/next version!
            // Otherwise we risk losing the update on the next release.
            const nextVersionDocsDirPath = 'docs';
            return `https://github.com/bowphp/docs/edit/main/${nextVersionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          rehypePlugins: [],
          disableVersioning: false,
          lastVersion:
            isDev || isDeployPreview || isBranchDeploy ? 'current' : undefined,
          onlyIncludeVersions: (() => {
            if (isBuildFast) {
              return ['current'];
            } else if (isDev || isDeployPreview || isBranchDeploy) {
              return ['current', ...versions.slice(0, 2)];
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
          blogTitle: 'Bowphp blog!',
          blogDescription: 'Trouver les astuces et conseils sur bowphp',
          postsPerPage: 'ALL',
          showReadingTime: true,
          routeBasePath: 'blog',
          path: "blog",
          postsPerPage: 10,
        },
        theme: {
          customCss: [
            "src/css/customTheme.css",
            "static/css/custom.css"
          ]
        },
        gtag: {
          trackingID: "G-309894919",
          anonymizeIP: true,
        }
      }
    ]
  ],
  plugins: [],
  themeConfig: {
    metadata: [{name: 'keywords', content: 'php, bowphp, bow framework, tintin, routing, i18n, request, http'}],
    navbar: {
      hideOnScroll: true,
      title: "Bow Framework",
      logo: {
        src: "img/bow.jpg"
      },
      items: [
        {
          to: "docs/installation",
          label: "Docs",
          position: "left"
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: "https://bowphp.com/api/master",
          label: "API",
          position: "left"
        },
        {
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: "https://join.slack.com/t/bowphp/shared_invite/zt-9c90n2iv-Rx1zdUG0YRAnDULhgELD0g",
          label: "Slack",
          position: "right"
        },
        {
          href: "https://t.me/+nDyat6uKlqI5ZjFk",
          label: "Telegram",
          position: "right"
        },
        {
          href: "https://github.com/bowphp",
          className: "header-github-link",
          "aria-label": "GitHub repository",
          position: "right"
        }
      ]
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: " ",
          items: [
            {
              label: "Bowphp a été conçu dès le départ pour être facilement installé et utilisé pour rendre votre application opérationnel rapidement.",
              to: "#"
            }
          ]
        },
        {
          title: "Documentation",
          items: [
            {
              label: "Commencer Bow Framework",
              to: "https://bowphp.com/docs/installation"
            },
            {
              label: "Voulez-vous contribuer ?",
              to: "https://bowphp.com/docs/contribution.html"
            },
            {
              label: "API Reference",
              to: "https://bowphp.com/api/master"
            }
          ]
        },
        {
          title: "Communautés",
          items: [
            {
              label: "Code D'ivoire",
              to: "https://codedivoire.slack.com/"
            },
            {
              label: "Galsen Dev",
              to: "https://discord.gg/u8aAaCnyGn"
            },
            {
              label: "Code Learning Club",
              to: "https://codelearningclub.com"
            }
          ]
        },
        {
          title: "En plus",
          items: [
            {
              label: "Twitter",
              to: "https://twitter.com/franck_dakia"
            },
            {
              label: "Slack",
              to: "https://join.slack.com/t/bowphp/shared_invite/zt-9c90n2iv-Rx1zdUG0YRAnDULhgELD0g"
            },
            {
              label: "Github",
              to: "https://github.com/bowphp"
            }
          ]
        },
        // {
        //   title: "Légal",
        //   items: [
        //     {
        //       label: "Terms",
        //       to: "https://twitter.com/franck_dakia"
        //     },
        //     {
        //       label: "Licence",
        //       to: "https://join.slack.com/t/bowphp/shared_invite/zt-9c90n2iv-Rx1zdUG0YRAnDULhgELD0g"
        //     }
        //   ]
        // }
      ],
      copyright: "Copyright © " + (new Date).getFullYear() + " développé avec 💚 par <a href=\"https://github.com/papac\">Franck DAKIA</a>",
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'forest'
      },
    }
  },
  themes: [
    '@docusaurus/theme-mermaid'
  ]
}
