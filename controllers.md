# Controlleur

- [Instroduction](#introduction)
  - [Configuration](#configuration)
- [Controlleur Basic](#controlleur-basic)
  - [Definir un controlleur](#definir-un-controlleur)
  - [Contrôleurs et espaces de noms](#contrôleurs-et-espaces-de-noms)
  - [Contrôleur et Middleware](#contrôleur-et-middleware)

## Instroduction

Les controlleurs sont les moins simples de simplifier l'organisation de vos projet.

Au lieu de définir toute la logique de gestion des demandes en tant que fermetures dans les fichiers de routage, vous pouvez organiser ce comportement à l'aide de classes de contrôleur. Les contrôleurs peuvent regrouper la logique de traitement des demandes associée en une seule classe. Les contrôleurs sont stockés dans le répertoire `app/Controllers`.

### Configuration

Vous avez la possibilité de modifier le `namespace` des controlleurs et des middlewares. Pour ce faire ouvrez le fichier `app\Kernel\Loader.php`. La methode `namespaces` permet à Bow de savoir quel est le bon namespace à ajouter sur le controlleur lors de l'execution de la réquête ou lors de la génération de controlleur ou de middleware par le lanceur de tache `php bow`.

imaginez que vous avez une application pour la gestion des Bus d'une école et que vous voulez grouper tout vos controlleurs le namespace `App\Bus\Controllers`. Alors comment faire ça:

Voici le code que cela pourrai donnée:

```php
# Dans le fichier `app\Kernel\Loader.php`
public function namespaces()
{
  return [
    "controller" => "App\\Bus\\Controllers",
    ...
  ]
}
```

Ensuite il faudra aussi changer un peu la configuration du lancer de tache:

```php
# dans le fichier `bow`
$command = new \Bow\Console\Command(__DIR__);
...
$command->setControllerDirectory(__DIR__.'/app/Bus/Controllers');
```

Visitez ce [lien](./custom-structure.md) pour plus d'information sur la personnalisation de la structure de l'applucation

## Controlleur basic

### Definir un controlleur

Voici un exemple de classe de contrôleur de base. Notez que le contrôleur étend la classe de contrôleur de base incluse avec Bow. La classe de base fournit quelques méthodes pratiques telles que la méthode du middleware, qui peut être utilisée pour attacher un middleware aux actions du contrôleur.

```php
namespace App\Controllers;

use App\User;
use App\Controllers\Controller;

class UserController extends Controller
{
  /**
  * Show the profile for the given user.
  *
  * @param  int  $id
  * @return Response
  */
  public function show($id)
  {
    return $this->render('user/profile', ['user' => User::findOrFail($id)]);
  }
}
```

Vous pouvez définir une route vers cette action de contrôleur comme suit:

```php
$app->get('user/:id', 'UserController::show');
```

Désormais, lorsqu'une demande correspond à l'URI de la route spécifiée, la méthode `show` de la classe `UserController` sera exécutée. Bien entendu, les paramètres de l'itinéraire seront également transmis à la méthode.

Vous pouvez générer un contrôleur en utilisant la commande `add:controller` de `php bow`:

```bash
php bow add:controller UserController
```

### Contrôleurs et espaces de noms

Il est très important de noter que nous n’avons pas eu besoin de spécifier l’espace de noms du contrôleur complet lors de la définition de la route du contrôleur. Étant donné que RouteServiceProvider charge vos fichiers de route dans un groupe de routage contenant l'espace de noms, nous avons uniquement spécifié la partie du nom de classe qui vient après la partie `App\Controllers` de l'espace de noms.

Si vous choisissez d'imbriquer vos contrôleurs plus profondément dans le répertoire `App\Controllers`, utilisez le nom de classe spécifique relatif à l'espace de noms racine `App\Controllers`. Donc, si votre classe de contrôleur complète est `App\Controllers\Photos\AdminController`, vous devez enregistrer les routes sur le contrôleur comme suit:

```php
$app->get('/foo', 'Photos\AdminController::method');
```

Vous pouvez générer un contrôleur en utilisant la commande `add:controller` de `php bow`:

```bash
php bow add:controller Photos/AdminController
```

### Contrôleur et Middleware

Le middleware peut être assigné aux routes du contrôleur dans vos fichiers de route:

```php
$app->get('profile', 'UserController::show')->checker('auth');
```