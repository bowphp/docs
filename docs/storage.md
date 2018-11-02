---
id: storage
title: Storage
---

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

> Si la méthode `mount` est appelé sans paramêtre, il utilisera par défaut la valeur de la clé `mount`.

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

> Notez que ces methodes (sauf la methode `get`) retournent respectivement `true` ou `false` en cas de succès ou d'échec

### Récupérer le contenu d'un fichier

La methode `get` sert à recupérer le contenu d'un fichier. Elle prend comme paramètre le nom du fichier.

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

Les methodes `preprend` et `append` vous permettent d'ajouter respectivement du contenu au debut ou la fin d'un fichier:

```php
$mount = mount('public');
$mount->prepend('app.txt', 'Contenu ajouté au début');
$mount->append('app.txt', 'Contenu ajouté à la fin');
```

### Supprimer un fichier

La methode `delete` permet de supprimer un fichier.

```php
$mount = mount('public');
$mount->delete('app.js');
```

### Créer un dossier

Vous pouvez créer un nouveau dossier à l'aide de la méthode `makeDirectory`:

#### Prototype

```php
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

// Changer la permission du dossier
> Notez vous pouvez changer le mode du fichier et aussi effectuer une creation récursive

```php
$mount->makeDirectory('chemin/vers/un/dossier', 777, true);
```

### Copiez un fichier

```php
$mount->copy('app.txt', 'sous-dossier/app.txt');
```

### Vérifier si un fichier existe

```php
$mount = mount('public');

if ($mount->exists('app.txt')) {
  echo $mount->get('app.txt');
}
```

### Vérifier si le paramêtre est un un fichier

```php
$mount = mount('public');

if ($mount->isFile('app.txt')) {
  echo "C'est un fichier";
}
```

33

### Vérifier si le paramêtre est un dossier

```php
$mount = mount('public');

if ($mount->isDirectory('nom_du_dossier')) {
  echo "C'est un dossier";
}
```

### Obtenir le chemin absolute du fichier ou dossier

```php
$mount = mount('public');

$path = $mount->resolvePath('app.txt');

echo $path;
// => /chemin/absolue/vers/le/fichier/app.txt
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.