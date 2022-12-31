import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '8a9'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '0e2'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '328'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '80d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '61f'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '500'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '140'),
    exact: true
  },
  {
    path: '/index.old',
    component: ComponentCreator('/index.old', 'a32'),
    exact: true
  },
  {
    path: '/docs/4.x',
    component: ComponentCreator('/docs/4.x', '45c'),
    routes: [
      {
        path: '/docs/4.x/auth',
        component: ComponentCreator('/docs/4.x/auth', '3d8'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/concept',
        component: ComponentCreator('/docs/4.x/concept', 'c06'),
        exact: true
      },
      {
        path: '/docs/4.x/configuration',
        component: ComponentCreator('/docs/4.x/configuration', '36a'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/console',
        component: ComponentCreator('/docs/4.x/console', '351'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/container',
        component: ComponentCreator('/docs/4.x/container', '80e'),
        exact: true
      },
      {
        path: '/docs/4.x/contribution',
        component: ComponentCreator('/docs/4.x/contribution', '333'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/controleur',
        component: ComponentCreator('/docs/4.x/controleur', '5b3'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/csrf-protection',
        component: ComponentCreator('/docs/4.x/csrf-protection', '286'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/database',
        component: ComponentCreator('/docs/4.x/database', 'cf9'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/en/auth',
        component: ComponentCreator('/docs/4.x/en/auth', '27a'),
        exact: true
      },
      {
        path: '/docs/4.x/en/concept',
        component: ComponentCreator('/docs/4.x/en/concept', '220'),
        exact: true
      },
      {
        path: '/docs/4.x/en/configuration',
        component: ComponentCreator('/docs/4.x/en/configuration', '36c'),
        exact: true
      },
      {
        path: '/docs/4.x/en/console',
        component: ComponentCreator('/docs/4.x/en/console', '0b8'),
        exact: true
      },
      {
        path: '/docs/4.x/en/container',
        component: ComponentCreator('/docs/4.x/en/container', '7aa'),
        exact: true
      },
      {
        path: '/docs/4.x/en/contribution',
        component: ComponentCreator('/docs/4.x/en/contribution', 'f64'),
        exact: true
      },
      {
        path: '/docs/4.x/en/controleur',
        component: ComponentCreator('/docs/4.x/en/controleur', '720'),
        exact: true
      },
      {
        path: '/docs/4.x/en/csrf-protection',
        component: ComponentCreator('/docs/4.x/en/csrf-protection', '37c'),
        exact: true
      },
      {
        path: '/docs/4.x/en/database',
        component: ComponentCreator('/docs/4.x/en/database', '8dd'),
        exact: true
      },
      {
        path: '/docs/4.x/en/frontend',
        component: ComponentCreator('/docs/4.x/en/frontend', 'b53'),
        exact: true
      },
      {
        path: '/docs/4.x/en/helpers',
        component: ComponentCreator('/docs/4.x/en/helpers', '45a'),
        exact: true
      },
      {
        path: '/docs/4.x/en/http-request',
        component: ComponentCreator('/docs/4.x/en/http-request', '949'),
        exact: true
      },
      {
        path: '/docs/4.x/en/http-response',
        component: ComponentCreator('/docs/4.x/en/http-response', '6e9'),
        exact: true
      },
      {
        path: '/docs/4.x/en/http-session',
        component: ComponentCreator('/docs/4.x/en/http-session', '77b'),
        exact: true
      },
      {
        path: '/docs/4.x/en/http-upload',
        component: ComponentCreator('/docs/4.x/en/http-upload', '399'),
        exact: true
      },
      {
        path: '/docs/4.x/en/i18n',
        component: ComponentCreator('/docs/4.x/en/i18n', '4c2'),
        exact: true
      },
      {
        path: '/docs/4.x/en/installation',
        component: ComponentCreator('/docs/4.x/en/installation', '7cc'),
        exact: true
      },
      {
        path: '/docs/4.x/en/mail',
        component: ComponentCreator('/docs/4.x/en/mail', 'a54'),
        exact: true
      },
      {
        path: '/docs/4.x/en/middleware',
        component: ComponentCreator('/docs/4.x/en/middleware', 'dc3'),
        exact: true
      },
      {
        path: '/docs/4.x/en/migration',
        component: ComponentCreator('/docs/4.x/en/migration', 'd4c'),
        exact: true
      },
      {
        path: '/docs/4.x/en/orm',
        component: ComponentCreator('/docs/4.x/en/orm', 'ddf'),
        exact: true
      },
      {
        path: '/docs/4.x/en/packaging',
        component: ComponentCreator('/docs/4.x/en/packaging', '34a'),
        exact: true
      },
      {
        path: '/docs/4.x/en/policier',
        component: ComponentCreator('/docs/4.x/en/policier', 'e76'),
        exact: true
      },
      {
        path: '/docs/4.x/en/prologs',
        component: ComponentCreator('/docs/4.x/en/prologs', 'ac7'),
        exact: true
      },
      {
        path: '/docs/4.x/en/query-builder',
        component: ComponentCreator('/docs/4.x/en/query-builder', 'b63'),
        exact: true
      },
      {
        path: '/docs/4.x/en/routing',
        component: ComponentCreator('/docs/4.x/en/routing', '27e'),
        exact: true
      },
      {
        path: '/docs/4.x/en/seeding',
        component: ComponentCreator('/docs/4.x/en/seeding', '966'),
        exact: true
      },
      {
        path: '/docs/4.x/en/service',
        component: ComponentCreator('/docs/4.x/en/service', '8bf'),
        exact: true
      },
      {
        path: '/docs/4.x/en/storage',
        component: ComponentCreator('/docs/4.x/en/storage', '1bc'),
        exact: true
      },
      {
        path: '/docs/4.x/en/structure',
        component: ComponentCreator('/docs/4.x/en/structure', 'b68'),
        exact: true
      },
      {
        path: '/docs/4.x/en/tutorial',
        component: ComponentCreator('/docs/4.x/en/tutorial', '7da'),
        exact: true
      },
      {
        path: '/docs/4.x/en/validation',
        component: ComponentCreator('/docs/4.x/en/validation', '837'),
        exact: true
      },
      {
        path: '/docs/4.x/en/views',
        component: ComponentCreator('/docs/4.x/en/views', '2c5'),
        exact: true
      },
      {
        path: '/docs/4.x/frontend',
        component: ComponentCreator('/docs/4.x/frontend', '329'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/helpers',
        component: ComponentCreator('/docs/4.x/helpers', 'c1d'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/http-request',
        component: ComponentCreator('/docs/4.x/http-request', '256'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/http-response',
        component: ComponentCreator('/docs/4.x/http-response', '8b2'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/http-session',
        component: ComponentCreator('/docs/4.x/http-session', 'c35'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/http-upload',
        component: ComponentCreator('/docs/4.x/http-upload', 'e09'),
        exact: true
      },
      {
        path: '/docs/4.x/i18n',
        component: ComponentCreator('/docs/4.x/i18n', '498'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/installation',
        component: ComponentCreator('/docs/4.x/installation', '763'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/mail',
        component: ComponentCreator('/docs/4.x/mail', '4f8'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/middleware',
        component: ComponentCreator('/docs/4.x/middleware', '740'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/migration',
        component: ComponentCreator('/docs/4.x/migration', 'bca'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/orm',
        component: ComponentCreator('/docs/4.x/orm', 'f31'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/package',
        component: ComponentCreator('/docs/4.x/package', 'f1b'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/policier',
        component: ComponentCreator('/docs/4.x/policier', '4a7'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/prologs',
        component: ComponentCreator('/docs/4.x/prologs', '4f6'),
        exact: true
      },
      {
        path: '/docs/4.x/query-builder',
        component: ComponentCreator('/docs/4.x/query-builder', 'e69'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/routing',
        component: ComponentCreator('/docs/4.x/routing', '3e2'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/seeding',
        component: ComponentCreator('/docs/4.x/seeding', '620'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/service',
        component: ComponentCreator('/docs/4.x/service', '816'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/storage',
        component: ComponentCreator('/docs/4.x/storage', '047'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/structure',
        component: ComponentCreator('/docs/4.x/structure', 'ce4'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/testing',
        component: ComponentCreator('/docs/4.x/testing', '124'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/tutorial',
        component: ComponentCreator('/docs/4.x/tutorial', '7e1'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/4.x/validation',
        component: ComponentCreator('/docs/4.x/validation', 'cd1'),
        exact: true
      },
      {
        path: '/docs/4.x/views',
        component: ComponentCreator('/docs/4.x/views', 'ed2'),
        exact: true,
        sidebar: "docs"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '54f'),
    routes: [
      {
        path: '/docs/auth',
        component: ComponentCreator('/docs/auth', '3d5'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/concept',
        component: ComponentCreator('/docs/concept', '7f2'),
        exact: true
      },
      {
        path: '/docs/configuration',
        component: ComponentCreator('/docs/configuration', '640'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/console',
        component: ComponentCreator('/docs/console', '25e'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/container',
        component: ComponentCreator('/docs/container', '5c9'),
        exact: true
      },
      {
        path: '/docs/contribution',
        component: ComponentCreator('/docs/contribution', 'a50'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/controleur',
        component: ComponentCreator('/docs/controleur', '699'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/csrf-protection',
        component: ComponentCreator('/docs/csrf-protection', '0dc'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/database',
        component: ComponentCreator('/docs/database', 'cf0'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/en/auth',
        component: ComponentCreator('/docs/en/auth', 'c43'),
        exact: true
      },
      {
        path: '/docs/en/concept',
        component: ComponentCreator('/docs/en/concept', '0c8'),
        exact: true
      },
      {
        path: '/docs/en/configuration',
        component: ComponentCreator('/docs/en/configuration', 'd5a'),
        exact: true
      },
      {
        path: '/docs/en/console',
        component: ComponentCreator('/docs/en/console', 'edd'),
        exact: true
      },
      {
        path: '/docs/en/container',
        component: ComponentCreator('/docs/en/container', '8a1'),
        exact: true
      },
      {
        path: '/docs/en/contribution',
        component: ComponentCreator('/docs/en/contribution', 'bc4'),
        exact: true
      },
      {
        path: '/docs/en/controleur',
        component: ComponentCreator('/docs/en/controleur', '7ab'),
        exact: true
      },
      {
        path: '/docs/en/csrf-protection',
        component: ComponentCreator('/docs/en/csrf-protection', '925'),
        exact: true
      },
      {
        path: '/docs/en/database',
        component: ComponentCreator('/docs/en/database', '580'),
        exact: true
      },
      {
        path: '/docs/en/frontend',
        component: ComponentCreator('/docs/en/frontend', 'd92'),
        exact: true
      },
      {
        path: '/docs/en/helpers',
        component: ComponentCreator('/docs/en/helpers', 'a7e'),
        exact: true
      },
      {
        path: '/docs/en/http-request',
        component: ComponentCreator('/docs/en/http-request', 'a90'),
        exact: true
      },
      {
        path: '/docs/en/http-response',
        component: ComponentCreator('/docs/en/http-response', 'dee'),
        exact: true
      },
      {
        path: '/docs/en/http-session',
        component: ComponentCreator('/docs/en/http-session', '8b0'),
        exact: true
      },
      {
        path: '/docs/en/http-upload',
        component: ComponentCreator('/docs/en/http-upload', '1d4'),
        exact: true
      },
      {
        path: '/docs/en/i18n',
        component: ComponentCreator('/docs/en/i18n', 'b2d'),
        exact: true
      },
      {
        path: '/docs/en/installation',
        component: ComponentCreator('/docs/en/installation', '655'),
        exact: true
      },
      {
        path: '/docs/en/mail',
        component: ComponentCreator('/docs/en/mail', 'ce9'),
        exact: true
      },
      {
        path: '/docs/en/middleware',
        component: ComponentCreator('/docs/en/middleware', '312'),
        exact: true
      },
      {
        path: '/docs/en/migration',
        component: ComponentCreator('/docs/en/migration', '0e4'),
        exact: true
      },
      {
        path: '/docs/en/orm',
        component: ComponentCreator('/docs/en/orm', '347'),
        exact: true
      },
      {
        path: '/docs/en/packaging',
        component: ComponentCreator('/docs/en/packaging', '641'),
        exact: true
      },
      {
        path: '/docs/en/policier',
        component: ComponentCreator('/docs/en/policier', '1a3'),
        exact: true
      },
      {
        path: '/docs/en/prologs',
        component: ComponentCreator('/docs/en/prologs', '41f'),
        exact: true
      },
      {
        path: '/docs/en/query-builder',
        component: ComponentCreator('/docs/en/query-builder', 'e08'),
        exact: true
      },
      {
        path: '/docs/en/routing',
        component: ComponentCreator('/docs/en/routing', '9a9'),
        exact: true
      },
      {
        path: '/docs/en/seeding',
        component: ComponentCreator('/docs/en/seeding', '6d5'),
        exact: true
      },
      {
        path: '/docs/en/service',
        component: ComponentCreator('/docs/en/service', '534'),
        exact: true
      },
      {
        path: '/docs/en/storage',
        component: ComponentCreator('/docs/en/storage', 'aa9'),
        exact: true
      },
      {
        path: '/docs/en/structure',
        component: ComponentCreator('/docs/en/structure', '4e0'),
        exact: true
      },
      {
        path: '/docs/en/tutorial',
        component: ComponentCreator('/docs/en/tutorial', '869'),
        exact: true
      },
      {
        path: '/docs/en/validation',
        component: ComponentCreator('/docs/en/validation', 'f84'),
        exact: true
      },
      {
        path: '/docs/en/views',
        component: ComponentCreator('/docs/en/views', '282'),
        exact: true
      },
      {
        path: '/docs/frontend',
        component: ComponentCreator('/docs/frontend', '9ce'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/helpers',
        component: ComponentCreator('/docs/helpers', 'cdb'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/http-request',
        component: ComponentCreator('/docs/http-request', '229'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/http-response',
        component: ComponentCreator('/docs/http-response', '8c4'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/http-session',
        component: ComponentCreator('/docs/http-session', '010'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/http-upload',
        component: ComponentCreator('/docs/http-upload', '57b'),
        exact: true
      },
      {
        path: '/docs/i18n',
        component: ComponentCreator('/docs/i18n', '6c6'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/installation',
        component: ComponentCreator('/docs/installation', '4f3'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/mail',
        component: ComponentCreator('/docs/mail', '07e'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/middleware',
        component: ComponentCreator('/docs/middleware', '572'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/migration',
        component: ComponentCreator('/docs/migration', 'b96'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/orm',
        component: ComponentCreator('/docs/orm', 'e94'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/package',
        component: ComponentCreator('/docs/package', 'd99'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/policier',
        component: ComponentCreator('/docs/policier', '831'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/prologs',
        component: ComponentCreator('/docs/prologs', '423'),
        exact: true
      },
      {
        path: '/docs/query-builder',
        component: ComponentCreator('/docs/query-builder', 'd39'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/routing',
        component: ComponentCreator('/docs/routing', '968'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/seeding',
        component: ComponentCreator('/docs/seeding', '19d'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/service',
        component: ComponentCreator('/docs/service', '1ba'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/storage',
        component: ComponentCreator('/docs/storage', 'a24'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/structure',
        component: ComponentCreator('/docs/structure', 'f04'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/testing',
        component: ComponentCreator('/docs/testing', '50f'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/tutorial',
        component: ComponentCreator('/docs/tutorial', 'a31'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/validation',
        component: ComponentCreator('/docs/validation', '69d'),
        exact: true
      },
      {
        path: '/docs/views',
        component: ComponentCreator('/docs/views', '599'),
        exact: true,
        sidebar: "docs"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '653'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
