---
id: version-4.1.x-seeding
title: Seeding
original_id: seeding
---

- [Introduction](#introduction)
- [Ajouter un seeder](#ajouter-un-seeder)
- [Lancer le seeding](#lancer-le-seeding)

## Introduction

Le seeding est un mécanisme qui vous permettra d'hydrater votre base de donnée pour pouvoir l'utiliser dans votre développement. Le seeding dans Bow est associer à une table lors de la création.

## Ajouter un seeder

Pour ajouter un seeder on passe par `php bow` avec la commande `add:seeder` ensuite le nom de la table.

```bash
php bow add:seeder pets
```

Un fichier `pets_seeder.php` sera créé dans le dossier `seeders`. En voici le contenu:

```php
/**
 * The pets seeder
 *
 * @see https://github.com/fzaninotto/Faker for all documentation
 */
$faker = \Faker\Factory::create();

$seeds['pets'] = [];

foreach (range(1, 5) as $key) {
  $seeds['pets'][] = [
    'id' => faker('autoincrement'),
    'created_at' => faker('date'),
    'updated_at' => faker('date')
  ];
}

return $seeds;
```

> La clé `pets` est le nom de la table du seeding.

## Lancer le seeding

Pour lancer le seeding on utilise la commande `seed:table` suivi du nom de la table.

```bash
php bow seed:table pets
```

Vous avez la possibilité de lancer tout les seeding avec la commande `seed:all`. Cela fera le seeding de tout les fichiers dans `seeders`.

```bash
php bow seed:all
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
