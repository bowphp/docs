---
id: configuration
title: Configuration
---

- [Introduction](#introduction)
- [Configuration](#configuration)
  - [Explication de la Dot Notation](#explication-de-la-dot-notation)
  - [Fichier .env.json](#fichier-env-json)
  - [Récupération les informations](#récupération-les-informations)

## Introduction

Tous les fichiers de configuration de Bow Framework sont stockés dans le répertoire `config`. Chaque option est documentée, alors n'hésitez pas à parcourir les fichiers et à vous familiariser avec les options à votre disposition.

## Configuration

Aprés la mise en place votre configuration et que Bow est chargé tout la configuration.
Vous pouvez avoir accès à la configuration et aussi la modifiée avec le helper `config`. L'accès aux valeurs se font via un système de [dot notation](#explication-de-la-dot-notation).

Pour récupérer une valeur c'est très simple:

```php
echo config('app.public_path')
```

Et la modifier une valeur se fait également très simplement:

```php
config('view.engine', 'twig');
config('view.extens', '.twig');
```

### Explication de la Dot Notation

Ici `app` représente le nom du fichier de configuration,`public_path` une valeur de la configuration définit dans ce fichier et le `.` permet d'avoir accès à une clé du tableau.

Imaginez qu'on a un tableau de ce type et qui est dans le un fichier donc le nom est `bow.php`:

```php
return [
  'name' => 'Bow',
  'skill' => [
    'level' => 'esaiest',
    'orm' => true,
    'preset' => [
      'reactjs', 'vue'
    ]
  ]
];
```

Avec `config` nous allons voir comment avoir accès à ces valeurs.

```php
config('bow.name'); // Bow
config('bow'); // Retourne le tableau entier
config('bow.skill.orm') // true
config('bow.skill.prrset.0') // reactjs
```

### Fichier .env.json

Le fichier `.env.json` est le fichier dans lequel sont definit les informations concernant la configuration de votre application au format JSON.

Votre fichier `.env.json` ne doit pas sous controle de version, parce que chaque développeur/serveur utilisant votre application peut nécessiter une configuration d'environnement différente. De plus cela constituerait aussi un risque pour la sécurité de votre application dans le cas où un intrus aurait accès à votre dépot de code source, parceque toutes les informations d'identification sensibles seraient exposées.

> Le fichier `.env.example.json` sert de base pour la création du fichier `.env.json`.

### Récupération les informations

Toutes les variables répertoriées dans le fichier `.env.json` seront chargées lorsque votre application recevra une requête. Cependant, vous pouvez utiliser le helper `env` pour récupérer les valeurs de ces variables dans  fichiers de configuration. En fait, si vous examinez les fichiers de configuration de Bow, vous remarquerez plusieurs des options utilisant déjà cet helper:

```php
'database' => env('MYSQL_DATABASE'),
```

Dans le cas où la variable n'est pas définie `env` retournera `null`, ou bien vous pouvez passer un deuxième paramêtre à `env` qui sera la valeur par défaut si la valeur n'est pas trouvé.

```php
'database' => env('MYSQL_DATABASE', 'localhost'),
```

## Les helpers

Bow inclut une variété de fonctions PHP "d'assistance" globales. Beaucoup de ces fonctions sont utilisées par le Framework lui-même; Cependant, vous êtes libre de les utiliser dans vos propres applications si vous les trouvez pratiques.

Notez que dans le fichier `config/helper.php` il aussi des helpers, mais cela ne sont pas utiliser dans le Framework. Vous pouvez definir aussi vos helpers dans ce fichier.

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.