---
id: configuration
title: Configuration
---

- [Introduction](#introduction)
- [Configuration](#configuration)
  - [Explication de la notation à point](#explication-de-la-notation-a-point)
  - [Fichier .env.json](#fichier-env-json)
  - [Récupération les informations](#récupération-les-informations)

## Introduction

Tous les fichiers de configuration de Bow Framework sont stockés dans le dossier `config`. Chaque option est documentée, alors n'hésitez pas à parcourir les fichiers et à vous familiariser avec les options à votre disposition.

## Configuration

Vous pouvez accéder et modifier la configuration avec le helper `config`. L'accès aux valeurs se fait via un système de [notation à point](#explication-de-la-notation-a-point) (Dot notation).

Récupération d'une valeur:

```php
echo config('app.public_path')
```

Modification d'une valeur:

```php
config('view.engine', 'twig');
config('view.extension', '.twig');
```

### Explication de la notation à point

Dans une notation à point, la partie avant le premier point représente le nom du fichier et toutes les valeurs suivantes
représentent des clés ou valeurs du tableau de configuration.

Imaginez qu'on a un tableau défini comme suit et qui est dans un fichier dont le nom est `bow.php`:

```php
return [
  'name' => 'Bow',
  'skill' => [
    'level' => 'easiest',
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
config('bow.skill.preset.0') // reactjs
```

> Remarquez qu'en premier c'est le nom du fichier qui contient la configuration, ici `bow.`

### Fichier .env.json

Il est souvent souhaitable d'avoir différentes valeurs de configuration selon l'environnement ou notre application est lancée. Par exemple, l'on
peut vouloir activer des logs de débogage en développement mais pas en production.

Pour cela Bow utilise le fichier `.env.json` fichier dans lequel sont définis les informations concernant la configuration de votre application au format JSON. C'est aussi l'endroit idéal pour définir les informations sensibles comme une clé d'accès à un service.

Votre fichier `.env.json` ne doit pas sous contrôle de version, parce que chaque développeur/serveur utilisant votre application peut nécessiter une configuration d'environnement différente. De plus cela constituerait aussi un risque de sécurité dans le cas où un intrus aurait accès à votre depot de code source, parce que toutes les informations d'identification sensibles seraient exposées.

> Le fichier `.env.example.json` sert de base pour la création du fichier `.env.json`.

### Récupération des informations

Toutes les variables répertoriées dans le fichier `.env.json` seront chargées lorsque votre application recevra une requête. Cependant, vous pouvez utiliser le helper `app_env` pour récupérer les valeurs de ces variables dans les fichiers de configuration. En fait, si vous examinez les fichiers de configuration de Bow, vous remarquerez plusieurs des options utilisant déjà cet helper:

```php
'database' => app_env('MYSQL_DATABASE'),
```

Dans le cas où la variable n'est pas définie `app_env` retournera `null`, ou bien vous pouvez passer un deuxième paramètre à `app_env` qui sera la valeur par défaut si la valeur n'est pas trouvé.

```php
'database' => app_env('MYSQL_DATABASE', 'localhost'),
```

## Les helpers

Bow inclut une variété de fonctions PHP "d'assistance" globales. Beaucoup de ces fonctions sont utilisées par le Framework lui-même; Cependant, vous êtes libre de les utiliser dans vos propres applications si vous les trouvez pratiques.

Notez que dans le fichier `config/helper.php` il y a aussi des helpers, mais cela ne sont pas utiliser dans le Framework. Vous pouvez définir aussi vos helpers dans ce fichier.

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
