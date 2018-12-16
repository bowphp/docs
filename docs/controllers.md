---
id: controleur
title: Contrôleurs
---

- [Introduction](#introduction)
- [Configuration](#configuration)
- [contrôleur Basic](#controleur-basic)
  - [Définir un contrôleur](#definir-un-controleur)
  - [Contrôleurs et espaces de noms](#controleurs-et-espaces-de-noms)
  - [Contrôleur et Middleware](#controleur-et-middleware)
- [Controller REST](#controller-rest)
  - [Définir un contrôleur rest](#definir-un-controleur-rest)
  - [Utilisons notre contrôleur REST](#utilisons-notre-controleur-rest)
    - [Prototype de la méthode REST](#prototype-de-la-methode-rest)
    - [Utilisation simple](#utilisation-simple)
    - [Utilisation avec les contraintes](#utilisation-avec-les-contraintes)
    - [Utilisation via un tableau comme action](#utilisation-via-un-tableau-comme-action)
    - [Ignore des méthodes](#ignore-des-methodes)

## Introduction

Les contrôleurs sont des moyens pour simplifier l'organisation de vos projet.

Au lieu de définir toute la logique de gestion des requête en tant que `closure` dans les fichiers de routage, vous pouvez organiser ce comportement à l'aide de classe de contrôleur. Les contrôleurs peuvent regrouper la logique de traitement des requêtes associée en une seule classe.

Les contrôleurs sont stockés dans le répertoire `app/Controllers`.

<script id="asciicast-1r0hZPnP5wY5fCPcxNXtLTQ4r" src="https://asciinema.org/a/1r0hZPnP5wY5fCPcxNXtLTQ4r.js" data-speed="2" data-rows="20" async></script>

## Configuration

Vous avez la possibilité de modifier le `namespace` des contrôleurs et des middlewares. Pour ce faire ouvrez le fichier `app\Kernel\Loader.php`. La méthode `middleware` permet à Bow de savoir quel est le bon `namespace` à ajouter sur le contrôleur lors de l'execution de la réquête ou lors de la génération de contrôleur ou de middleware par le lanceur de tache `php bow`.

Imaginez que vous avez une application pour la gestion des Bus d'une école et que vous voulez grouper tout vos contrôleurs dans le `namespace` `App\Bus\Controllers`. Alors comment faire ça ?

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
# Dans le fichier `bow`
$command = new Bow\Console\Command(__DIR__);
...
$command->setControllerDirectory(__DIR__.'/app/Bus/Controllers');
```

> Visitez ce [lien](./structure.md) pour plus d'information sur la personnalisation de la structure de l'applucation.

## Contrôleur basic

### Définir un contrôleur

Voici un exemple de classe de contrôleur de base. Notez que le contrôleur hérite de la classe de `App\Controllers\Controller` de base incluse avec Bow. La classe de base fournit quelques méthodes pratiques telles que la méthode du `render`, qui peut être utilisée pour compiler une vue.

```php
namespace App\Controllers;

use App\Controllers\Controller;
use App\User;

class UserController extends Controller
{
  /**
   * Afficher le profil pour l'utilisateur donné.
   *
   * @param int $id
   * @return mixed
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

Désormais, lorsqu'une demande correspond à l'URI de la route spécifiée, la méthode `show` de la classe `UserController` sera exécutée. Bien entendu, les paramètres de la route seront également transmis à la méthode.

Vous pouvez générer un contrôleur en utilisant la commande `add:controller` de `php bow`:

```bash
php bow add:controller UserController
```

### Contrôleur et espaces de noms

Il est très important de noter que nous n’avons pas eu besoin de spécifier le `namespace` du contrôleur complet lors de la définition de la route du contrôleur. Étant donné que `public/index.php` charge vos fichiers de route dans un groupe de routage contenant le `namespace`, nous avons uniquement spécifié la partie du nom de classe qui vient après la partie `App\Controllers` de le `namespace`.

Si vous choisissez d'imbriquer vos contrôleurs plus profondément dans le répertoire `App\Controllers`, utilisez le nom de classe spécifique relatif à le `namespace` racine `App\Controllers`. Donc, si votre classe de contrôleur complète est `App\Controllers\Photos\AdminController`, vous devez enregistrer les routes sur le contrôleur comme suit:

```php
$app->get('/foo', 'Photos\AdminController::action');
```

Vous pouvez générer un contrôleur en utilisant la commande `add:controller` de `php bow`:

```bash
php bow add:controller Photos/AdminController
```

Plus d'information sur le [routing](./routing.md).

### Contrôleur et Middleware

Les middlewares peuvent être assigner à la route du contrôleur dans vos fichiers de route. Les middleware sont stockés dans le dossier `app\Middleware`. Pour plus d'information sur les middlewares, visitez ce [lien](./middleware.md).

Exemple:

```php
$app->get('profile', 'UserController::show')->middleware('auth');
```

## Contrôleur REST

Les contrôleur REST sont un moyen simple pour mettre en place un API Rest facilement. Cette approche, vous permet de vous concentrez sur votre logique et laisser le Framework géré le routage pour vous.

### Définir un contrôleur rest

Pour définir un nouveau contrôleur Rest, nous devez utiliser le lancer de tache `php bow` avec la commande `generate:resource` dans votre console ou invite de commande :sunglasses:.

```bash
php bow generate:resource PetController
```

Un contrôleur nommé `PetController` sera donc créé. Ce qui fait ça particularité c'est qu'il y a déjà des méthodes prédéfinir en lui et ces méthodes doivent rester telles quelles sont.

```php
namespace App\Controllers;

use App\Controllers\Controller;

class PetController extends Controller
{
  /**
   * Point d'entré
   *
   * @return void
   */
  public function index()
  {
    // Codez Ici
  }

  /**
   * Permet d'afficher la vue permettant de créer une résource.
   *
   * @return void
   */
  public function create()
  {
    // Codez Ici
  }

  /**
   * Permet d'ajouter une nouvelle résource dans la base d'information
   *
   * @return void
   */
  public function store()
  {
    // Codez Ici
  }

  /**
   * Permet de récupérer un information précise avec un identifiant.
   *
   * @param mixed $id
   * @return void
   */
  public function show($id)
  {
    // Codez Ici
  }

  /**
   * Mise à jour d'un ressource en utilisant paramètre du GET
   *
   * @param mixed $id
   * @return void
   */
  public function edit($id)
  {
    // Codez Ici
  }

  /**
   * Mise à jour d'une résource
   *
   * @param mixed $id
   * @return void
   */
  public function update($id)
  {
    // Codez Ici
  }

  /**
   * Permet de supprimer une resource
   *
   * @param mixed $id
   * @return void
   */
  public function destroy($id)
  {
    // Codez Ici
  }
}
```

### Utilisons notre contrôleur REST

Pour utiliser le contrôleur Rest vous avez juste à utiliser le méthode `rest` sur la variable globale `$app` dans vos fichiers de routing.

#### Prototype de la méthode `rest`

```php
$app->rest(url, action, where = []);
```

| paramete | Type |
|----------|------|
| `url` | `String`, `Array` - Le nom de la route |
| `action` | `String` -  Le nom de la route |
| `where` | `Array` - Contrainte sur la varible `id` |

#### Utilisation simple

Et ça donne ceci:

```php
$app->rest('pets', 'PetController');
```

#### Utilisation avec les contraintes

Avec une contrainte ça donne ceci:

```php
$app->rest('pets', 'PetController', ['id' => '\d+']);
```

Ici la contrainte s'applique sur tous les méthodes. Mais, vous avez aussi la possibilité de restreindre les contraintes sur des méthodes comme ceci:

```php
$app->rest('pets', 'PetController', [
  'show' => ['id' => '\d+'],
  'edit' => ['id' => '[a-z]+'],
]);
```

#### Utilisation via un tableau comme action

Dans le cas ou `action` est un `array` voici les clés/valeurs possible.

```php
$action = [
  'controller' => 'PetController',
  'ignores' => ['index', 'create'],
];

$app->rest('pets', $action, ['id' => '\d+']);
```

#### Ignore des méthodes

La valeur de `ignores` sear une liste de méthode/url qui seront ignorées par le `routeur`. Alors, dans l'exemple précédent les méthodes `index` et `create` seront indisponibles.

#### Url et Action

En considerant la définition Rest suivant:

```php
$action = [
  'controller' => 'PetController',
  'ignores' => ['index', 'create'],
];

$app->rest('pets', $action, ['id' => '\d+']);
```

| URL | Method | Nom | Description |
|----------|------|------|------|
| `/pets` | `GET` | `pets.index` | Retourne la liste des pets |
| `/pets` | `POST` | `pets.store` | Permet d'ajouter un autre pet |
| `/pets/:id` | `GET` | `pets.show` | Afficher un seul pet |
| `/pets/:id` | `PUT/PATCH` | `pets.update` | Permet de mettre à jour les informations d'un pet |
| `/pets/:id` | `DELETE` | `pets.delete` | Ceci va supprimer un pet |
| `/pets/create` | `GET` | `pets.create` | Permet d'afficher le formulaire d'ajout |

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
