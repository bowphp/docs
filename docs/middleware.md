---
id: middleware
title: Middleware
---

- [Introduction](#introduction)
- [Comment ça marche](#comment-ca-marche)
- [Ajouter un middleware](#ajouter-un-middleware)
- [Enregistrement de middleware](#enregistrement-de-middleware)
- [Utiliser le middleware](#utiliser-le-middleware)

## Introduction

Les middlewares constituent un mécanisme pratique pour filtrer les requêtes HTTP entrant dans votre application. Par exemple vous pouvez faire un middleware pour vérifier si un utilisateur est connecté et ensuite faire une action en fonction. Vous pouvez exécuter du code avant et après votre application Bow pour manipuler les objets `Request` et `Response` comme bon vous semble.

<script id="asciicast-bfTIiqg1ew9x1QRxeMTufxJJU" src="https://asciinema.org/a/bfTIiqg1ew9x1QRxeMTufxJJU.js" data-speed="2"  async></script>

## Comment ça marche

Différents frameworks utilisent le système de middleware différemment. Bow ajoute un middleware sous forme de file d'attente au dessus de votre application principale. Chaque nouvelle couche de middleware est ajouté la file de middleware existante. La structure de file se dilate vers l'extérieur au fure et à mesure que les couches intermédiaires supplémentaires sont ajoutées.

Lorsque vous exécutez l'application Bow, les objets Request traversent la structure du middleware de l'extérieur vers l'intérieur. Ils entrent d'abord dans le middleware le plus externe, puis dans le prochain middleware le plus externe (et ainsi de suite), jusqu'à ce qu'ils atteignent l'application elle-même. Une fois que l'application Bow a distribué la route approprié, l'objet Response résultant quitte l'application Bow et est sérialisé dans une réponse HTTP qui est renvoyé au client HTTP.

La seule condition stricte est qu'un middleware doit renvoyer une value autre de `null`. Chaque middleware devra appeler le middleware suivant et lui transmettre les objets `Request` comme arguments via la méthode `$next`.

> Bow inclut plusieur middlewares par defaut comme le middleware `csrf` et `auth`.

## Ajouter un middleware

Pour ajouter un middleware il faut utiliser la commande `add:middleware` de `php bow`:

```sh
php bow add:middlware IpMiddleware
```

Notez que tout les middlewares sont sauvegardés par défaut dans le fichier `app/Middleware`.

Alors, le middleware que nous venons d'ajouter, vérifira l'adresse IP du client et si son adresse est égale à `127.0.0.1` on dira que l'application est MODE DEV.

Mais d'abort, regardons le contenu du fichier `IpMiddleware`. C'est la méthode `process` qui permet de lancer le middleware et la callable permet de lancer le prochaine middleware.

```php
<?php

namespace App\Middleware;

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
    return $next($request);
  }
}
```

Pour notre exemple on aura alors le `process` suivant:

```php
public function process(Request $request, callable $next)
{
  if ($request->ip() == '127.0.0.1') {
    return "MODE DEV";
  }

  return $next($request);
}
```

## Enregistrement de middleware

Généralement l'enregistrement ce faire dans le fichier `app/Kernel/Loader.php` avec une clé qui l'identifie.

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

Il est aussi possible d'ajouter les middlwares de façon globle dans l'application. Et ceci se faire dans le fichier de `routes` avec la méthode `middleware` sur `$app`.

```php
$app->middleware(\App\Middleware\IpMiddleware::class);
// Ou
$app->middleware([
  \App\Middleware\IpMiddleware::class,
  \App\Middleware\OtherMiddleware::class,
]);
```

## Utiliser le middleware

Après avoir définir un middleware dans le `app/Kernel/Loader.php`.

```php
$app->middleware(['ip', 'autre']);
// ou
$app->get('/', 'HomeController::index')->middleware('ip');
$app->get('/', 'HomeController::index')->middleware(['ip', 'autre']);
// ou
$app->route([
  'path' => '/',
  'method' => 'GET',
  'handler' => 'HomeController::index',
  'middleware' => ['ip', 'autre']
]);
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.