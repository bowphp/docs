---
id: storage
title: 💿 Stockage de fichier
---

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Fonctionnement](#fonctionnement)
  - [Système de fichier local](#système-de-fichier-local)
    - [Explication du concept](#explication-du-concept)
  - [Les services S3 et FTP](#les-services-s3-et-ftp)
- [Manipulation des fichiers](#manipulation-des-fichiers)
  - [Récupérer le contenu d'un fichier](#récupérer-le-contenu-dun-fichier)
  - [Ajouter/Modifier le contenu d'un fichier](#ajoutermodifier-le-contenu-dun-fichier)
  - [Ajouter du contenu au début ou à la fin d'un fichier](#ajouter-du-contenu-au-début-ou-à-la-fin-dun-fichier)
  - [Supprimer un fichier](#supprimer-un-fichier)
  - [Copier un fichier](#copier-un-fichier)
  - [Créer un dossier](#créer-un-dossier)
    - [Prototype](#prototype)
  - [Vérifier si un fichier existe](#vérifier-si-un-fichier-existe)
  - [Vérifier si le paramêtre est un fichier](#vérifier-si-le-paramêtre-est-un-fichier)
  - [Vérifier si le paramêtre est un dossier](#vérifier-si-le-paramêtre-est-un-dossier)
  - [Obtenir le chemin absolu d'un fichier ou dossier](#obtenir-le-chemin-absolu-dun-fichier-ou-dossier)

## Introduction

Bow Framework intègre un système de gestion de fichier permettant de manipuler des fichiers avec une grande simplicité.

## Configuration

Le fichier de configuration du système de gestion de fichiers se trouve dans `config/resource.php`.

## Fonctionnement

Vous avez la possibilité d'utiliser les services ou travailler dans votre disque local. Les méthodes statiques `mount` et `service` permettent reciproquement de manipuler le système de disque et les services de stockage actuellement `ftp` et `s3`.

### Système de fichier local

Pour gérer votre système de fichier local avec Bow Framework vous allez utiliser la méthode statique `mount`.

#### Explication du concept

Nous appelerons les différents dossiers spécifiés `disk`.

Considérons la configuration suivante:

```php
'disk' =>[
  'mount' => 'storage',
  'path' => [
    'storage' => __DIR__.'/../var/app',
    'public' => __DIR__.'/../public',
  ]
];
```

> Vous pouvez spécifier autant de disques que vous voulez.

La classe `Storage` expose la méthode statique `mount` qui permet la manipulation de fichiers. La valeur passée à `mount` doit être un nom de disque valide spécifié dans la liste des `path`.

```php
use Bow\Storage\Storage;

Storage::mount("public");
// Ou
Storage::mount();
```

> Si la méthode `mount` est appelé sans paramêtre, elle utilisera par défaut la valeur de la clé `mount`.

Vous pouvez aussi utiliser le helper `mount()` qui fonctionne exactement de la même manière:

```php
mount('public');
// Ou
mount()->get('app.js');
```

### Les services S3 et FTP

Pour utiliser un système de stockage externe. Cela se fait via la méthode `service`. Cette méthode, vous permet de séléctionner le type de stockage externe que vous voulez utiliser. Vous trouverez la configuration nécessaire des services dans le fichier de configuration section `services` du fichier `config/resource.php`.

Exemple avec le service `ftp`:

```php
$service = Storage::service('ftp');
$service->get('app.js');
```

## Manipulation des fichiers

Cette section décrit les différentes méthodes disponible pour la manipulation de fichiers et leur utilisation.

Supposons que nous avons le fichier `app.txt` dans le disque `public`:

```plain
// contenu du fichier app.txt
Hello, world
```

> Notez que ces méthodes (sauf la méthode `get`) retournent respectivement `true` ou `false` en cas de succès ou d'échec

### Récupérer le contenu d'un fichier

La méthode `get` sert à recupérer le contenu d'un fichier. Elle prend comme paramètre le nom du fichier.

```php
$mount = mount('public');
$content = $mount->get("app.txt");

// Avec un service
$service = Storage::service('ftp');
$content = $service->get("app.txt");

echo $content;
// => Hello, world
```

> `service` et `mount` utilise la même interface de manipulation. Ce qui veux dire que les méthodes disponibles pour `mount` existe aussi pour `service`.

### Ajouter/Modifier le contenu d'un fichier

La méthode `put` permet d'ajouter ou de modifier le contenu d'un fichier:

```php
$mount = mount('public');
$content = 'console.log("Hello, world")';

$mount->put('app.js', $content );
```

### Ajouter du contenu au début ou à la fin d'un fichier

Les méthodes `preprend` et `append` vous permettent d'ajouter respectivement du contenu au debut ou la fin d'un fichier:

```php
$mount = mount('public');

$mount->prepend('app.txt', 'Contenu ajouté au début');
$mount->append('app.txt', 'Contenu ajouté à la fin');
```

### Supprimer un fichier

La méthode `delete` permet de supprimer un fichier.

```php
$mount = mount('public');

$mount->delete('app.js');
```

### Copier un fichier

```php
$mount = mount('public');

$mount->copy('app.txt', 'sous-dossier/app.txt');
```

### Créer un dossier

Vous pouvez créer un nouveau dossier à l'aide de la méthode `makeDirectory`:

#### Prototype

```php
$mount = mount('public');

$mount->makeDirectory($dirname, $mode = 0777, $recursive = false);
```

| Paramètre | Type |
|----------|------|
| path | `String` - le dossier à créer |
| mode | `Int` - Le mode du dossier par défaut 777 |
| recursive | `Boolean` - Permet de créer récursivement |

```php
$mount = mount('public');

$mount->makeDirectory('dossier');
```

> Notez que vous pouvez changer le mode du dossier et choisir de le créer de manière récursif.

```php
$mount->makeDirectory('chemin/vers/un/dossier', 777, true);
```

### Vérifier si un fichier existe

```php
$mount = mount('public');

if ($mount->exists('app.txt')) {
  echo $mount->get('app.txt');
}
```

### Vérifier si le paramêtre est un fichier

```php
$mount = mount('public');

if ($mount->isFile('app.txt')) {
  echo "C'est un fichier";
}
```

### Vérifier si le paramêtre est un dossier

```php
$mount = mount('public');

if ($mount->isDirectory('nom_du_dossier')) {
  echo "C'est un dossier";
}
```

### Obtenir le chemin absolu d'un fichier ou dossier

```php
$mount = mount('public');

$path = $mount->path('app.txt');

echo $path;
// => /chemin/absolu/vers/le/fichier/app.txt
```

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
