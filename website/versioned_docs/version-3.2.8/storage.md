---
id: version-3.2.8-storage
title: Storage
original_id: storage
---

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Fonctionnement](#fonctionnement)
- [Manipulation des fichiers](#manipulation-des-fichiers)
  - [Récupérer le contenu d'un fichier](#recuperer-le-contenu-d-un-fichier)
  - [Ajouter/Modifier le contenu d'un fichier](#ajouter-modifier-le-contenu-d-un-fichier)
  - [Ajouter du contenu au début ou à la fin d'un fichier](#ajouter-du-contenu-au-debut-ou-a-la-fin-d-un-fichier)
  - [Supprimer un fichier](#supprimer-un-fichier)
  - [Copier un fichier](#copier-un-fichier)
  - [Créer un dossier](#creer-un-dossier)
  - [Vérifier si un fichier existe](#verifier-si-un-fichier-existe)
  - [Vérifier si le paramêtre est un fichier](#verifier-si-le-parametre-est-un-fichier)
  - [Vérifier si le paramêtre est un dossier](#verifier-si-le-parametre-est-un-dossier)
  - [Obtenir le chemin absolu d'un fichier ou dossier](#obtenir-le-chemin-absolu-d-un-fichier-ou-dossier)

## Introduction

Bow intègre un système de gestion de fichier permettant de manipuler des fichiers avec une grande simplicité.

## Configuration

Le fichier de configuration du système de gestion de fichiers se trouve dans `config/resource.php`.

## Fonctionnement

Nous appelerons les différents dossiers spécifiés `disque`.
Considérons la configuration suivante:

```php
'disk' =>[
  'mount' => 'storage',
  'path' => [
    'storage' => __DIR__.'/../storage/app',
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
echo $content;
// => Hello, world
```

### Ajouter/Modifier le contenu d'un fichier

La méthode `put` permet d'ajouter/modifier le contenu d'un fichier:

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

| paramêtre | Type |
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

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
