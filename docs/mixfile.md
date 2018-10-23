---
id: mixfile
title: Mixfile.js
---

- [Introduction](#introduction)
- [Utilisation](#utilisation)
  - [Compilation simplement](#compilation-simplement)
  - [Compilation et minification les fichiers sources](#compilation-et-minification-les-fichiers-sources)
- [Le fichier Mixfile.js](#le-fichier-mixfile.js)

## Introduction

Bow est preset (Préconfiguré) avec un environement Frontend, notamment avec [Reacjs](https://reactjs.org) et [Sass](https://sass-lang.com). Ce qui permet d'accélérer le développement d'application web.

## Utilisation

Pour lancer la compilation, allez dans la racine de votre application et taper `npm install` ou `yarn install` dans votre console, en fonction du gestionnaire de package que vous utilisez.

#### Compilation simplement

```bash
npm run dev
```

#### Compilation et minification les fichiers sources

```bash
npm run prod
```

#### Surveiller le changement de fichier et récompile en fonction

```bash
npm run watch
```

## Le fichier Mixfile.js

`Mixfile.js` est une fichier qui vous permet de définir les fichiers JavaScript, JSx et Sass à compiler et est préconfiguré comme suit:

```js
module.exports = {
  config: {
    prefix: __dirname,
    version: false
  },

  /**
   * React and Vanilla Javascript compile files
   */
  javascript: [
    ["components/js/app.js", "public/js"]
  ],

  /**
   * Sass compile files
   */
  sass: [
    ["components/sass/app.scss", "public/css"]
  ]
};
```

Il y a deux sections `javascript` et `sass` qui sont des tableaux qui collectionnent des tableaux. Les tableaux que collectionnent ces sections sont en fait la définition d'un point de compilation.

En prémier le fichier à compiler ([`"components/js/app.js"`, "public/js"]) et en deuxième le dossier de sauvegarde du fichier après compilation (["components/js/app.js", `"public/js"`]).

Ici, dans la section `javascript` on a le fichier `components/js/app.js` qui sera compilé et sauvegardé quand le dossier `public/js`.

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.