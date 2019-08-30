---
id: package
title: Package
---

## Introduction

Ce système permet d'étendre votre application, de gréffer des package externe dans une application Bow.

## Création de plugin

Si vous avez une application Bow, il vous suffit de faire la création via `php bow` et lancer la commande `add:configuration` ensuite vous donnez le nom de votre configuration:

```bash
php bow add:configuration PluginConfiguration
```

Le fichier `PluginConfiguration.php` sera créé dans le dossier `app/Configurations` qui contient deux méthode `create` et `run`.

- `create` permet d'initialiser le package
- `run` permet de lancer d'initialisation le package.

Dans l'initialisation des packages c'est la methode create qui ce lancera avant pour tous le autre packages qui seront defini au dessus dans votre configuration ensuite la methode run sera sera dans le meme orde.

> N'Essayez pas de contacter un package ici si vous attendez qu'il soit dabort configurer.

Dans le fichier de configuration, Bow va injecté le [DIC](https://fr.wikipedia.org/wiki/Injection_de_d%C3%A9pendances) et sera accéssible via la proprété `$this->container`. Plus d'information sur le [DIC](./container.md) de Bow.

### Exemple de création

Vous allons faire un plugin aui va vérifier un email, alors on crée la configuration avec le nom `EmailCheckerConfiguration`:

> Notez que c'est un exemple pour vous montrez comment vous ici prendre, cet exemple dans un vrai projet aurai pu être traiter autrement.

```bash
php bow add:configuration EmailCheckerConfiguration
```

Dans le dossier `app` nous allons ajouter un dossier `Package` dans ce dossier, nous allons encore ajouter le fichier `EmailCheckController.php`:

```php
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
  public function __invoke(Request $request)
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

Vous allons maintenant créer note configuration:

```php
namespace App\Configuration;

use Bow\Configuration\Loader;
use Bow\Configuration\Configuration;

class EmailCheckController extends Configuration
{
  /**
   * Permet de lancement de configuration
   *
   * @return void
   */
  public function run()
  {
    $this->container->make('app')->post(
      '/email/checker', \App\Package\EmailCheckController::class
    );
  }
}
```

Allons notre application Bow Framework avec la commande `php bow run:server`.

### Testons notre package

Avec `curl` nous allons tester notre code:

```bash
curl -X POST -d "email=exemple@exemple.com" http://localhost:5000/email/checker
# {"message": "Ok", "error": false}
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
