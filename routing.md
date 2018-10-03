# Routing

- [Introduction](#introduction)
  - [Prototype du routing](#prototype-du-routing)
- [Les methods de maping](#les-methods-de-maping)
  - [get](#get)
  - [post](#post)
  - [put](#put)
  - [delete](#delete)
  - [patch](#patch)
  - [options](#options)
  - [match](#match)
  - [any](#any)
  - [code](#code)
  - [prefix](#prefix)
- [Personnalisation](#personnalisation)
  - [Capturer des variables dans l'url](#capturer-des-variables-dans-l-url)
  - [Ajouter des critères, des restrictions sur les urls](#ajouter-des-critères-des-restrictions-sur-les-urls)
  - [Donner un nom au route](#donner-un-nom-au-route)
  - [Association de middleware](#association-de-middleware)

## Introduction

Le routing vous permet de maper une url sur un controlleur ou une action particulière.
Le systeme de routing de bow est grèfé directement sur l'instance de l'application.
donc sur la variable `$app`.
Les routes de l'application sont dans le fichier `app.php` du dossier `routes`
de votre application.

### Prototype du routing

prototype des methodes du routing

```php
$app->[verbe](string url, string|array|closure action);
```

`verbe` correspond au verbe `http` à associer à la route, soit GET, POST, PUT, DELETE, OPTIONS, PATCH écrite en minuscule.

| paramêtre | Type |
|----------|------|
| url      | String |
| action   | String, Array, Closure ou Callable |

- Une Closure une fonction dit anonyme ([Plus d'information](http://php.net/manual/fr/class.closure.php) sur le sujet).

```php
$app->verbe('/', function ()
{
  return 'hello world';
});
```

- Avec une collection de fonction dans un tableau:

```php
$app->verbe('/', [function () {
  echo 'hello world';
}, function () {
  echo 'Bien merci';
}]);
```

- Avec le nom d'un controller

```php
$app->verbe('/', 'ClassController@actionAExecuter');
```

- Avec le nom d'un controller et un middelware

```php
$app->verbe('/', ['middleware' => 'ip', 'controller' => 'ClassController::actionAExecuter']);
```

> `verbe` correspond au verbe `http` à associer à la route, soit GET, POST, PUT, DELETE, OPTIONS, PATCH écrite en minuscule.

## Les methods de maping

La mise en place du routage se faire donc via les methodes suivants:

### get

Cette methode permet de maper une url a une requête de type `GET`.

```php
$app->get('/', function ()
{
  return 'hello world';
});
```

### post

Cette methode permet de maper une url a une requête de type `POST`

```php
$app->post('/', function ()
{
  return 'data posted';
});
```

### put

Cette methode permet de maper une url a une requête de type `PUT`.

Quand vous utilisez des outils qui peut envoyer des requêtes de ce type comme `curl`, `httpie`.
Parcontre les navigateurs ne supportent pas cette methode. Alors dans votre formulaire d'envoie,
il faudra créer un champs comme ceci:

```html
<input type="hidden" name="_method" valude="PUT">
```

ce qui aura pour but de permettre à bow de comprendre votre requête.

```php
$app->put('/', function ()
{
  // code ici
});
```

### delete

Cette methode permet de maper une url a une requête de type `DELETE`.

Quand vous utilisez des outils qui peut envoyer des requêtes de ce type comme `curl`, `httpie`.
Parcontre les navigateurs ne supportent pas cette methode. Alors dans votre formulaire d'envoie,
il faudra créer un champs comme ceci:

```html
<input type="hidden" name="_method" valude="PUT">
```

ce qui aura pour but de permettre à bow de comprendre votre requête.

```php
$app->delete('/', function ()
{
  // code ici
});
```

### patch

Cette methode permet de maper une url a une requête de type `PATCH`.

Quand vous utilisez des outils qui peut envoyer des requêtes de ce type comme `curl`, `httpie`.
Parcontre les navigateurs ne supportent pas cette methode. Alors dans votre formulaire d'envoie,
il faudra créer un champs comme ceci:

```html
 <input type="hidden" name="_method" valude="PATCH">
```

ce qui aura pour but de permettre à bow de comprendre votre requête.

```php
$app->patch('/', function ()
{
  // code ici
});
```

### options

Cette methode permet de maper une url a une requête de type `OPTIONS`.

Quand vous utilisez des outils qui peut envoyer des requêtes de ce type comme `curl`, `httpie`.
Parcontre les navigateurs ne supportent pas cette methode. Alors dans votre formulaire d'envoie,
il faudra créer un champs comme ceci:

```html
 <input type="hidden" name="_method" valude="OPTIONS">
```

ce qui aura pour but de permettre à bow de comprendre votre requête.

```php
$app->options('/', function ()
{
  // code ici
});
```

### match

Permet d'associer des methodes `http` sur l'url spécifier.

prototype de la methode `match`.

```php
$app->match(verbes, url, action);
```

| paramêtre | Type |
|----------|------|
| verbes | Array, La liste de methode `http` |
| url    | String, L'url de la route |
| action | String, array, callable ou Closure |

```php
$app->match(['GET', 'POST'], function ()
{
  // code ici
});
```

### any

Permet d'associer tout les methodes `http` sur l'url spécifier.

prototype de la methode `any`.

```php
$app->any(url, action);
```

| paramêtre | Type |
|----------|------|
| url      | String, L'url de la route |
| action   | String, array, callable ou Closure |

```php
$app->any('/', function ()
{
  // code ici
});
```

### code

Permet d'associer un code `http` sur l'url spécifier.

prototype de la methode `code`.

```php
$app->code(int code, closure action);
```

| paramêtre | Type |
|----------|------|
| code   | Int, code d'erreur http |
| action | String, array, callable ou Closure |

```php
$app->code(404, function ()
{
  // code ici
});
```

### prefix

Souvent vous serez amener à grouper vos routes et effectuer un branchement simple pour bien orienté votre logique.
Les urls peuvent souvents se répéter comme ceci:

```php
$app->get('users', function ()
{
  // code ici
});

$app->get('users/:id', function ($id)
{
  // code ici
});

$app->get('users/:id/delete', function ($id)
{
  // code ici
});
```

Dans ce cas nous avons `users` qui se répéte plusieur fois. Comment bien organiser tout ça?
La réponse est le préfixage de route. Alors la methodes `prefix` nous permet de grouper plusieur urls.

prototype de le methode `prefix`.

```php
$app->prefix(string url, string|array|closure action);
```

| paramêtre | Type |
|----------|------|
| url      | String |
| action   | closuer, callable. Cette fonction prendra en parametre l'instance de l'application |

Donc pour réorganiser le code précédent, il faut faire:

```php
$app->prefix('/users', function () use ($app)
{
  $app->get('/', function ()
  {
   // code ici
  });
  $app->get('/:id', function ($id)
  {
   // code ici
  });
  $app->get('/:id/delete', function ($id)
  {
   // code ici
  });
});
```

> Notez qu'actuellement le préfixage ne peut pas d'imbriquer.

## Personnalisation

Le routing vous permet aussi de personnaliser vos urls. Voici la list des possibilités de personnalisation.

- Capturer des variables dans l'url
- Ajouter des critères, des restrictions sur les urls
- Donner un nom au route
- Association de middleware
- La composition d'action

Pour faire la personnalisation il faut utiliser l'enchainement de methode.
Dans le exemple qui suit nous allons utiliser la methode `get`.

### Capturer des variables dans l'url

Le routing vous permet de pouvoir capturer des variables dans urls.
Pour le faire il faut imperativement utiliser la notation `:nom_de_la_variable`.
Ensuite la variable capturé sera passer en paramètre à l'action (fonction à executer dans le cas où l'url est valide)
quelque soit le nombre de variable.

```php
$app->get('/:name', function ($name)
{
  return 'bonjour ' . $name;
});
```

### Ajouter des critères, des restrictions sur les urls

Parlant de capture de variable. Sécurisé ces variables est primordial. Alors le routing vous permet
aussi d'ajout des validateurs sur le variable. C'est la methode `where` qui s'en occupe.

prototype de la methode `where`.

```php
where(String name, String value);
// ou
where(array rules);
```

| paramêtre | Type |
|----------|------|
| name      | String, Le nom de la variable |
| value      | String, Le critaire de validation |
| rules      | Array, Tableau associatif dont la clé est la varibale et la valeur est le critaire de validation |

```php
$app->get('/:name', function ($name)
{
  return 'bonjour ' . $name;
})->where('name', '[a-z]+');

// S'il y a plusieurs variables
$callable = function ($name, $lastname, $number)
{
  return sprintf('bonjour <b>%s %s</b> et votre numéro est %s.', $name, $lastname, $number);
};

$app->get('/:name/:lastname/:number', $callable)
  ->where([
    'name' => '[a-z]+',
    'lastname' => '[a-z]+',
    'number' => '\d+'
  ]);
```

### Donner un nom au route

Quand vous être dans le développement d'un gros projet, les routes deviendront nombreuses
et la gestion visuel pour le développeur deviendra difficile.

Alors `bow` vous permet de donner des noms à vos routes comme ceci:

prototype de la methode `name`.

```php
name(String name);
```

| paramêtre | Type |
|----------|------|
| name    | String, Le nom de la route |

```php
$app->get('/:name', function ($name)
{
  return 'bonjour ' . $name;
})->name('hello');
```

### Association de middleware

Un middleware c'est un ou plusieurs actions qui ce placent entre la requete et l'action
a executer.

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