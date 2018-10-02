# Localisation

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

La langue par défaut de votre application est stockée dans le fichier de configuration `config/trans.php`. Bien entendu, vous pouvez modifier cette valeur pour répondre aux besoins de votre application. Vous pouvez également modifier la langue active au moment de l'exécution à l'aide de la méthode `setLocale` sur la classe `Translator`:

```php

use Bow\Translate\Translator;

$app->get('docs/{locale}', function ($locale) {
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

### Traduction simple

### Traduction pluriel

## Modifier dynamiquement la langue