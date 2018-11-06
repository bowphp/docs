---
id: plugin
title: Plugin
---

## Introduction

Ce système permet d'étendre votre application, de gréffer des package externe dans une application Bow.

## Création de plugin

Si vous avez une application Bow, il vous suffit de faire la création via `php bow` et lancer la commande `add:configuration` ensuite vous donnez le nom de votre configuration:

```bash
php bow add:configuration PluginConfiguration
```

Le fichier `PluginConfiguration.php` sera créé dans le dossier `app/Configurations`:

```php
<?php

namespace App\Configurations;

use Bow\Configuration\Loader;
use Bow\Configuration\Configuration;

class PluginConfiguration extends Configuration
{
  /**
   * Permet de lancement de configuration
   *
   * @param Loader $config
   * @return void
   */
  public function create(Loader $config)
  {
    //
  }

  /**
   * Permet de démarrer le package configuré
   *
   * @return void
   */
  public function run()
  {
    //
  }
}
```

Le méthode `create` permet d'initialiser le package et `run` permet de lancer d'initialisation le package.

Dans l'initialisation des packages c'est la methode create qui ce lancera avant pour tous le autre packages qui seront defini au dessus dans votre configuration ensuite la methode run sera sera dans le meme orde.

> N'Essayez pas de contacter un package ici si vous attendez qu'il soit dabort configurer.

Dans le fichier de configuration, Bow va injecté le [DIC](https://fr.wikipedia.org/wiki/Injection_de_d%C3%A9pendances) et sera accéssible via la proprété `$this->container`. Plus d'information de [DIC](./container.md) de Bow.

### Exemple de création

Vous allons faire un plugin de vérifier un email, alors on crée la configuration avec le nom `EmailCheckerConfiguration`:

> Notez c'est un exemple pour vous montrez comment vous ici prendre, cet exemple dans un vrai projet aurai pu être traiter autrement.

```bash
php bow add:configuration EmailCheckerConfiguration
```

Dans le dossier `app` nous allons ajouter un dossier `Package` dans ce dossier, nous allons encore ajouter le fichier `EmailCheckController.php`:

```php
<?php

namespace App\Package;

use Bow\Http\Request;
use Bow\Support\Str;

class EmailCheckController
{
  /**
   * Check the email
   *
   * @param Request $request
   */
  public function __invode(Request $request)
  {
    $email = $request->get('email');

    if (Str::isMail($email)) {
      $response = [
        'message' => 'ok',
        'error' => true
      ];
    } else {
      $response = [
        'message' => 'C\'est un mauvais email !',
        'error' => false
      ];
    }

    return $response;
  }
}
```
🤔
Vous allons maintenant créer note configuration:

```php
<?php

namespace App\Configurations;

use Bow\Configuration\Loader;
use Bow\Configuration\Configuration;

class EmailCheckController extends Configuration
{
  /**
   * Permet de lancement de configuration
   *
   * @param Loader $config
   * @return void
   */
  public function create(Loader $config)
  {
    $this->container->make('app')->get(
      '/email/checker', \App\Package\EmailCheckController::class
    );
  }

  /**
   * Permet de démarrer le package configuré
   *
   * @return void
   */
  public function run()
  {
    //
  }
}
```

> Section en rédaction