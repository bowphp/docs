# HTTP Request

## Introduction

Une requete HTTP c'est le message que l'utilisateur envoie à l'application Bow via son navigateur et outil telque `curl` et autre.

Ce message est traite par Bow via la classe [`Bow\Http\Request`](https://bowphp.github.com/api/master/Bow/Http/Request.html). Cette classe vous permet d'avoir les informations sur le message envoie par l'utilisateur comme son adresse ip, le type du message, les information d'un formulaire etc...

## Accéder à la Request

Pour capturer un message HTTP, vous pouvez premièrement utiliser le helper `request()` qui vous donne une instance de [`Bow\Http\Request`](https://bowphp.github.com/api/master/Bow/Http/Request.html), deuxièmement passer par l'injecteur de dépendance via un action de controleur.

## Récupération des données

En utilisant quelques méthodes simples, vous pouvez accéder à toutes les entrées utilisateur de votre

### Via des fermetures de route

- Avec le helper `request`:

```php
$app->get('/', function ()
{
  $request = request();

  $name = $request->get('name');
  //
});
```

- Par l'injecteur de dépandance

```php
$app->get('/', function (Bow\Http\Request $request)
{
  return $request->get('name');
});
```

### Via un controlleur

```php
<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\User;
use Bow\Http\Request;

class UserController extends Controller
{
  /**
   * Afficher le profil pour l'utilisateur donné
   *
   * @param Request $reuest
   */
  public function show(Request $reuest)
  {
    $id = $reuest->get('id');

    $user = User::findOrFail($id);

    return $this->render('user/profile', ['user' => $user]);
  }
}
```