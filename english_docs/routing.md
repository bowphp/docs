---
id: routing
title: Routing
---

- [Introduction](#introduction)
- [Mappage d'URL](#mappage-durl)
  - [Avec le méthode `route`](#avec-le-méthode-route)
    - [Liste des options](#liste-des-options)
  - [En utilisant les verbes HTTP comme méthode](#en-utilisant-les-verbes-http-comme-méthode)
  - [Liste des possibilités](#liste-des-possibilités)
- [Les methods de mapping](#les-methods-de-mapping)
  - [Mapping avec `get`](#mapping-avec-get)
  - [Mapping avec `post`](#mapping-avec-post)
  - [Mapping avec `put`](#mapping-avec-put)
  - [Mapping avec `delete`](#mapping-avec-delete)
  - [Mapping avec `patch`](#mapping-avec-patch)
  - [Mapping avec `options`](#mapping-avec-options)
- [Mapping multiple](#mapping-multiple)
  - [Mapping avec `match`](#mapping-avec-match)
  - [Mapping avec `any`](#mapping-avec-any)
  - [Mapping avec `prefix`](#mapping-avec-prefix)
- [Personnalisation](#personnalisation)
  - [Capturer des variables dans l'URL](#capturer-des-variables-dans-lurl)
  - [Ajouter des critères, des restrictions sur les URLs](#ajouter-des-critères-des-restrictions-sur-les-urls)
  - [Donner un nom aux routes](#donner-un-nom-aux-routes)
  - [Association de middleware](#association-de-middleware)
    - [La composition d'action](#la-composition-daction)

## Introduction

Le routing vous permet de maper une URL sur un controlleur ou une action particulière.
Le système de routing de Bow est greffé directement sur l'instance de l'application,
donc sur la variable `$app` qui est une variable super global.

Les routes de l'application sont dans le fichier `app.php` du dossier `routing`
de votre application.

<script id="asciicast-eFxk7E2J7ESjz1YYUIhgFSZq1" src="https://asciinema.org/a/eFxk7E2J7ESjz1YYUIhgFSZq1.js" data-speed="2" data-rows="20" async></script>

## Mappage d'URL

### Avec le méthode `route`

C'est méthode permet de faire un mappage rélativement simple.

```php
$app->route([
  'path' => '/',
  'method' => "GET",
  'handler' => 'handler'
]);
```

#### Liste des options

| Paramètre | Type | Description |
|----------|------|------|
| path | `String` | Le parten d'url à matcher |
| method | `String`, `Array` | méthode Http |
| handler | `String`, `Array` | L'action à lancer |
| middleware | `String`, `Array` | Middleware |
| where  | `String`, `Array` | Contrainte appliqué sur l'URL |
| name | `String`, `Array` | Le nom de la route |

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
  'handler' => 'HomeController::show',
  'middleware' => ['auth']
]);
```

> Plus d'information sur les middlewares [ici](./middleware)

- Avec le nom d'un controlleur, un middelware et une restriction.

```php
$app->route([
  'path' => '/:name',
  'method' => "GET",
  'handler' => 'HomeController::show',
  'middleware' => ['auth'],
  'where' => ['name' => '[a-z]+']
]);
```

> Plus d'information sur les restrictions [ici](#ajouter-des-criteres-des-restrictions-sur-les-urls)

### En utilisant les verbes HTTP comme méthode

Prototype des méthodes du routing.

```php
$app->[method](url, action);
```

`method` correspond au verbe `http` à associer à la route, soit `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH` écrit en minuscule.

| Paramètre | Type | Description |
|----------|------|------|
| url      | `String` | Le parten d'url a matcher |
| action   | `String`, `Array` | Closure ou Callable |

- Avec une clourse

```php
$app->get('/', function ()
{
  return 'hello world';
});
```

> Une Closure est une fonction dite anonyme ([Plus d'information](http://php.net/manual/fr/class.closure.php) sur le sujet).

- Avec une collection de fonction dans un tableau:

```php
$callables = [];

$callables[] = function ()
{
  echo 'hello world';

  return true;
};

$callables[] = function ()
{
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

> `method` correspond au verbe `http` à associer à la route, soit `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH` écrit en minuscule.

### Liste des possibilités

```php
$app->get($url, $action);
$app->post($url, $action);
$app->put($url, $action);
$app->delete($url, $action);
$app->option($url, $action);
$app->patch($url, $action);
```

## Les methods de mapping

La mise en place du routage se faire donc via les méthodes suivants:

### Mapping avec `get`

Cette méthode permet de maper une URL à une requête de type `GET`.

```php
$app->get('/', function ()
{
  return 'hello world';
});
```

### Mapping avec `post`

Cette méthode permet de maper une URL à une requête de type `POST`

```php
$app->post('/', function ()
{
  return 'data posted';
});
```

### Mapping avec `put`

Cette méthode permet de maper une URL à une requête de type `PUT`.

```php
$app->put('/', function ()
{
  // Code ici
});
```

### Mapping avec `delete`

Cette méthode permet de maper une URL à une requête de type `DELETE`.

```php
$app->delete('/', function ()
{
  // Code ici
});
```

### Mapping avec `patch`

Cette méthode permet de maper une URL à une requête de type `PATCH`.

```php
$app->patch('/', function ()
{
  // Code ici
});
```

### Mapping avec `options`

Cette méthode permet de maper une URL à une requête de type `OPTIONS`.

```php
$app->options('/', function ()
{
  // Code ici
});
```

> Les méthodes `DELELTE`, `PUT`, `PATCH` ne sont pas supporter par le navigateur.

Les navigateurs ne supportent pas cette méthode. Alors dans votre formulaire d'envoie, il faudra créer un champs comme ceci:

```html
<input type="hidden" name="_method" value="DELETE">
```

Ce qui aura pour but de permettre à Bow de comprendre votre requête et c'est valable pour PUT et PATCH.

> Tout les méthodes définir ci-dessus retourne l'instance de `Bow\Router\Route::class`. (Plus d'information sur le [`Bow\Router\Route::class`](https://bowphp.com/api/master/Bow/Router/Route.html))

## Mapping multiple

### Mapping avec `match`

Permet d'associer des méthodes `http` sur l'url spécifié.

Prototype de la méthode `match`.

```php
$app->match(verbes, url, action);
```

| Paramètre | Type | Description |
|----------|------|------|
| verbes | `Array` | La liste des méthodes `http` |
| url    | `String` | L'URL de la route |
| action | `String`, `Array`, `Closure` | L'action à lancer |

```php
$app->match(['GET', 'POST'], '/users', function ()
{
  // Code ici
});
```

Vous pourrez avoir un code qui faire ceci.

```php
use Bow\Http\Request;

$app->match(['GET', 'POST'], '/users', function (Request $request)
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

| Paramètre | Type | Description |
|----------|------|------|
| url      | `String` | L'url de la route |
| action   | `String`, `Array` | Closure - L'action à lancer |

```php
$app->any('/', function ()
{
  // Code ici
});
```

### Mapping avec `prefix`

Souvent vous serez amener à grouper vos routes et effectuer un branchement simple pour bien orienté votre logique. Les URLs peuvent souvents se répéter comme ceci:

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

| Paramètre | Type | Description |
|----------|------|------|
| url      | `String` | l'URL à prefixer |
| action   | `Closure` | Cette fonction prendra en paramètre l'instance de l'application |

Donc pour réorganiser le code précédent, il faudra faire comme suit:

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

Le routing vous permet aussi de personnaliser vos URLs. Voici la liste des possibilités de personnalisation.

- Capturer des variables dans l'URL
- Ajouter des critères, des restrictions sur les URLs
- Donner un nom aux routes
- Association de middleware
- La composition d'action

Pour faire la personnalisation il faut utiliser l'enchainement de méthode. Dans l'exemple qui suit nous allons utiliser la méthode `get`.

### Capturer des variables dans l'URL

Le routing vous permet de pouvoir capturer des variables dans URLs.
Pour le faire il faut impérativement utiliser la notation `:nom_variable`.
Ensuite la variable capturé sera passée en paramètre à l'action (fonction à exècuter dans le cas où l'url est valide)
quelque soit le nombre de variable.

```php
$app->get('/:name', function ($name)
{
  return 'Bonjour ' . $name;
});
```

### Ajouter des critères, des restrictions sur les URLs

Parlant de capture de variable, sécurisé ces variables est primordial, alors le routing vous permet
aussi d'ajouter des validateurs sur le variable. C'est la méthode `where` qui s'en occupe.

Prototype de la méthode `where`.

```php
where(name, rule);
// ou
where(array rules);
```

| Paramètre | Type | Description |
|----------|------|------|
| name     | `String` | Le nom de la variable |
| value    | `String` | Le critaire de validation |
| rules    | `Array` | Tableau associatif dont la clé est la varibale à sécuriser et la valeur est le critaire de validation |

```php
$app->get('/:name', function ($name)
{
  return 'Bonjour ' . $name;
})->where('name', '[a-z]+');

// S'il y a plusieurs variables
$callable = function ($name, $lastname, $number)
{
  return sprintf(
    'Bonjour <b>%s %s</b>, votre numéro est %s.', $name, $lastname, $number
  );
};

$app->get('/:name/:lastname/:number', $callable)
  ->where([
    'name' => '[a-z]+',
    'lastname' => '[a-z]+',
    'number' => '\d+'
  ]);
```

> Notez que `where` est une méthode de l'instance [`Bow\Router\Route`](https://bowphp.com/api/master/Bow/Router/Route.html).

### Donner un nom aux routes

Quand vous être dans le développement d'un gros projet, les routes deviendront nombreuses
et la gestion visuel pour le développeur deviendra difficile, alors Bow vous permet de donner des noms à vos routes et pour après les contacter plus facilement. La méthode `name` associate à une instance de route vous permet de faire ça.

Prototype de la méthode `name`.

```php
name(name);
```

| Paramètre | Type | Description |
|----------|------|------|
| name  | `String` | Le nom de la route |

```php
$app->get('/:name', function ($name)
{
  return 'Bonjour ' . $name;
})->name('hello');
```

### Association de middleware

Un middleware c'est un ou plusieurs actions qui ce placent entre la requête et l'action
à exècuter. Tout les Frameworks modernes en sont dotés.

Pour plus d'information sur le sujet, allez ce lien [middleware](#documentation-middlewares)

```php
$app->get('/:name', ['middleware' => 'ip', function ($name)
{
  return 'Bonjour ' . $name;
}]);

// Ou
$app->get('/:name', function ($name) {
  return 'Bonjour ' . $name;
})->middleware('ip');
```

#### La composition d'action

```php
$app->get('/:name', [
  'middleware' => 'ip',
  'controller' => 'NameController::action'
]);
```

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
