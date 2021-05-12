---
id: tutorial
title: 👩🏿‍🏫 Avec un tutoriel
---

- [Introduction](#introduction)
- [Des pages statiques](#des-pages-statiques)
  - [Exeminons le code par defaut dans le framework](#exeminons-le-code-par-defaut-dans-le-framework)
  - [Créons notre premier contrôleur](#créons-notre-premier-contrôleur)
  - [Ajout de logique au contrôleur](#ajout-de-logique-au-contrôleur)
  - [Routing](#routing)
- [La section Nouvelles](#la-section-nouvelles)
  - [Mise en place de votre modèle](#mise-en-place-de-votre-modèle)
- [Il manque quelque chose ?](#il-manque-quelque-chose-)

## Introduction

Ce tutoriel a pour but de vous présenter Bow Framework et les principes de base de l’architecture MVC. Il vous montrera comment une application Bow Framework de base est construite étape par étape.

Dans ce tutoriel, vous allez créer une application d'actualités de base. Vous commencerez par écrire le code pouvant charger des pages statiques. Vous allez ensuite créer une section de nouvelles qui lit les nouvelles d'une base de données. Enfin, vous allez ajouter un formulaire pour créer des éléments d’actualité dans la base de données.

Ce tutoriel portera principalement sur:

- Principes de base de Model-View-Controller
- Bases du [routage](./routing)
- Validation du formulaire
- Effectuer des requêtes de base de base de données à l'aide de «Générateur de requêtes»

L'ensemble du tutoriel est divisé en plusieurs partie, chacune expliquant une petite partie des fonctionnalités de Bow Framework.

- Introduction, cette partie, qui vous donne un aperçu de ce à quoi vous attendre.
- Des pages statiques, qui vous apprendront les bases des contrôleurs, des vues et du [routage](./routing).
- La section Nouvelles, où vous commencerez à utiliser des modèles et effectuerez des opérations de base de base de données.
- Créez des éléments d'actualité, qui introduiront des opérations de base de données plus avancées et la validation des formulaires.
- Conclusion, qui vous donnera des indications sur des lectures complémentaires et d’autres ressources.

## Des pages statiques

Remarque: Ce tutoriel suppose que vous avez installé le [framework](./installation.md) dans votre environnement de développement.

### Exeminons le code par defaut dans le framework

Dans le code de base de l'application, quand vous lancez le serveur de développement. Rendez-vous sur le page `http://localhost:5000`.

> Ici le port 5000 est celui par défaut dans l'application.

Vous aurez une page d'accueil présentant le framework. Alors cette page ne sort pas de nul part mais est stocké dans le dossier `templates` qui héberge tout les vues de votre application.

Dans ce dossier vous verez le fichier `layout.tintin.php` et `welcome.tintin.php` (Ne vous laissez par intimider par l'extension `tintin.php`, nous allons revenir dessus dans la suite).

Dans le fichier `welcome.tintin.php`. Modifiez le contenu de la section comme ceci:

```css
#block('content')
  Ah, bow c'est top.
#endblock
```

En actualisons la page. Normalement si tout c'est bien passé vous verrez le message `Ah, bow c'est top.` affiché.

> Défi: Prenez le temps pour manipuler les vues et observer le fichier `routes/app.php` et `app/Controllers/WelcomeController`.

Dans le fichier `routes/app.php` vous avez certainement remarquer le contenu:

```php
$app->get('/', function () {
  return response()->view('welcome');
});
```

En fait le `$app->get('/')` c'est qu'on appel une route. et ensuite la fonction, le `function () {...` c'est une action associé à la route.

Donc tout fois que dans le navigateur l'utilisateur entrera la route **/**. L'application Bow va détecté la route correspondante et lancé l'action associé.

> Cette fonction s'appel le routage ou routing en anglais.

Alors dans l'action. Il y a une instruction et sera exécuté en même temps que l'action:

```php
response()->view('welcome');
```

Cette méthode en réalité charge la vue `welcome` et et pour fini, l'action renvoie la réponse à l'utilisateur.

Un dernier truc avant de terminer cette section. Ajout ce morceau de code dans le fichier `route/app.php`:

```php
$app->get('/:name', function ($name) {
  return "Bonjour ".$name;
});
```

Dans le navigateur entrons l'url suivant `http://localhost:5000/franck`. Vous devrez voir afficher le contenu suivant `Bonjour franck`.

Ici vous remarquez certainement le `:name`. C'est ce qu'on l'appel un paramêtre url. Bow Framework ici capture la chaine qui est à la suite de `/` pour note cas c'est `franck` et le sauvegarde dans une variable que vous pouvez utiliser en paramètre de l'action. C'est super n'est pas !

### Créons notre premier contrôleur

Assez parlé on continue notre tutoriel. La première chose à faire est de configurer un contrôleur pour gérer les pages statiques.

Un contrôleur est simplement une classe qui aide à déléguer le travail. C'est le contre de votre application web.

> Pour des contrôleurs ? C'est juste une question de bien organiser les choses et aussi de respecter le parten SRP (Single Responsibility Principle)

Pour ajouter une contrôleur dans votre application vous pouvez utiliser l'assistant `php bow` et ici nous allons créer une contrôleur nommer `ActualityController`.

```bash
php bow add:controller ActualityController
```

Normalement vous devez avoir une contrôleur `ActualityController` dans le dossier `app/Controller`. Regardons un peu son contenu:

```php
namespace App\Controllers;

use App\Controllers\Controller;
use Bow\Http\Request;

class ActualityController extends Controller
{
  //
}
```

> Vous pouvez supprimer le contrôleur `app\Controllers\WelcomeController` et l'ignorer.

Ensuite ajoutez une méthode dans le contrôler que nous allons appelé `showView`.
Donc notre contrôleur deviendra:

```php
namespace App\Controllers;

use App\Controllers\Controller;
use Bow\Http\Request;

class ActualityController extends Controller
{
  /**
   * Show view page
   *
   * @return mixed
   */
  public function showIndex()
  {

  }
}
```

Maintenant que vous avez créé votre première méthode, il est temps de créer des modèles de page de base. Nous allons créer deux "vues" (un layout) qui sera la page modèle et une page pour afficher la vue en temps que tel.

> Supprimez le content du dossier `templates` sauf le dossier `errors`.

Créez la page principe (layout) dans **templates/layout.tintin.php** (Cette page existe peut être déjà par défaut):

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <p>Bienvenue sur mon site</p>
  </body>
</html>
```

### Ajout de logique au contrôleur

Pour l'instant la méthode n'accepte pas de paramètre (dans la suite nous verrons comment injecter des informations à la méthode). Les vues statiques seront situés dans le répertoire `templates` (pour le rappel). Entrons le code suivant dans la fonction `showView`:

```php
public function showView()
{
  return view('layout');
}
```

### Routing

Nous avons parlé un temps soit peut des routes des applications.

Ouvrez le fichier de routage situé dans `routes/app.php` et ajoutez les deux lignes suivantes. Supprimez tout autre code définissant une route et ajoutons le code suivant:

```php
$app->get('/', 'ActualityController::showView');
```

Pour rappel, Bow Framework lit ses règles de routage de haut en bas et achemine la demande vers la première règle correspondante. Chaque règle est une expression régulière (à gauche) mappée sur un contrôleur et un nom de méthode séparés par des "::" (à droite).

Lorsqu'une requête arrive, Bow Framework recherche la première correspondance et appelle le contrôleur et la méthode appropriés, éventuellement avec des arguments.

> Vous trouverez plus d'informations sur le routage dans la [documentation](./routing.md) de routage URI.

## La section Nouvelles

Dans la dernière section, nous avons passé en revue quelques concepts de base du Framework en écrivant une classe qui comprend des pages statiques. Nous avons nettoyé l'URI en ajoutant des règles de routage personnalisées. Il est maintenant temps d’introduire du contenu dynamique et de commencer à utiliser une base de données.

### Mise en place de votre modèle

Au lieu d'écrire les opérations de base de données directement dans le contrôleur, les requêtes doivent être placées dans un modèle afin de pouvoir être facilement réutilisées ultérieurement. Les modèles sont l'endroit où vous récupérez, insérez et mettez à jour des informations dans votre base de données ou dans d'autres magasins de données. Ils représentent vos données.

Ouvrez le répertoire `app/Models`, vous verrez un fichier `User.php` c'est une modèle. Pour ajouter un modèle dans notre application nous allons utiliser `php bow`.

```bash
php bow add:model Actuality
```

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
