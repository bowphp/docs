---
id: views
title: Templating
---

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Package supplementaire](#package-supplementaire)
- [Création de vue](#création-de-vue)
- [Vue avec Twig](#vue-avec-twig)
- [Vue avec Pug PHP](#vue-avec-pug-php)
- [Vue avec Mustache PHP](#vue-avec-mustache-php)

## Introduction

Les vues contiennent le code HTML fourni par votre application et séparent votre logique de contrôleur / application de votre logique de présentation:

## Configuration

Bow framework implement 3 moteur de template par defaut, [Twig](https://twig.symfony.com), [Pug-PHP](https://www.phug-lang.com/), [Mustache-PHP](https://github.com/bobthecow/mustache.php/wiki/Mustache-Tags).
La configuration des vues ce trouve dans le fichier `view.php` du dossier `config`/..

Spécifiez le nom du template à utiliser avec option `engine` de la configuration, cette option peut prendre le valeur suivant `twig`, `pug` et `mustache`. Par défaut Bow utilise `twig`.

Vous pouvez aussi changer l'extension de template en modifiant la valeur de l'entré `extension`. Vous verez également que les vues sont stockées dans le répertoire `components/views` par defaut.

## Package supplementaire

Dans le cas où vous avez opter pour un autre moteur template, voici la liste des packages nécessaires:

| Template | Package |
| ----------------- | ----------- |
| `mustache` | `mustache/mustache` |
| `pug` | `pug-php/pug` |

## Création de vue

Une simple vue peut ressembler à ceci

```twig
<!-- View stored in components/views/greeting.twig -->
<html>
  <body>
    <h1>Hello, {{ name }}</h1>
  </body>
</html>
```

Apres avoir modifier et sauvegarde votre vue dans `components/views/greeting.twig`. Vous pouvez maintenant l'envoyer au utilisateur avec le helper view comme ceci:

```php
$app->get('/', function() {
  return view('greeting', ['name' => 'Bowphp']);
});
```

### Utilisation

Exemple d'utilisation: (Avec le classe `View`)
Cette utilise la methode `parse`.

```php
View::parse(view, data, status)
```

| paramètre | type | description|
|-----------|------|------------|
| `view`      | `String` | Le chemin de la vue sachant dans le moteur se base sur le dossier des vues|
| `data`      | `Array`, `Object` | Les données a passé à la vue|
| `status`    | `Integer` | Le code http |

```php
use Bow\View\View;

echo View::parse('nom-de-la-vue-sans-extension');
```

Pour passer des variables à la vue

```php
use Bow\View\View;

echo View::parse(
  'nom-de-la-vue-sans-extension',
  ['name' => 'bow'],
  200
);
```

> Vous pouvez utiliser le helper `view` qui s'utilise de la même façon.

Avec la vue suivante:

```twig
<!-- View stored in components/views/greeting.twig -->
<html>
 <body>
  <h1>Hello, {{ name }}</h1>
 </body>
</html>
```

Exemple dans un controlleur:

```php
namespace App\Controllers;

use App\Controllers\Controller;

class HomeController extends Controller
{
  /**
   * Show hello page
   *
   * @return mixed
   */
  public function show()
  {
    return view('greeting', ['name' => 'Bowphp']);
    // Ou
    return $this->render('greeting', ['name' => "Bowphp"]);
  }
}
```

## Vue avec Twig

Twig est un moteur de templates pour le langage de programmation PHP, utilisé par défaut par le framework Symfony.
Il aurait été inspiré par Jinja, moteur de template Python.

Exemple de code:

```php
$names = [
  "resque", "hub", "rip"
];
```

```twig
{# components/views/greeting.twig #}
<html>
  <body>
    <h1>Hello, User</h1>
    {% for name in names %}
      <p>Hello, {{name}}</p>
    {% endfor %}
  </body>
</html>
```

[Lien de la documentation](https://twig.symfony.com/ 'Lien de la documentation')

## Vue avec Pug PHP

Pug est un moteur de templates de haute performance fortement influencé par Haml et implémenté principalement avec JavaScript pour Node.js et navigateurs.
Pug-PHP est une réécriture de pour PHP avec les mêmes fonctionnalités.

Exemple de code:

```php
$names = [
  "resque", "hub", "rip"
];
```

```pug
<!-- components/views/greeting.pug -->
doctype html
html
  body
    h1 Hello User
    each name in names
      p Hello, #{name}
```

[Lien de la documentation](https://www.phug-lang.com 'Lien de la documentation')

## Vue avec Mustache PHP

Mustache est un moteur de templates de haute performance fortement influencé par Handlebar et implémenté principalement avec JavaScript pour Node.js et navigateurs.
Mustache-PHP est une réécriture de pour PHP avec les mêmes fonctionnalités.

Exemple de code:

```php
$names = [
  ['name' => "resque"],
  ['name' => "hub"],
  ['name' => "rip"],
];
```

```jinja
<!-- components/views/greeting.tpl -->
<html>
  <body>
    <h1>Hello, Users</h1>
    {{# names}}
      <p>Hello, {{name}}</p>
    {{/ names}}
  </body>
</html>
```

[Lien de la documentation](https://github.com/bobthecow/mustache.php/wiki/Mustache-Tags 'Lien de la documentation')

### Plugin

Bow implément aussi au travers d'un plugin, le moteur de template `Blade` utilisé par [Laravel](https://laravel.com) et aussi un template extermement simpliste nommé `Tintin`.

- Le plugin Blade [papac/bow-blade](https://github.com/papac/bow-blade)
- Le plugin Tintin [bowphp/tintin](https://github.com/bowphp/tintin)

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.