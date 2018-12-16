---
id: installation
title: Installation
---

- [Prérequis](#prerequis)
- [Créer un projet](#creer-un-projet)
- [Démarrer votre projet](#demarrer-votre-projet)
- [Configuration](#configuration)
- [Configuration Serveur Web](#configuration-serveur-web)
  - [Apache](#apache)
  - [Nginx](#nginx)

## Prérequis

Pour créer une nouvelle application Bow, veuillez d'abord vous assurez que votre ordinateur remplit les conditions suivantes:

- PHP >= 7
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- XML PHP Extension
- JSON PHP Extension

> Si vous êtes sous Windows et que vous utilisez un server web tel que [Laragon](https://laragon.org/), ces dépendances sont déjà satisfaites.

## Créer un projet

Bow utilise [Composer](https://getcomposer.org) pour gérer ses dépendances. Donc, avant d'utiliser Bow, il vous faut d'abord installer Composer sur votre machine.

### Via Composer create-project

```sh
$ composer create-project --prefer-dist bowphp/app mon-projet
```

> Nous vous conseillons d'installer `composer` de façon globale sur votre machine. Pour ce faire référez-vous à la [documentation](https://getcomposer.org/download) d'installation de composer.
> Si vous n'êtes pas familier à `composer`, nous vous invitons à parcourir la documentation.

<script id="asciicast-s8HpeoaUwnxEZ7OOPRxxXE52z" src="https://asciinema.org/a/s8HpeoaUwnxEZ7OOPRxxXE52z.js" data-speed="2"  data-rows="20" async></script>

## Démarrer votre projet

Rendez vous à la racine de votre projet et démarrez le serveur:

```sh
$ cd mon-projet
$ php bow run:server --port=8000 --host=0.0.0.0
```

Ouvrez votre navigateur et tapez `http://localhost:8000`.

> `5000` est le port par défaut quand le port n'est pas spécifié avec la commande `php bow run:server`.

## Configuration

### Dossier Public

Après l'installation de Bow, vous devez configurer le `document root` de votre serveur pour qu'il pointe vers le dossier `public`. Le fichier `index.php` qui se trouve dans le dossier public sert de point d'entrée pour toutes les requêtes HTTP (c'est le **front contrôleur**).

### Fichiers de configuration

Tous les fichiers de configurations de Bow Framework sont stockés dans le dossier `config`. Toutes les options sont documentées pour vous permettre de vous familiariser avec les options disponibles.

### Permissions sur les dossiers

Après l'installation de Bow, vous aurez besoin de configurer quelques permissions. Les dossiers contenu dans le dossier `storage` doivent avoir les permissions d'écriture sur le serveur web.

## Configuration Serveur Web

### Apache

Bow inclut un fichier `public/.htaccess` qui est utilisé pour faire de la ré-écriture d'URLs sur le front contrôleur. Avant d'utiliser Bow avec Apache, assurez-vous que le module `mod_rewrite` est activé pour que le serveur
prennent en compte les instructions du fichier `.htaccess`.

Si le fichier `.htaccess` par défaut dans Bow ne fonctionne pas avec votre installation d'Apache, essayez cette alternative:

```bash
Options +FollowSymLinks
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
```

### Nginx

Si vous utilisez Nginx, les directives suivantes dans votre configuration redirigerons les requêtes vers le front contrôleur:

```sh
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

<<<<<<< Updated upstream
> Vous pouvez continuez vers ces sections pour démarrer votre développement.

- [Contrôleur](./controllers.md)
- [Routing](./routing.md)
- [Session](./session.md)
- [Base de donnée](./database.md)
- [Storage](./storage.md)

=======
>>>>>>> Stashed changes
> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
