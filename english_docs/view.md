---
id: views
title: Vues
---

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Création de vue](#création-de-vue)
  - [Utilisation](#utilisation)
- [Package supplémentaire](#package-supplémentaire)
  - [Installation de twig](#installation-de-twig)
  - [Vue avec Twig](#vue-avec-twig)

## Introduction

Les vues contiennent le code HTML fourni par votre application et séparent votre logique de contrôleur/application de votre logique de présentation:

<script id="asciicast-srlT0uYy1bOin8Z3Z35E66JJB" src="https://asciinema.org/a/srlT0uYy1bOin8Z3Z35E66JJB.js" data-speed="3" data-rows="20" async></script>

## Configuration

Bow Framework implémente 2 moteurs de template et le template par defaut est **[Tintin](./tintin)**.
La configuration des vues ce trouve dans le fichier `view.php` du dossier `config/`.

Spécifiez le nom du template à utiliser avec option `engine` de la configuration, cette option peut prendre le valeur suivant `tintin`, `twig` et `php`. Par défaut Bow utilise `tintin`.

> Notez que si vous définissez `php`, le rendu des vues se fera sans moteur de template

Vous pouvez aussi changer l'extension de template en modifiant la valeur de l'entré `extension`. Vous verez également que les vues sont stockées dans le répertoire `templates` par defaut.

## Création de vue

Une simple vue peut ressembler à ceci

```html
<!-- View stored in templates/greeting.tintin.php -->
<html>
  <body>
    <h1>Hello, {{ $name }}</h1>
  </body>
</html>
```

Apres avoir modifier et sauvegarde votre vue dans `templates/greeting.tintin.php`. Vous pouvez maintenant l'envoyer au utilisateur avec le helper view comme ceci:

```php
$app->get('/', function() {
  return view('greeting', ['name' => 'Tintin']);
});
```

### Utilisation

Exemple d'utilisation: (Avec le classe `View`)
Cette utilise la méthode `parse`.

```php
View::parse(view, data, status)
```

| Paramètre | type | description|
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

```html
<!-- View stored in templates/greeting.tintin.php -->
<html>
 <body>
  <h1>Hello, {{ $name }}</h1>
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
    // Ou
    return response()->render('greeting', ['name' => "Bowphp"]);
  }
}
```

> Tintin est le template native de Bow Framework. Pour plus d'information sur le moteur de template Tintin [ici](./tintin).

## Package supplémentaire

Dans le cas où vous avez opter pour le moteur de template `twig`, voici la liste du package twig:

| Template | Package |
| ------- | ------- |
| Twig | `twig/twig` |

### Installation de twig

```bash
composer require twig/twig
```

### Vue avec Twig

Twig est un moteur de templates pour le langage de programmation PHP, utilisé par défaut par le Framework Symfony.

Il aurait été inspiré par `Jinja`, moteur de template Python utilisé dans [Django](https://www.djangoproject.com).

Exemple de code:

```php
$names = [
  "resque", "hub", "rip"
];
```

```html
{# templates/greeting.twig #}
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
