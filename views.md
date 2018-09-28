# Views

- [Création de vue](#creation-de-vue)
- [Vue avec Twig](#view-avec-twig)
- [Vue avec Pug PHP](#view-avec-pug-php)
- [Vue avec Mustache PHP](#view-avec-mustache-php)

## Création de vue

Les vues contiennent le code HTML fourni par votre application et séparent votre logique de contrôleur / application de votre logique de présentation. Les vues sont stockées dans le répertoire resources / views. Une simple vue peut ressembler à ceci:

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

Bow framework implement 3 moteur de template <a href="https://twig.symfony.com">Twig</a>, <a href="">Pug-PHP</a>, <a href="">Mustache-PHP</a>.
La configuration des vues ce trouve dans le fichier `view.php` du dossier `config`.

## Vue avec Twig

Twig est un moteur de templates pour le langage de programmation PHP, utilisé par défaut par le framework Symfony. 
Il aurait été inspiré par Jinja, moteur de template Python.

[Lien de la documentation](https://twig.symfony.com/ 'Lien de la documentation')

## Vue avec Pug PHP

Pug est un moteur de templates de haute performance fortement influencé par Haml et implémenté principalement avec JavaScript pour Node.js et navigateurs.
Pug-PHP est une réécriture de pour PHP avec les mêmes fonctionnalités.

[Lien de la documentation](https://pugjs.org/language 'Lien de la documentation')

## Vue avec Mustache PHP

Mustache est un moteur de templates de haute performance fortement influencé par Handlebar et implémenté principalement avec JavaScript pour Node.js et navigateurs.
Mustache-PHP est une réécriture de pour PHP avec les mêmes fonctionnalités.

[Lien de la documentation](https://github.com/bobthecow/mustache.php/wiki/Mustache-Tags 'Lien de la documentation')

### Utilisation

Dans le fichier view.php du dossier de configuration. Par défaut Bow utilise `twig`.

Vous pouvez changer le moteur de template en modifiant la valeur de l'entré `extension` qui peut seulement prendre les values entre
- twig
- mustache
- pug

Vous pouvez changer l'extension de template en modifiant la valeur de l'entré `extension`.

Exemple d'utilisation: (Avec le classe `View`)
Cette utilise la methode `make`.

> View::make(view, data, status)

| paramètre | type | description|
|-----------|------|------------|
| view      | String| Le chemin de la vue sachant dans le moteur se base sur le dossier des vues|
| data      | Array, Object| Les données a passé à la vue|
| status    | Integer | Le code http|

```php
use Bow\View\View;
echo View::make('nom-de-la-vue-sans-extension');
```

Pour passer des variables a la vue

```php
use Bow\View\View;
echo View::make('nom-de-la-vue-sans-extension', ['name' => 'bow'], 200);
```

Vous pouvez utiliser le helper `view` qui s'utilise de la même façon.

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

### Plugin

Bow implément aussi au travers d'un plugin, le moteur de template `Blade` utilisé par [Laravel](https://laravel.com) et aussi un template extermement simpliste nommé `Tintin`.

- Le plugin Blade [papac/bow-blade](https://github.com/papac/bow-blade)
- Le plugin Tintin [bowphp/tintin](https://github.com/bowphp/tintin)