# HTTP Response

- [Introduction](#introduction)
- [Envoyé un résponse](#envoyé-un-résponse)
  - [Une chaine de caractère](#une-chaine-de-caractère)
  - [Une Collection et Une tableau ou un Object](#une-collection-et-une-tableau-ou-un-object)
  - [Un Model de Barry ORM](un-model-de-barry-orm)
- [Modification de réponse](#modification-de-réponse)
  - [Modification du code d'erreur](#modification-du-code-d-erreur)
  - [Ajouter une entête http](#ajouter-une-entête-http)
- [Envoyer un json](#envoyer-un-json)
  - [Protototype de la methode json](#protototype-de-la-methode-json)
  - [Exemple d'envoye de JSON](#exemple-d-envoye-de-json)
- [Envoyer une reponse depuis les vues](#envoyer-une-reponse-depuis-les-vues)
  - [Protototype de la methode `render`](#protototype-de-la-methode-render)
  - [Exemple d'envoye de vue](#exemple-d-envoye-de-vue)
- [Redirection](#redirection)

## Introduction

Tous les routes et contrôleurs doivent renvoyer une réponse à renvoyer au navigateur de l'utilisateur. Bow fournit plusieurs façons différentes de renvoyer des réponses. La réponse la plus élémentaire est le retour d'une chaîne depuis une route ou un contrôleur. Bow convertira automatiquement la chaîne en une réponse HTTP complète.

## Envoyé un résponse

### Une chaine de caractère

Une réponse HTTP peut être une chaine de caractère.

```php
$app->get('/', function () {
  return "Hello, world";
});
```

### Une Collection et Une tableau ou un Object

Une réponse HTTP peut être une instance de [`Bow\Support\Collection`](https://bowphp.github.com/api/master/Bow/Support/Collection.html).

```php
$app->get('/array', function () {
  return [10, 2, 12, 'name' => 'Dakia'];
});

$app->get('/collection', function () {
  return collect([10, 2, 12]);
});

$app->get('/object', function () {
  return (object) ['name' => 'Dakia'];
});
```

### Un Model de Barry ORM

La réponse HTTP peut êtres un Model ou un Collection de model, Bow la convertis directement en JSON.

```php
use App\User;

$app->get('/', function () {
  $model = User::where('id', 1)->first();
  
  return $model;
});
```

## Modification de réponse

### Modification du code d'erreur

Il est très important d'ajouter les codes d'erreurs à votre réponse HTTP si vous développew un API Restful. La methode `status` vous permet de le faire.

```php
use App\User;

$app->get('/', function () {
  $response = response();
  
  return $response->status(400);
});
```

Pour plus d'information sur les code HTTP. Consultez ce [lien](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP).

Si dans votre API, vous n'avez pas d’information à renvoyer. Il est préférable de lui retourne un `204` qu'un `200` :tada:.

### Ajouter une entête http

Souvent vous serez amener à ajouter d'autre entête HTTP à votre réponse HTTP. La methode `addHeader` et `withHeaders` vous permet de le faire.

```php
$response->addHeader('Content-Type', 'application/json');
```

Nous pouvez ajouter plusieur entête en même temps:

```php
$response->withHeaders([
  'Content-Type' => 'application/json',
  'X-Proto-Value' => 1
]);
```

## Envoyer un json

Dans les applications REST (Api Rest) les informations sont généralement retournés en JSON. Pour envoyer un information JSON au client, vous pouvez utiliser le help `json` ou la methode `json` sur l'instance de `Bow\Http\Response`.

### Protototype de la methode `json`

```php
$response->json($data, $code, $headers);
```

| paramêtre | Type |
|----------|------|
| $data  | `Array` \| `stdClass` \| `Iterable` \| `JsonSerializable` - Les données à sérialiser |
| $code  | `Int` - Le code du status HTTP |
| $headers  | `Array` - Les entêtes à ajouter sur le réponse |

### Exemple d'envoye de JSON

Exemple:

```php
return $response->json(['message' => 'hello world'], $code = 200, [
  'X-Proto-Value' => 1 // Juste un test
]);
```

Ici Bow ajout directement l'entête HTTP `Content-Type` à `application/json`. Donc plus besoin de l'ajouter manuellement dans le `$headers`.

## Envoyer une reponse depuis les vues

Souvent vous pouvez utiliser un instance de response pour faire le rendu de view via la methode `render`.

### Protototype de la methode `render`

```php
$response->render($view_name, $code, $headers);
```

| paramêtre | Type |
|----------|------|
| $view_name  | `String` - Le nom d'une vue à rendre |
| $code  | `Int` - Le code du status HTTP |
| $headers  | `Array` - Les entêtes à ajouter sur le réponse |

### Exemple d'envoye de vue

Exemple:

```php
$users = User::where('id', '!=', 2)->get();

return $response->render('users', ['users' => $users], 200, [
  'X-Proto-Value' => 1 // Juste un test
]);
```

## Redirection

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.