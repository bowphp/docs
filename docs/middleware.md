---
id: middleware
title: Middleware
---

Les middleware constituent un mécanisme pratique pour filtrer les requêtes HTTP entrant dans votre application. Par exemple vous pouvez faire un middleware pour vérifier si un utilisateur est connecté et ensuite faire une action en fonction. Vous pouvez exécuter du code avant et après votre application Bow pour manipuler les objets `Request` et `Response` comme bon vous semble.

<img src="/img/arrow.png" alt="Middleware image" width="450"/>

La seule condition stricte est qu'un middleware doit renvoyer une value autre de `null`. Chaque middleware devra appeler le middleware suivant et lui transmettre les objets `Request` comme arguments via la méthode `$next`.

> Bow inclut plusieur middlewares par defaut comme le middleware `csrf` et `auth`.

## Ajouter un middleware

Pour ajouter un middleware il faut utiliser la commande `add:middleware` de `php bow`:

```sh
php bow add:middlware IpMiddleware
```

Notez que tout les middlewares sont sauvegardés par défaut dans le fichier `app/Middleware`.

Alors le middleware que nous venons d'ajouter, vérifira l'adresse IP du client et si son adresse est égale à <small>127.0.0.1</small> on dira que l'application est MODE DEV.

Mais d'abort, regardons le contenu du fichier `IpMiddleware`. C'est la méthode `process` qui permet de lancer le middleware et la callable permet de lancer le prochaine middleware.

```php
<?php

namespace App\Middleware;

use Bow\Auth\Auth;
use Bow\Http\Request;

class IpMiddleware
{
  /**
   * Fonction de lancement du middleware.
   *
   * @param Request $request
   * @param callable $next
   */
  public function process(Request $request, callable $next)
  {
    //
  }
}
```

Pour notre exemple on aura alors le `process` suivant:

```php
public function process(Request $request, callable $next)
{
  if (in_array($request->ip(), ['127.0.0.1'])) {
    return "MODE DEV";
  }

  return $next($request);
}
```

## Enregistrement de middleware

Généralement l'enregistrement ce faire dans le fichier `app/Kernel/Loader.php`.

```php
public function middlewares()
{
  return [
    ...
    'ip' => \App\Middleware\IpMiddleware::class
    ...
  ];
}
```

Il est aussi possible d'ajouter les middlwares de façon globle dans l'application. Et ceci se faire dans le fichier de `routes` avec la methode `middleware` sur `$app`.

```php
$app->middleware(\App\Middleware\IpMiddleware::class);
// Ou
$app->middleware([
  \App\Middleware\IpMiddleware::class,
  \App\Middleware\OtherMiddleware::class,
]);
```

### Utiliser le middleware

Après avoir definir un middleware dans le `Kernel`.

```php
$app->middleware(['ip']);
// ou
$app->get('/', 'HomeController::index')->middleware('ip');
$app->get('/', 'HomeController::index')->middleware(['ip']);
// ou
$app->route([
  'path' => '/',
  'method' => 'GET',
  'handler' => 'HomeController::index',
  'middleware' => ['ip']
]);
```

> Section en rédaction