---
id: i18n
title: i18n
---

- [Introduction](#introduction)
- [Fonctionnement](#fonctionement)
- [Traduction simple](#traduction-simple)
- [Traduction pluriel](#traduction-pluriel)

## Introduction

Dans tout application, il y a le besoin de rendre l'application multi-languge. Bow implement un systeme simple tranduction.

### Configuration

Pour utiliser le système de traduction. Il faut d'abort considérer la confirguration qui se trouve dans le dossier `config/trans.php`. Dans le fichier la langue par defaut c'est le francais dont le `fr`.

Dans le dossier `components/lang` sont ranger les traductions de votre application. Ce sont des fichier php qui retourne un `array` et si vous remarquez il y a un dossier `fr` et `en`. Ce sont les dossiers pour chaque langue ici `fr` pour français et `en` pour anglais.

  /components
    /lang
      /en
        messages.php
      /fr
        messages.php

Tous les fichiers de langue renvoient un tableau de chaînes à clé. Par exemple

```php
<?php

// components/lang/en/messages.php

return [
  'welcome' => 'Welcome to our application'
];
```

### Configuration de la locale

La langue par défaut de votre application est stockée dans le fichier de configuration `config/trans.php`. Bien entendu, vous pouvez modifier cette valeur pour répondre aux besoins de votre application. Vous pouvez également modifier la langue active au moment de l'exécution à l'aide de la méthode `setLocale` sur la classe [`Bow\Translate\Translator`](https://bowphp.github.com/api/master/Bow/Translate/Translator.html):

```php

use Bow\Translate\Translator;

$app->get('docs/:locale', function ($locale) {
  Translator::setLocale($locale);
  //
});
```

Vous pouvez configurer une `lang`, qui sera utilisée lorsque la langue active ne contient pas une chaîne de traduction donnée. Comme la langue par défaut, la langue de secours est également configurée dans le fichier de configuration `config/trans.php`:

```php
'lang' => 'en',
```

## Récupération de chaînes de traduction

Vous pouvez extraire des lignes de fichiers de langue à l'aide de la fonction du helper `trans` ou `__`. La méthode `__` accepte le fichier et la clé de la chaîne de traduction comme premier argument. Par exemple, récupérons la chaîne de traduction de bienvenue dans le fichier de langue `components/lang/messages.php`:

```php
echo __('messages.welcome');
// Ou bien
echo trans('messages.welcome');
```

### Détermination de la locale actuelle

Vous pouvez utiliser les méthodes `getLocale` et `isLocale` sur la classe `Translator` ou par le helper `trans` pour déterminer les paramètres régionaux actuels ou vérifier si les paramètres régionaux correspondent à une valeur donnée:

```php
use Bow\Translate\Translator;

$locale = Translator::getLocale();

if (Translator::isLocale('en')) {
 //
}
```

Via le helper `trans`

```php
$trans = trans();

$locale = $trans->getLocale();

if ($trans->isLocale('en')) {
 //
}
```

Si la chaîne de traduction spécifiée n'existe pas, la fonction `__` renverra la clé de la chaîne de traduction. Ainsi, à l'aide de l'exemple ci-dessus, la fonction `__` renverrait `messages.welcome` si la chaîne de traduction n'existe pas.

### Remplacement de paramètres dans les chaînes de traduction

Si vous le souhaitez, vous pouvez définir des espaces réservés dans vos chaînes de traduction. Tous les espaces réservés sont encadrés par `{}`. Par exemple, vous pouvez définir un message de bienvenue avec un nom d’espace réservé:

```php
'welcome' => 'Welcome, {name}',
```

Pour remplacer les espaces réservés lors de l'extraction d'une chaîne de traduction, transmettez un tableau de remplacements en tant que deuxième argument de la fonction `__` ou `trans`:

```php
echo __('messages.welcome', ['name' => 'Galy']);
```

## La pluralisation

La pluralisation est un problème complexe, car différentes langues ont une variété de règles complexes pour la pluralisation. En utilisant un caractère "pipe" (`|`), vous pouvez distinguer les formes singulière et plurielle d'une chaîne:

```php
'names' => 'C\'est un utilisateur|Ce sont des utilisateurs',
```

Après avoir défini une chaîne de traduction comportant des options de pluralisation, vous pouvez utiliser la fonction `__` ou `trans`. Dans cet exemple, puisque le nombre est supérieur à un, la forme au pluriel de la chaîne de traduction est renvoyée:

```php
echo __('messages.names', count($names) > 1);
```

Avec les données remplacer

```php
'names' => 'Bonjour {name}|Bonjour à tous',
```

```php
echo __('messages.names', ['name' => 'Newt'], count($names) == 1);
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.