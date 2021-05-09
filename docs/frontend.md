---
id: frontend
title: 📯 Front-End
---

- [Introduction](#introduction)
- [Utilisation](#utilisation)
  - [Compilation simplement](#compilation-simplement)
  - [Compilation et minification les fichiers sources](#compilation-et-minification-les-fichiers-sources)
  - [Surveiller le changement de fichier et récompile en fonction](#surveiller-le-changement-de-fichier-et-récompile-en-fonction)
  - [Pour lancer code sniffer](#pour-lancer-code-sniffer)
- [Webpack.mix.js](#webpackmixjs)

## Introduction

Bow est preset (Préconfiguré) avec un environement Frontend, notamment avec [Reacjs](https://reactjs.org), [Vuejs](https://vuejs.org) et [Sass](https://sass-lang.com) base sur le package [laravel-mix](https://laravel-mix.com). Ce qui permet d'accélérer le développement d'application web.

## Utilisation

Pour lancer la compilation, allez dans la racine de votre application et taper `npm install` ou `yarn install` dans votre console, en fonction du gestionnaire de package que vous utilisez.

### Compilation simplement

Lance la compilation des fichirs définient dans `webpack.mix.js`.

```bash
npm run dev
```

### Compilation et minification les fichiers sources

Compile les sources définient dans `webpack.mix.js` et optimise les fichiers.

```bash
npm run prod
```

### Surveiller le changement de fichier et récompile en fonction

Ceci permet de surveiller le changement des fichiers définient dans webpack.mix.js et ensuite rélance la compilation.

```bash
npm run watch
```

### Pour lancer code sniffer

Code sniffer c'est un outil qui permet de formater le code, validé sa qualité et réorganisé votre code dans le standard de dévelopement (Ici me standard c'est le `psr-2`).

Cette commande va aussi lancer `format` qui est simple outil de validation synthaxique pour PHP.

```bash
npm run format
```

## Webpack.mix.js

`webpack.mix.js` est une fichier qui vous permet de définir les fichiers JavaScript, JSx et Sass à compiler et est préconfiguré comme suit:

```js
mix.react('frontend/js/app.js', 'public/js')
  .sass('frontend/js/app.scss', 'public/css');
```

Pour plus d'information sur [laravel-mix](https://laravel-mix.com/docs/4.0/basic-example).

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
