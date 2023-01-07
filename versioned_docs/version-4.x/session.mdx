---
id: http-session
title: "🎬 HTTP Session"
---

- [Introduction](#introduction)
- [Utilisation](#utilisation)
  - [Récupération des données](#récupération-des-données)
  - [Le helper global de session](#le-helper-global-de-session)
  - [Récupération de toutes les données de session](#récupération-de-toutes-les-données-de-session)
  - [Déterminer si un élément existe dans la session](#déterminer-si-un-élément-existe-dans-la-session)
  - [Stocker des données](#stocker-des-données)
- [Données flash](#données-flash)
- [Suppression de données](#suppression-de-données)

## Introduction

Les applications HTTP étant sans état, les sessions offrent un moyen de stocker des informations sur l'utilisateur dans plusieurs requêtes.

## Utilisation

### Récupération des données

il existe deux manières principales de travailler avec les données de `session` dans Bow, le helper global de `session` et via une instance `Bow\Http\Request`.

Premièrement, examinons l’accès à la session via une instance `Bow\Http\Request`, qui peut être indexée sur une méthode de contrôleur. N'oubliez pas que les dépendances des méthodes du contrôleur sont automatiquement injectées via le conteneur Bow:

```php
App\Controller;

use App\Controllers\Controller;
use App\Models\User;
use Bow\Http\Request;

class UserController extends Controller
{
  /**
   * Afficher d'un utilisateur
   *
   * @param Request $request
   * @param int $id
   * @return Response
   */
  public function show(Request $request, $id)
  {
    $value = $request->session()->get('key');

    //
  }
}
```

Lorsque vous récupérez un élément de la session, vous pouvez également transmettre une valeur par défaut comme deuxième argument de la méthode `get`. Cette valeur par défaut sera renvoyée si la clé spécifiée n'existe pas dans la session. Si vous transmettez une `closure` en tant que valeur par défaut à la méthode `get` et que la clé demandée n'existe pas, la `closure` sera exécutée et son résultat sera renvoyé:

```php
$value = $request->session()->get('key', 'default');

$value = $request->session()->get('key', function ()
{
  return 'default';
});
```

### Le helper global de session

Vous pouvez également utiliser la fonction PHP de `session` globale pour récupérer et stocker des données dans la session. Lorsque le helper `session` est appelé avec un seul argument de chaîne, il renvoie la valeur de cette clé de session. Lorsque l'assistant est appelé avec un tableau de paires clé/valeur, ces valeurs sont stockées dans la session:

```php
$app->get('home', function ()
{
  // Récupérer une donnée de la session
  $value = session('key');

  // Spécifier une valeur par défaut
  $value = session('key', 'default');

  // Stocker une donnée dans la session
  session(['key' => 'value']);
});
```

### Récupération de toutes les données de session

Si vous souhaitez récupérer toutes les données de la session, vous pouvez utiliser la méthode `all`:

```php
$data = $request->session()->all();
```

### Déterminer si un élément existe dans la session

Pour déterminer si un élément est présent dans la session, vous pouvez utiliser la méthode `has`. La méthode `has` renvoie true si l'élément est présent et n'est pas `null`:

```php
if ($request->session()->has('users')) {
  //
}
```

Pour déterminer si un élément est présent dans la session, même si sa valeur est `null`, vous pouvez utiliser la méthode `exists`. La méthode `exists` renvoie `true` si l'élément est présent:

```php
if ($request->session()->exists('users')) {
 //
}
```

### Stocker des données

Pour stocker des données dans la session, vous utiliserez généralement la méthode `put` ou le helper `session`.

```php
// Via une instance de requête
$request->session()->set('key', 'value');

// Via te helper session...
session(['key' => 'value']);
```

## Données flash

Parfois, vous souhaiterez peut-être stocker des éléments dans la session uniquement pour la prochaine demande. Vous pouvez le faire en utilisant la méthode `flash` ou le helper `flash`. Les données stockées dans la session à l'aide de cette méthode ne seront disponibles que lors de la requête HTTP suivante, puis seront supprimées. Les données Flash sont principalement utiles pour les messages d'état de courte durée:

```php
$request->session()->flash('status', 'Welcome !');
```

Si vous devez supprimer vos données Flash, vous pouvez utiliser la méthode de `clearFlash`:

```php
$request->session()->clearFlash();
```

## Suppression de données

La méthode de `remove` supprimera une donnée de la session. Si vous souhaitez supprimer toutes les données de la session, vous pouvez utiliser la méthode `flush`. Si par contre vous souhaitez supprimer tout les informations sauf les informations de flash, vous pouvez utiliser la méthode `clear`:

```php
// Supprimer une donnée de la session
$request->session()->remove('key');

// Supprimer tout les informations sauf les informations de flash
$request->session()->clear();

// Supprimer toutes les données de la session
$request->session()->flush();
```

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
