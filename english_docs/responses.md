---
id: http-response
title: HTTP Response
---

- [Introduction](#introduction)
- [Envoyé une réponse](#envoyé-une-réponse)
  - [Une chaine de caractère](#une-chaine-de-caractère)
  - [Une Collection et Un tableau ou un Object](#une-collection-et-un-tableau-ou-un-object)
  - [Un modèle BARRY](#un-modèle-barry)
- [Modification de réponse](#modification-de-réponse)
  - [Modification du code d'erreur](#modification-du-code-derreur)
  - [Ajouter une entête HTTP](#ajouter-une-entête-http)
- [Envoyer un JSON](#envoyer-un-json)
  - [Protototype de la méthode `json`](#protototype-de-la-méthode-json)
  - [Exemple d'envoye de JSON](#exemple-denvoye-de-json)
- [Envoyer une réponse depuis les vues](#envoyer-une-réponse-depuis-les-vues)
  - [Protototype de la méthode `render`](#protototype-de-la-méthode-render)
  - [Exemple d'envoye de vue](#exemple-denvoye-de-vue)
  - [Télécharger un fichier](#télécharger-un-fichier)
  - [Protototype de la méthode `download`](#protototype-de-la-méthode-download)
  - [Exemple de télécharge](#exemple-de-télécharge)
- [Redirection](#redirection)
  - [Redirection avec `to`](#redirection-avec-to)
    - [Prototype de `to`](#prototype-de-to)
  - [Redirection avec `back`](#redirection-avec-back)
    - [Prototype de `back`](#prototype-de-back)
  - [Redirection avec des informations](#redirection-avec-des-informations)

## Introduction

Tous les routes et contrôleurs doivent retourner une réponse à renvoyer à l'utilisateur. Bow fournit plusieurs façons différentes de renvoyer des réponses. La réponse la plus élémentaire est le retour d'une chaîne depuis une route ou un contrôleur. Bow convertira automatiquement la chaîne en une réponse HTTP complète.

## Envoyé une réponse

### Une chaine de caractère

Une réponse HTTP peut être une chaine de caractère.

```php
$app->get('/', function ()
{
  return "Hello, world";
});
```

### Une Collection et Un tableau ou un Object

Une réponse HTTP peut être une instance de [`Bow\Support\Collection`](https://bowphp.com/api/master/Bow/Support/Collection.html).

```php
$app->get('/array', function ()
{
  return [10, 2, 12, 'name' => 'Dakia'];
});

$app->get('/collection', function ()
{
  return collect([10, 2, 12]);
});

$app->get('/object', function ()
{
  return (object) ['name' => 'Dakia'];
});
```

### Un modèle BARRY

La réponse HTTP peut être un `Model` ou une `Collection` de modèle, Bow la convertis directement en `JSON`.

```php
use App\Models\User;

$app->get('/', function ()
{
  $model = User::where('id', 1)->first();
  
  return $model;
});
```

## Modification de réponse

### Modification du code d'erreur

Il est très important d'ajouter les codes d'erreurs à votre réponse HTTP si vous développez un API RESTFUL. La méthode `status` vous permet de le faire.

```php
use App\Models\User;

$app->get('/', function ()
{
  $response = response();
  
  return $response->status(400);
});
```

Pour plus d'information sur les code HTTP. Consultez ce [lien](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP).

Si dans votre API, la requête a été traitée avec succès et que vous n'avez pas d’information à renvoyer. Il est préférable de lui retourne un **204** qu'un **200** :tada:.

### Ajouter une entête HTTP

Souvent vous serez amener à ajouter d'autre entête HTTP à votre réponse HTTP. La méthode `addHeader` et `withHeaders` vous permet de le faire.

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

## Envoyer un JSON

Dans les applications REST (Api REST/RESTFUL) les informations sont généralement retournés en JSON. Pour envoyer un information JSON au client, vous pouvez utiliser le help `json` ou la méthode `json` sur l'instance de `Bow\Http\Response`.

### Protototype de la méthode `json`

```php
$response->json($data, $code, $headers);
```

| Paramètre | Type | Description |
|----------|------|------|
| $data  | **Array**, `stdClass`, `Iterable`, `JsonSerializable` | Les données à sérialiser |
| $code  | **Int** | Le code du status HTTP |
| $headers  | **Array** | Les entêtes à ajouter sur le réponse |

### Exemple d'envoye de JSON

Exemple:

```php
$data = ['message' => 'Hello, World'];

return $response->json($data, $code = 200, [
  'X-Proto-Value' => 1 // Juste un test
]);
```

Avec le HELPER:

```php
$data = ['message' => 'Hello, World'];

return json($data, 200, [
  'X-Proto-Value' => 1 // Juste un test
]);
```

Ici, Bow ajout directement l'entête HTTP `Content-Type` à `application/json`, donc plus besoin de l'ajouter manuellement dans le `$headers`.

## Envoyer une réponse depuis les vues

Souvent vous pouvez utiliser un instance de `Bow\Http\Response` pour faire le rendu de [vue](./views) via la méthode `render`.

### Protototype de la méthode `render`

```php
$response->render($name, $data, $code, $headers);
```

| Paramètre | Type | Description |
|----------|------|
| $name  | **String** - Le nom d'une vue à rendre |
| $data  | **Array** - Les données à envoyer à la vue |
| $code  | **Int** - Le code du status HTTP |
| $headers  | **Array** - Les entêtes à ajouter à la réponse |

### Exemple d'envoye de vue

Exemple:

```php
$users = User::where('id', '!=', 2)->get();

return $response->render('users', ['users' => $users], 200, [
  'X-Proto-Value' => 1 // Juste un test
]);
```

### Télécharger un fichier

Souvent vous serez amener à mettre en place des systèmes de téléchargement de fichier zip ou image, encore vous allez faire des applications où il faut s'authentifier avant de télécharge des fichiers du type dropbox. Bow offre un API simple via la classe [`Bow\Http\Response`](https://bowphp.com/api/master/Bow/Http/Response.html) pour télécharger un fichier avec la méthode `download`.

### Protototype de la méthode `download`

```php
$response->download($file, $filename = null, $headers, $disposition = 'attachment');
```

| Paramètre | Type | Description |
|----------|------|------|
| $file  | **String** | Le chemin absolu du fichier |
| $filename  | **String** | Le nouveau du fichier par defaut est **null** |
| $headers  | **Array** | Les entêtes à ajouter à la réponse |
| $disposition  | **String** | Indiquant si le contenu devrait être affiché en ligne dans le navigateur, c'est-à-dire en tant que page Web, ou en pièce jointe téléchargé et enregistré localement. |

Plus d'information sur l'entête [`Content-Disposition`](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Disposition).

### Exemple de télécharge

Exemple:

```php
$file = '/path/to/file.png';

return $response->download($file, 'image.png');
```

## Redirection

Vous serez certainement amener à faire des redirections vers d'autres ressources et cela en réalité constitue une réponse HTTP. Les méthodes `to` et `back` (qui comme son nom l'indique permet de faire une revenir sur en arrière) de la classe [`Bow\Http\Redirect`](https://bowphp.com/api/master/Bow/Http/Redirect.html).

### Redirection avec `to`

La redirection avec `to` permet de renvoyer l'utilisateur sur une autre la page.

```php
return redirect()->to($path);
```

#### Prototype de `to`

| Paramètre | Type | Description |
|----------|------|------|
| $path  | **String** | L'URL de rédirection |

```php
return redirect()->to('/users');
```

### Redirection avec `back`

La redirection avec `back` permet de renvoyer l'utilisateur sur la page précédente.

```php
return redirect()->back($status_code);
```

#### Prototype de `back`

| Paramètre | Type |
|----------|------|
| $status_code  | **Int** - Le code HTTP de la réponse par defaut est égale à `302` |

```php
return redirect()->back();
```

### Redirection avec des informations

Vous pouvez aussi faire la redirection avec les informations envoyés par l'utilisateur et ceci avec la méthode `withInput`, `withFlash` comme ceci:

```php
 return redirect()->back()->withInput();
 // Ou
 return redirect()->to("/home")->withInput();
```

Avec un message flash

```php
 return redirect()->back()->withFlash('success', 'Papac');
```

Notez que vous pouvez donner une tableau de valeur à `withInput` qui sera une collection d'information à envoyer à utilisateur.

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
