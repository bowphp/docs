---
id: routing
title: Routing
---

- [Introduction](#introduction)
- [Mappage d'URL](#mappage-d-url)
  - [Avec le methode `route`](#avec-le-methode-route)
    - [Liste des options](#liste-des-options)
  - [Liste des possibilités](#liste-des-possibilites)
- [Les methods de maping](#les-methods-de-maping)
  - [get](#get)
  - [post](#post)
  - [put](#put)
  - [delete](#delete)
  - [patch](#patch)
  - [options](#options)
  - [match](#match)
  - [any](#any)
  - [prefix](#prefix)
- [Personnalisation](#personnalisation)
  - [Capturer des variables dans l'url](#capturer-des-variables-dans-l-url)
  - [Ajouter des critères, des restrictions sur les URLs](#ajouter-des-critères-des-restrictions-sur-les-URLs)
  - [Donner un nom au route](#donner-un-nom-au-route)
  - [Association de middleware](#association-de-middleware)

## Introduction

Le routing vous permet de maper une URL sur un controlleur ou une action particulière.
Le système de routing de Bow est grèfé directement sur l'instance de l'application,
donc sur la variable `$app`.

Les routes de l'application sont dans le fichier `app.php` du dossier `routes`
de votre application.

<script id="asciicast-eFxk7E2J7ESjz1YYUIhgFSZq1" src="https://asciinema.org/a/eFxk7E2J7ESjz1YYUIhgFSZq1.js"  data-speed="2" data-cols="285" data-rows="20" async></script>

## Mappage d'URL

### Avec le methode `route`

C'est méthode permet de faire une mappage rélativement simple.

```php
$app->route([
  'path' => '/',
  'method' => "`GET`",
  'handler' => 'handler'
]);
```

#### Liste des options

| paramêtre | Type |
|----------|------|
| path | `String` |
| method | `String`, `Array`, Methode Http |
| handler | `String`, `Array`, L'action à lancer |
| middleware | `String`, `Array`, Middleware |
| where  | `String`, `Array`, Contrainte appliqué sur l'URL |
| name | `String`, `Array`, Le nom de la route |

`method` correspond au verbe `http` à associer à la route, soit `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH`.

- Avec une clourse

```php
$app->route([
  'path' => '/',
  'method' => "GET",
  'handler' => function () {
    return "Hello, bow";
  }
]);
```

- Avec le nom d'un controlleur.

```php
$app->route([
  'path' => '/',
  'method' => "GET",
  'handler' => 'HomeController::action'
]);
```

> Plus d'information sur les controlleurs [ici](./controllers)

- Avec le nom d'un controlleur et un middelware.

```php
$app->route([
  'path' => '/',
  'method' => "GET",
  'handler' => 'HomeController::showProfile',
  'middleware' => ['auth']
]);
```

> Plus d'information sur les middlewares [ici](./middleware)

- Avec le nom d'un controlleur, un middelware et une restriction.


```php
$app->route([
  'path' => '/:name',
  'method' => "GET",
  'handler' => 'HomeController::showProfile',
  'middleware' => ['auth'],
  'where' => ['name' => '']
]);
```

> Plus d'information sur les restrictions [ici](#ajouter-des-critères-des-restrictions-sur-les-URLs)

### En utilisant les verbes HTTP comme méthode

Prototype des méthodes du routing.

```php
$app->[method](url, action);
```

`method` correspond au verbe `http` à associer à la route, soit `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH` écrite en minuscule.

| paramêtre | Type |
|----------|------|
| url      | `String` |
| action   | `String`, `Array`, Closure ou Callable |

- Avec une clourse

```php
$app->get('/', function ()
{
  return 'hello world';
});
```

> Une Closure une fonction dite anonyme ([Plus d'information](http://php.net/manual/fr/class.closure.php) sur le sujet).

- Avec une collection de fonction dans un tableau:

```php
$callables = [];

$callables[] = function () {
  echo 'hello world';

  return true;
};

$callables[] = function () {
  echo 'Bien merci';
};

$app->get('/', $callables);
```

> Notez que dans la première fonction il y a à la fin une instruction `return true`, cette instruction est indispensable si vous voulez lancer la prochaine fonction. Alors ce qui veut dire que si c'est aussi un `return false` la fonctione suivante ne sera pas exécutée.

- Avec le nom d'un controlleur

```php
$app->[method]('/', 'ClassController::action');
```

- Avec le nom d'un controlleur et un middelware

```php
$app->[method]('/', ['middleware' => 'ip', 'controller' => 'ClassController::action']);
```

> `method` correspond au verbe `http` à associer à la route, soit `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH` écrite en minuscule.

### Liste des possibilités

```php
$app->get($url, $action);
$app->post($url, $action);
$app->put($url, $action);
$app->delete($url, $action);
$app->option($url, $action);
$app->patch($url, $action);
```

## Les methods de maping

La mise en place du routage se faire donc via les méthodes suivants:

### Mapping avec `get`

Cette méthode permet de maper une URL à une requête de type ``GET``.

```php
$app->get('/', function ()
{
  return 'hello world';
});
```

### Mapping avec `post`

Cette méthode permet de maper une URL à une requête de type ``POST``

```php
$app->post('/', function ()
{
  return 'data posted';
});
```

### Mapping avec `put`

Cette méthode permet de maper une URL à une requête de type ``PUT``.

```php
$app->put('/', function ()
{
  // Code ici
});
```

### Mapping avec `delete`

Cette méthode permet de maper une URL à une requête de type ``DELETE``.

```php
$app->delete('/', function ()
{
  // Code ici
});
```

### Mapping avec `patch`

Cette méthode permet de maper une URL à une requête de type ``PATCH``.

```php
$app->patch('/', function ()
{
  // Code ici
});
```

### Mapping avec `options`

Cette méthode permet de maper une URL à une requête de type ``OPTIONS``.

```php
$app->options('/', function ()
{
  // Code ici
});
```

> Les méthodes DELELTE, `PUT`, `PATCH`, `OPTIONS` ne sont pas supporter par le navigateur.

Quand vous utilisez des outils qui peuvent envoyer des requêtes de ce type comme `curl`, `httpie`.

Parcontre les navigateurs ne supportent pas cette méthode. Alors dans votre formulaire d'envoie,
il faudra créer un champs comme ceci:

```html
<input type="hidden" name="_method" value="`DELETE`">
```

Ce qui aura pour but de permettre à Bow de comprendre votre requête.

Tout les méthodes definir ci-dessus retourne l'instance de `Bow\Router\Route::class`. (Plus d'information sur le [`Bow\Router\Route::class`](https://bowphp.github.io/api/master/Bow/Router/Route.html))

## Mapping multiple

### Mapping avec `match`

Permet d'associer des méthodes `http` sur l'url spécifier.

Prototype de la méthode `match`.

```php
$app->match(verbes, url, action);
```

| paramêtre | Type |
|----------|------|
| verbes | `Array` - La liste de méthode `http` |
| url    | `String` - l'URL de la route |
| action | `String`, `Array`, `Closure` - L'action à lancer |

```php
$app->match(['`GET`', '`POST`'], '/users', function ()
{
  // Code ici
});
```

Vous pourrez avoir un code qui faire ceci.

```php
use Bow\Http\Request;

$app->match(['`GET`', '`POST`'], '/users', function (Request $request)
{
  if ($request->isPost()) {
    // code
  } else {
    // code
  }
});
```

> Plus d'information sur les [requêtes HTTP](./request).

### Mapping avec `any`

Permet d'associer tout les méthodes `http` sur l'URL spécifier.

Prototype de la méthode `any`.

```php
$app->any(url, action);
```

| paramêtre | Type |
|----------|------|
| url      | `String` - L'url de la route |
| action   | `String`, `Array`, Closure - L'action à lancer |

```php
$app->any('/', function ()
{
  // Code ici
});
```

### Mapping avec `prefix`

Souvent vous serez amener à grouper vos routes et effectuer un branchement simple pour bien orienté votre logique.
Les URLs peuvent souvents se répéter comme ceci:

```php
$app->get('users', function ()
{
  // Code ici
});

$app->get('users/:id', function ($id)
{
  // Code ici
});

$app->get('users/:id/delete', function ($id)
{
  // Code ici
});
```

Dans ce cas nous avons `users` qui se répéte plusieur fois. Comment bien organiser tout ça ? La réponse est le préfixage de route. Alors la méthodes `prefix` nous permet de grouper plusieur URLs.

Prototype de le méthode `prefix`.

```php
$app->prefix(url, action);
```

| paramêtre | Type |
|----------|------|
| url      | `String` - l'URL à prefixer |
| action   | `Closure` - Cette fonction prendra en paramêtre l'instance de l'application |

Donc pour réorganiser le code précédent, il faut faire:

```php
$app->prefix('/users', function () use ($app)
{
  $app->get('/', function ()
  {
   // Code ici
  });
  $app->get('/:id', function ($id)
  {
   // Code ici
  });
  $app->get('/:id/delete', function ($id)
  {
   // Code ici
  });
});
```

> Notez qu'actuellement le préfixage ne peut pas être imbriquer.

## Personnalisation

Le routing vous permet aussi de personnaliser vos URLs. Voici la list des possibilités de personnalisation.

- Capturer des variables dans l'URL
- Ajouter des critères, des restrictions sur les URLs
- Donner un nom au route
- Association de middleware
- La composition d'action

Pour faire la personnalisation il faut utiliser l'enchainement de méthode.
Dans le exemple qui suit nous allons utiliser la méthode `get`.

### Capturer des variables dans l'URL

Le routing vous permet de pouvoir capturer des variables dans URLs.
Pour le faire il faut imperativement utiliser la notation `:nom_variable`.
Ensuite la variable capturé sera passer en paramètre à l'action (fonction à executer dans le cas où l'url est valide)
quelque soit le nombre de variable.

```php
$app->get('/:name', function ($name)
{
  return 'bonjour ' . $name;
});
```

### Ajouter des critères, des restrictions sur les URLs

Parlant de capture de variable. Sécurisé ces variables est primordial. Alors le routing vous permet
aussi d'ajouter des validateurs sur le variable. C'est la méthode `where` qui s'en occupe.

Prototype de la méthode `where`.

```php
where(name, rule);
// ou
where(array rules);
```

| paramêtre | Type |
|----------|------|
| name     | `String` - Le nom de la variable |
| value    | `String` - Le critaire de validation |
| rules    | `Array` - Tableau associatif dont la clé est la varibale à sécuriser et la valeur est le critaire de validation |

```php
$app->get('/:name', function ($name)
{
  return 'bonjour ' . $name;
})->where('name', '[a-z]+');

// S'il y a plusieurs variables
$callable = function ($name, $lastname, $number)
{
  return sprIntegerf(
    'bonjour <b>%s %s</b>, votre numéro est %s.', $name, $lastname, $number
  );
};

$app->get('/:name/:lastname/:number', $callable)
  ->where([
    'name' => '[a-z]+',
    'lastname' => '[a-z]+',
    'number' => '\d+'
  ]);
```

> Notez que `where` une méthode de l'instance [`Bow\Router\Route`](https://bowphp.github.io/api/master/Bow/Router/Route.html).

### Donner un nom au route

Quand vous être dans le développement d'un gros projet, les routes deviendront nombreuses
et la gestion visuel pour le développeur deviendra difficile, alors Bow vous permet de donner des noms à vos routes et pour après les contacter plus facilement. La méthode `name` associate à une instance de route vous permet de faire ça.

Prototype de la méthode `name`.

```php
name(name);
```

| paramêtre | Type |
|----------|------|
| name  | `String` - Le nom de la route |

```php
$app->get('/:name', function ($name)
{
  return 'bonjour ' . $name;
})->name('hello');
```

### Association de middleware

Un middleware c'est un ou plusieurs actions qui ce placent entre la requete et l'action
a executer. Tout les framework moderne en sont dotés.

Plus d'information sur le sujet allez ce lien [middleware](#documentation-middlewares)

```php
$app->get('/:name', ['middleware' => 'ip', function ($name)
{
  return 'bonjour ' . $name;
}])->name('hello');
```

#### La composition d'action

```php
$app->get('/:name', [
  'middleware' => 'ip',
  'controller' => 'NameController::action'
]);
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
