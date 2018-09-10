# Getting Started

Vous pouvez consulter la version de la documentation de Bowphp ici [https://bowphp.github.io](https://bowphp.github.io)

## Préréquis

Vous devez vous assurer les différents elements suivants sont installés sur votre machine.

* PHP >= 7
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* XML PHP Extension
* JSON PHP Extension

# Installation

Pour installer une copie de Bow il vous faut d'abord installer [composer](https://getcomposer.org) ensuite vous lancez la commande suivante:

```sh
  $ composer create-project --prefer-dist bowphp/app
  $ cd app
  $ php bow serve --port=8000 --host=0.0.0.0
```

> __NB__: Il est conseillé d'installer `composer` de façon globale sur votre machine. Pour ce faire référez-vous à la [documentation](https://getcomposer.org/download) d'installation de composer.
> Si vous n'êtes pas familier à `composer`, nous vous invitons à parcourir la documentation.

## Test rapide

Dans le dossier `routes`, ouvrez le fichier `get.php` et ajoutez:

```php
$app->get('/hello/:name', function($name) {
    return 'Hello, world '.$name;
});
```

Dans votre navigateur et tapez `http://localhost:5000/hello/bow`. `5000` est le port par défaut quand vous faites `php bow serve`.

```html
hello, world bow
```

Ou avec `curl`

```sh
$ curl http://localhost:5000/hello/bow
# Hello world bow
```