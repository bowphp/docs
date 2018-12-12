---
id: seeding
title: Seeding
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

Un fichier `pets_seeder.php` sera créé dans le dossier `db/seeders`. En voici le contenu:

```php
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

Vous avez la possibilité de lancer tout les seeding avec la commande `seed:all`. Cela fera le seeding de tout les fichiers dans `db/seeders`.

```bash
php bow seed:all
```

## Le helper `faker`

Vous avez surement remarquez le helper `faker`. Voici la liste de paramètre du helper.

| Clé | Type de Retour | Paramètre additionnel |
|-----|------|-----|
| `name` | `String` | `array` $additionnal_names, `bool` $random  |
| `tags` | `String` | `int` $by = 2 |
| `autoincrement` | `String` | `string` $type = 'integer', `int` $start = 0 |
| `unique` | `String` | `string` $type = 'integer' |
| `email` | `String` | `array` $additionnal_emails = [], `bool` $random = false |
| `timestamps` | `String` | N/A |
| `float` | `String` | `bool` $negation = false  |
| `date` | `String` | `int` $time = null |
| `string` | `String` | `int` $size = 255, `int` $multi = 1 |
| `number` | `String` | `int` $end = 100 |
| `password` | `String` | N/A |
| `pseudo` | `String` | `array` $additionnal = [] |

Pour utiliser les paramètres du `faker`.

#### name

```php
faker('name', ['Franck', 'Abou'], true)
```

#### tags

```php
faker('tags', 5) // 5 est le nom de tag généré
```

#### autoincrement

```php
faker('autoincrement', 'integer', 10)
```

#### email

```php
faker('email', ['luc@gmail.com'], false)
```

#### date

```php
faker('date', time()) // Ici time est optionnel
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
