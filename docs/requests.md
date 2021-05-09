---
id: http-request
title: 🚀 HTTP Request
---

- [Introduction](#introduction)
- [Accéder à la requête](#accéder-à-la-requête)
- [Recupération des données](#recupération-des-données)
  - [Via des Closures de route](#via-des-closures-de-route)
  - [Via un controlleur](#via-un-controlleur)
- [Chemin de requête et méthode](#chemin-de-requête-et-méthode)
  - [Récupérer le chemin de requête](#récupérer-le-chemin-de-requête)
  - [Récupérer la méthode de requête](#récupérer-la-méthode-de-requête)
  - [Vérifier si la requête est en AJAX](#vérifier-si-la-requête-est-en-ajax)
  - [Récupérer une entrée](#récupérer-une-entrée)
  - [Recupération d'une partie des données d'entrée](#recupération-dune-partie-des-données-dentrée)
  - [Déterminer si une valeur d'entrée est présente](#déterminer-si-une-valeur-dentrée-est-présente)
  - [Déterminer l'adresse IP de client](#déterminer-ladresse-ip-de-client)
  - [Déterminer le Port de client](#déterminer-le-port-de-client)
  - [Déterminer le protocol de client](#déterminer-le-protocol-de-client)
  - [Récupérer les entête-https](#récupérer-les-entête-https)
  - [Récupérer le IP du server](#récupérer-le-ip-du-server)
  - [Récupérer le domaine Origin](#récupérer-le-domaine-origin)
  - [Récupérer le temps de la requête](#récupérer-le-temps-de-la-requête)
  - [Récupérer une instance de la session](#récupérer-une-instance-de-la-session)
  - [Récupérer l'authentification courante](#récupérer-lauthentification-courante)

## Introduction

Une requête HTTP est le message que l'utilisateur envoie à l'application Bow via son navigateur ou d'autre outil tel que `curl`, `httpie` et autre.

Ce message est traité par Bow à travers la classe [`Bow\Http\Request`](https://bowphp.com/api/master/Bow/Http/Request.html). Cette classe vous permet d'avoir les informations sur la requête envoyé par l'utilisateur comme son adresse ip, le type du message, les information d'un formulaire etc...

## Accéder à la requête

Pour capturer un message ou requête HTTP, vous pouvez premièrement utiliser le helper `request()` qui vous donne une instance de [`Bow\Http\Request`](https://bowphp.com/api/master/Bow/Http/Request.html), deuxièmement vous pouvez passer par l'injecteur de dépendance via une action de contrôleur.

## Recupération des données

En utilisant quelques méthodes simples, vous pouvez accéder à toutes les entrées utilisateur de votre application.

### Via des Closures de route

- Avec le helper `request`:

```php
$app->get('/', function ()
{
  $request = request();

  $name = $request->get('name');
  // code ici
});
```

- Par l'injection de dépendance

```php
use Bow\Http\Request;

$app->get('/', function (Request $request)
{
  return $request->get('name');
});
```

### Via un controlleur

Si votre méthode de contrôleur attend également une entrée d'un paramètre de route, vous devez répertorier les paramètres de votre route après vos autres dépendances. Par exemple, si votre route est défini comme suit:

```php
$app->get('/users/:id', 'UserController::show');
```

Vous pouvez toujours taper la requête [Bow\Http\Request](https://bowphp.com/api/master/Bow/Http/Request.html) et accéder à l'id de votre paramètre de route en définissant votre méthode de contrôleur comme suit:

```php
namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\User;
use Bow\Http\Request;

class UserController extends Controller
{
  /**
   * Afficher le profil pour l'utilisateur donné
   *
   * @param Request $reuest
   * @return mixed
   */
  public function show(Request $reuest, $id)
  {
    $user = User::where('id', $id)->first();

    $user->name = $request->get('name');

    $user->save();

    return $this->render('user/profile', ['user' => $user]);
  }
}
```

## Chemin de requête et méthode

### Récupérer le chemin de requête

La méthode `path` renvoie les informations de chemin de la requête. Ainsi, si la requête entrante est ciblée sur `http://example.com/bar/zar`, la méthode path retournera `bar/zar`:

```php
$uri = $request->path();
```

La méthode `is` vous permet de vérifier que le chemin de requête entrant correspond à un modèle donné. Vous pouvez utiliser le caractère `*` comme caractère générique lorsque vous utilisez cette méthode:

```php
if ($request->is('users/*')) {
  //
}
```

### Récupérer la méthode de requête

La méthode `method` retournera le verbe HTTP pour la requête. Vous pouvez utiliser les méthodes `isPost`, `isGet`, `isPut`, `isDelete`, `isOptions`, `isPutch` pour vérifier que le verbe HTTP correspond à une méthode HTTP de la requête donnée:

```php
$method = $request->method();

if ($request->isPost()) {
  $filename = $request->file('filename');
  $filename->moveTo('/some/directory');
}
```

### Vérifier si la requête est en AJAX

Pour déterminer si une requête a été envoyé via AJAX, la méthode `isAjax` vous permet de vérifier ça.

```php
if ($request->isAjax()) {
  //
}
```

### Récupérer une entrée

Souvent la requête envoyé par le client HTTP contient des données souvent demander pour actioner un mecanisme par exemple celui d'une inscription.

Bow Framework dans son démarrage optimise le donnée envoyés au serveur en remplaçant les valeur vide par `null` et supprimer les spaces blancs dans les valeurs de chaque champs avec la fonction php `trim`.

```php
$name = $request->get('name');

// Récupérer directement la valeur via le nom du champ
$name = $request->name;
```

> Vous pouvez aussi défini une valeur par défaut à `get`

```php
$name = $request->get('name', 'Papac');

$name = $request->get('name', function () {
  return User::first()->name;
});
```

Ceci permet justement de récupérer le contenu du champ `name` d'un formulaire ou d'un url en fonction du type de requête.

### Recupération d'une partie des données d'entrée

Si vous devez extraire un sous-ensemble des données d'entrée, vous pouvez utiliser les méthodes `ignore` et `only`. Ces deux méthodes acceptent un seul tableau ou une liste d'arguments dynamique:

```php
$input = $request->only(['name', 'lastname']);

$input = $request->only('name', 'lastname');

$input = $request->ignore(['password']);

$input = $request->ignore('password');
```

### Déterminer si une valeur d'entrée est présente

Vous devez utiliser la méthode `has` pour déterminer si une valeur est présente sur la requête. La méthode `has` renvoie `true` si la valeur est présente dans la requête:

```php
if ($request->has('name')) {
  //
}
```

### Déterminer l'adresse IP de client

Souvent vous allez vouloir l'adresse IP du client qui à envoyer la requête, la méthode `ip` permet comme son nom l'indique de récupérer l'adresse ip de client:

```php
$ip = $request->ip();

if ($ip == 'xxx.xxx.xxx.xxx') {
  // code ici
}
```

### Déterminer le Port de client

La méthode `port` permet comme son nom l'indique de récupérer le port de client:

```php
$port = $request->port();

// Code ici
```

### Déterminer le protocol de client

La méthode `protocol` permet comme son nom l'indique de récupérer le protocol de client:

```php
$protocol = $request->protocol();

// Code ici
```

Il y a aussi la méthode `isProtocol` qui permet de faire de vérification sur le protocol:

```php
if ($request->isProtocol('http')) {
  //
}
```

Et `isSecure` vous permet de vérifier si la requête est sécurisé.

```php
if ($request->isSecure()) {
  //
}
```

### Récupérer les entête-https

Vous avez la possibilité de récupérer les [entête-https](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers) du client avec la méthode `getHeader` et `hasHeader` pour vérifier l'existance d'une entête-http.

```php
$header = $request->getHeader('content-type');

echo $header;
// text/html

if ($request->hasHeader('x-proxy-key')) {
  // code ici
}
```

### Récupérer le IP du server

Vous avez la possibilité de récupérer l'adresse IP de serveur sur lequel votre application Bow est hébergé.

```php
$hostname = $request->hostname();

echo $hostname;
// exemple.com
```

### Récupérer le domaine Origin

Le domaine dit `origin` est l'adresse récupérer avec la méthode `hostname` ensuite associé avec le protocol de la requête.

```php
$hostname = $request->origin();

echo $hostname;
// https://exemple.com
```

### Récupérer le temps de la requête

Il est souvent intéressent de voir combien de temps à faire une requête. La méthode `time` nous permet de le faire et elle retourne un timestamp.

```php
$time = $request->time();

echo $time;
```

### Récupérer une instance de la session

Il est souvent intéressent de manipuler la session directement. La méthode `session` nous permet de le faire et elle retourne l'instance de la session.

```php
$session = $request->session();

var_dump($session);
```

> Pour plus d'information sur la session visitez cette page [HTTP Session](./seeding.md)

### Récupérer l'authentification courante

Vous pouvez aussi avoir l'authenticiation en cours si vous avez utiliser le système d'authentification native de Bow Framework.

```php
$user = $request->user();

// Definir le guard
$user = $request->user('api');
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
