# Installation

## Préréquis

Vous devez vous assurer les différents elements suivants sont installés sur votre machine.

* php >= 7.0
* mcrypt
* mb_string
* PDO
* php-sqlite3 (optionnel) seulement si vous utiliser une db sqlite.
* php-openssl
* php-curl

Pour installer une copie de Bow il vous faut d'abord installer [composer](https://getcomposer.org) ensuite vous lancez la commande suivante:

```sh
  $ php composer.phar create-project --prefer-dist bowphp/app
  $ cd bow
  $ php bow serve
```

> __NB__: Il est conseillé d'installer `composer` de façon globale sur votre machine. Pour ce faire référez-vous à la [documentation](https://getcomposer.org/download) d'installation de composer.
> Si vous n'êtes pas familier à `composer`, nous vous invitons à parcourir la documentation.

## Test rapide

Dans le dossier `routes`, ouvrez le fichier `get.php` et ajoutez:

```php
$app->get('/hello/:name', function($name) {
    return 'hello world '.$name;
});
```

Dans votre navigateur et tapez `http://localhost:5000/hello/bow`. `5000` est le port par défaut quand vous faites `php bow serve`.
```
=>// hello world bow
```

Ou avec `curl`
```
$ curl http://localhost:5000/hello/bow
=>// hello world bow
```

## Ngnix

Pour les utilisateurs de nginx, vous devez ajouter les lignes suivantes à votre configuration.

```nginx
root /path/to/bow/public/;

location / {
	if (!-e $request_filename){
		rewrite ^(.*)$ /index.php break;
	}
}
```