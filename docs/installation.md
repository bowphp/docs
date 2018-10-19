# Installation

- [Installation](#installation)
  - [Préréquis du serveur](#préréquis-du-serveur)
  - [Installation de Bow](#installation-de-bow)
  - [Test rapide](#test-rapide)
  - [Configuration](#configuration)
- [Configuration Serveur Web](#configuration-serveur-web)
  - [Apache](#apache)
  - [Nginx](#nginx)

Dans cette section nous allons apprendre à installer une application bow framework et faire un test rapide.

## Préréquis du serveur

Vous devez vous assurer les différents elements suivants sont installés sur votre machine.

- PHP >= 7
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- XML PHP Extension
- JSON PHP Extension

## Installation de Bow

Pour installer une copie de Bow, il vous faut d'abord installer [composer](https://getcomposer.org) et ensuite vous lancez la commande suivante:

```bash
$ composer create-project --prefer-dist bowphp/app
$ cd app
$ php bow run:server --port=8000 --host=0.0.0.0
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

Dans votre navigateur et tapez `http://localhost:8000/hello/bow`. `8000` est le port par défaut quand vous faites `php bow run:server`.

```html
hello, world bow
```

On peut faire un test avec `curl`:

```sh
$ curl http://localhost:8000/hello/bow
# Hello world bow
```

## Configuration

### Dossier Public

Après l'installation de Bow, vous devrez configurer le `document root` de votre serveur pour qu'il soit pointer vers le dossier `public`. Le fichier `index.php` qui se trouve dans le dossier public sert de point d'entrer pour toutes les requêtes HTTP (le front controlleur).

### Fichier de configuration

Tout les fichiers de configurations de Bow framework sont stockés dans le dossier `config`. Et tous les options sont documentés pour vous permettre d'aller vite dans votre dévéloppement. Vous êtes libre de regarder ces files pour vous famillariser avec les options disponibles.

### Permissions sur les dossiers

Après l'installation de Bow, vous aurez bésoin de configurer quelques permissions. Les dossiers contenu dans le dossier `storage` doivents avoir les permissions d'écriture sur le serveur web.

> Je vous invite à régarder ces documentations pour démarrer.

- [Controlleur](https://github.com/bowphp/docs/blob/3.0/controllers.md)
- [Routing](https://github.com/bowphp/docs/blob/3.0/routing.md)
- [Session](https://github.com/bowphp/docs/blob/3.0/session.md)
- [Base de donnée](https://github.com/bowphp/docs/blob/3.0/database.md)
- [Ressource](https://github.com/bowphp/docs/blob/3.0/storage.md)

## Configuration Serveur Web

### Apache

Bow inclut un fichier `public/.htaccess` qui est utilisé pour fair de ré-écriture d'URLs sans le `index.php` front controlleur dans le dossier. Après avoir installer Bow avec Apache, Soyez sûr que le module `mod_rewrite`  est activé sinon vous n'irrez pas bien loin.

Si le fichier `.htaccess` par defaut dans Bow ne fonction pas avec votre installation d'Apache, Essayez cette alternative:

```sh
Options +FollowSymLinks
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
```

### Nginx

Si vous utilisez Nginx, les directives suivantes dans votre configuration sauront faire fonctionner votre application Bow, tout les requêtes seront directement envoyer vers le front controlleur `index.php`:

```sh
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.