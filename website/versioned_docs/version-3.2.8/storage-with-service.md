---
id: version-3.2.8-storage
title: Storage
original_id: storage
---

## Introduction

Bow intègre un système de gestion de fichier permettant de manipuler les fichiers avec une grande simplicité et supportes plusieurs pilotes:

- Disque local

## Configuration

Le fichier de configuration du système de fichiers se trouve dans `config/resource.php`. Dans ce fichier, vous pouvez configurer tous vos "disques". Chaque disque représente un emplacement de stockage particuliers.

Des exemples de configuration pour chaque pilote pris en charge sont inclus dans le fichier de configuration. Alors, modifiez la configuration pour refléter vos préférences de stockage et vos informations d'identification.

// Supprimer le mot local puisqu'il referencie seulement mount
Bien entendu, vous pouvez configurer autant de disques locale* locaux que vous le souhaitez.

## Fonctionnement

Vous avez la possibilité d'utiliser les services ou travailler dans votre disque. Les méthodes statiques `mount` et `service` permettent reciproquement de manipuler le système de disque et les services de stockage.

### La méthode des disques

La manipulation de système de disque c'est très simple, déjà considérons la configuration suivante:

```php
'disk' =>[
  'mount' => 'storage',
  'path' => [
    'storage' => __DIR__.'/../storage/app',
    'public' => __DIR__.'/../public',
  ]
];
```

La valeur passée à `mount` doit être spécifiée dans la liste des `path` dans le fichier de configuration. Une fois chargé, toutes les manipulations seront effectuées depuis le dossier selectionné.

```php
use Bow\Storage\Storage;

Storage::mount("public");
// Ou
Storage::mount();
```

> Si la méthode `mount` est appelé sans paramêtre, il utilisera par défaut la valeur de la clé `mount`.

Vous pouvez aussi utiliser le helper `mount()`:

```php
mount('public');
// Ou
mount()->get('app.js');
```

### La méthode des services

Pour utiliser un système de stockage externe via la méthode `service`. Cette méthode, vous permet de séléctionner le type de stockage externe que vous voulez utiliser. Vous trouverez la configuration nécessaire des services dans le fichier de configuration section `services`.

Exemple avec le service `s3`:

```php
$s3 = Storage::service('s3');
$s3->get('app.js');
```

## Manipulation des fichiers

Cette section decrit les differentes méthodes disponible pour la manipulation des fichiers et comment les utiliser. Notez que ces méthodes sont valables pour les deux types de système.

On suppose que nous avons le fichier `app.txt` dans le disque `public`:

```plain
// fichier app.txt
Hello, world
```

### Récupérer le fichier

Pour récupérer un fichier de votre système de stockage vous allez utiliser la méthode `get` qui retourne le contenu du fichier.

```php
$mount = mount('public');
$content = $mount->get("app.txt");
echo $content;
// => Hello, world
```

### Sauvegarder un fichier

Pour sauvegarder un fichier, rien de plus simple. Il vous suffit d'utiliser la méthode `put` qui retourne `false` si l'action à échouer:

```php
$mount = mount('public');
$content = 'console.log("Hello, world")';
$mount->put('app.js', $content );
```

### Supprimer un fichier

Pour supprimer un fichier, c'est aussi très simple. Il vous suffit d'utiliser la méthode `delete` qui retourne `false` si l'action à échouer et `true` en cas de réussite:

```php
$mount = mount('public');
$has_succeeded = $mount->delete('app.js');

if ($has_succeeded) {
  // action à accomplir en cas de succès
}
```

### Ajout du contenu avant ou après un fichier

Les méthodes `preprend` et `append` vous permettent d'ajouter respectivement un contenu au debut ou la fin d'un fichier:

```php
$mount = mount('public');

$mount->prepend('app.txt', 'Contenu ajouté avant');
$mount->append('app.txt', 'Contenu ajouté après');
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

### Vérifie si le paramêtre est un un fichier

```php
$mount = mount('public');

if ($mount->isFile('app.txt')) {
  echo "Cest un fichier";
}
```

33

### Vérifie si le paramêtre est un dossier

```php
$mount = mount('public');

if ($mount->isDirectory('nom_du_dossier')) {
  echo "C'est un dossier";
}
```

### Retourne le chemin absolute du fichier

```php
$mount = mount('public');

$path = $mount->resolvePath('app.txt');

echo $path;
// => /chemin/absolue/vers/le/fichier/app.txt
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.