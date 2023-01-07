---
id: seeding
title: "💉 Seeding"
---

- [Introduction](#introduction)
- [Ajouter un seeder](#ajouter-un-seeder)
- [Lancer le seeding](#lancer-le-seeding)
- [Helper](#helper)

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
    'name' => $faker->name,
    'created_at' => date('Y-m-d H:i:s'),
    'updated_at' => date('Y-m-d H:i:s'),
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

## Helper

Souvent vous sera tente de faire des seedins lorsque vous testez votre application. Le helper `db_seed`, très pratique vous permettra de faire des seeding en plein test par exemlpe

```php
db_seed("user", $overrides = ["name" => "Franck"]);
```

Avec `$overrides` vous pouvez modifier des valeurs du seeding.

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
