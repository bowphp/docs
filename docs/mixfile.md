---
id: mixfile
title: Mixfile.js
---

- [Introduction](#introduction)
- [Utilisation](#utilisation)
  - [Compilation simplement](#compilation-simplement)
  - [Compilation et minification les fichiers sources](#compilation-et-minification-les-fichiers-sources)
  - [Surveiller le changement de fichier et récompile en fonction](#surveiller-le-changement-de-fichier-et-récompile-en-fonction)
  - [Lancer les tests unitaire](#lancer-les-tests-unitaire)
  - [Pour lancer code sniffer](#pour-lancer-code-sniffer)
- [Le fichier Mixfile.js](#le-fichier-mixfile.js)

## Introduction

Bow est preset (Préconfiguré) avec un environement Frontend, notamment avec [Reacjs](https://reactjs.org), [Vuejs](https://vuejs.org) et [Sass](https://sass-lang.com). Ce qui permet d'accélérer le développement d'application web.

## Utilisation

Pour lancer la compilation, allez dans la racine de votre application et taper `npm install` ou `yarn install` dans votre console, en fonction du gestionnaire de package que vous utilisez.

#### Compilation simplement

Lance la compilation des fichirs définient dans Mixfile.js.

```bash
npm run dev
```

#### Compilation et minification les fichiers sources

Compile les sources définient dans Mixfile.js et optimise les fichiers.

```bash
npm run prod
```

#### Surveiller le changement de fichier et récompile en fonction

Ceci permet de surveiller le changement des fichiers définient dans Mixfile.js et ensuite rélance la compilation.

```bash
npm run watch
```

#### Lancer les tests unitaire

Cette commande lance les tests unitaires définient dans le fichier `tests`.

```bash
npm run test
```

#### Pour lancer code sniffer

Code sniffer c'est un outil qui permet de formater le code, validé sa qualité et réorganisé votre code dans le standard de dévelopement (Ici me standard c'est le `psr-2`).

Cette commande va aussi lancer `phplint` qui est simple outil de validation synthaxique pour PHP.

```bash
npm run phplint
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

### Fonctionnement

Il y a deux sections `javascript` et `sass` qui sont des tableaux qui collectionnent des tableaux. Les tableaux que collectionnent ces sections sont en fait la définition d'un point de compilation.

En prémier le fichier à compiler ([`"components/js/app.js"`, "public/js"]) et en deuxième le dossier de sauvegarde du fichier après compilation (["components/js/app.js", `"public/js"`]).

Ici, dans la section `javascript` on a le fichier `components/js/app.js` qui sera compilé et sauvegardé quand le dossier `public/js`.

### Fichier versionné

Dans la création d'application, les développeurs sont très souvent améner à faire des modifications sur les fichiers.

Souvent après chargement d'un fichier, le navigateur charge toujour l'ancienne version du fichier en question, ce qui peut créer la confusion chez les développeurs qui penseront qu'il y a un bug dans l'application or c'est juste que le navigateur va plus cherche le nouveau fichier (le fichier modifié) mais récupère celui de son cache (C'est un comportement normal, le but est d'optimiser le chargement des pages Web).

Pour remédier au problème, vous avez la possibité de versionner vos fichier en activant les lignes dans le fichier `webpack.config.js`:

```js
// You can change version this like:
bowMix.config.version = isProd()
```

Ce qui génère un fichier avec un numéro de version du style `app.1541122426400.js`. Ensuite pour appeler le fichier versionné dans votre application vous devez utiliser le helper `mix_version`:

```php
echo mix_version('js/app.js');
// /js/app.1541122426400.js
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.