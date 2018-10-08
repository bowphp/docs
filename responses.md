# HTTP Response

- [Introduction](#introduction)

## Introduction

Tous les routes et contrôleurs doivent renvoyer une réponse à renvoyer au navigateur de l'utilisateur. Bow fournit plusieurs façons différentes de renvoyer des réponses. La réponse la plus élémentaire est le retour d'une chaîne depuis une route ou un contrôleur. Bow convertira automatiquement la chaîne en une réponse HTTP complète.

## Envoyé un résponse

### Une chaine de caractère

```php
$app->get('/', function () {
  return "Hello, world";
});
```

### Une tableau ou un Object

```php
$app->get('/', function () {
  return [10, 2, 12];
});
```

### Une Collection

```php
$app->get('/', function () {
  return collect([10, 2, 12]);
});
```

### Un Model de Barry ORM

```php
use App\User;

$app->get('/', function () {
  $model = User::where('id', 1)->first();
  
  return $model;
});
```

### Compilation de view

```php
use App\User;

$app->get('/', function () {
  return response()->render('template/filename');
});
```

### Modification du code d'erreur

```php
use App\User;

$app->get('/', function () {
  $response = response();
  
  return $response->status(400);
});
```

### Ajouter une entête http

```php
$response->addHeader('Content-Type', 'application/json');
```

### Envoyer un json

```php
$response->json(['message' => 'hello world'], $code = 200, [
  'X-Proto-Value' => 1 // Juste un test
]);
```

### Envoyer une reponse depuis les vues

```php
$response->render('users', ['users' => []], 200, [
  'X-Proto-Value' => 1 // Juste un test
])
```