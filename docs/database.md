---
id: database
title: 🗂 Démarrage la base de donnée
---

- [Introduction](#introduction)
- [Configuration](#configuration)
- [SQLite Configuration](#sqlite-configuration)
- [Connexion à plusieur Base de donnée](#connexion-à-plusieur-base-de-donnée)
- [Utilisation de requête SQL Brute](#utilisation-de-requête-sql-brute)
  - [Execution de requête Select](#execution-de-requête-select)
  - [Sélection conditionnel](#sélection-conditionnel)
  - [Execution de requête Insert](#execution-de-requête-insert)
    - [Insertion multiple](#insertion-multiple)
  - [Execution de requête Update](#execution-de-requête-update)
  - [Execution de requête Delete](#execution-de-requête-delete)
  - [Execution de requête](#execution-de-requête)
- [Database Transactions](#database-transactions)
  - [Utilisation manuel des transaction](#utilisation-manuel-des-transaction)
- [Les jointures](#les-jointures)

## Introduction

Bow rend l'interaction avec les bases de données extrêmement simple sur deux backends de bases de données en utilisant le `SQL brut`, `le générateur de requêtes courant` et l'[ORM](./orm.md) Barry.

Actuellement, Bow prend en charge deux bases de données:

- MySQL
- SQLite

## Configuration

La configuration de la base donnée de votre application se localise dans le fihcier `config/database.php`. Dans ce fichier, vous pouvez définir tous les connections de votre base de donnée et un exemple en plus pour tous les supports de base de donnée est defini dans ce fichier.

## SQLite Configuration

Après avoir créé une nouvelle base de données SQLite à l'aide d'une commande tel que `touch var/database.sqlite`, vous pouvez facilement configurer vos variables d'environnement (dans le fichier `.env.json`) pour qu'elles pointent vers cette base de données nouvellement créée à l'aide du chemin absolu de la base de données:

```json
{
  "DB_DEFAULT": "mysql",
  "SQLITE_DATABASE": "/absolute/path/to/database.sqlite",
}
```

## Connexion à plusieur Base de donnée

Lorsque vous utilisez plusieurs connexions, vous pouvez accéder à chaque connexion via la méthode static de `connexion` sur la classe [Bow\Database\Database::class](https://bowphp.com/api/master/Bow/Database/Database.html). Le nom transmis à la méthode de connexion doit correspondre à l'une des points de connexions répertoriées dans votre fichier de configuration `config/database.php`:

```php
use Bow\Database\Database;

$users = Database::connection('mysql')->select(...);
```

Ou via le helper `db`:

```php
$users = db('mysql')->select(...);
```

Une fois la configuration changé, elle est directement appliquer sur la connexion des modèles. [Cliquer ici](./orm.md) pour plus d'information sur les models.

## Utilisation de requête SQL Brute

Les requête brute ici sont les requêtes SQL écrite littéralement sans passer par un Query Builder.
Dans cette section nous allons utiliser une table nommer `pets` pour effectuer nos requête avec.

Voici la description de la table `pets`:

```sql
CREATE TABLE `pets` (
  id int primary key,
  name varchar(200),
  color varchar(50)
);
```

Alors notre table à comme colonne:

| Nom de la colonne | Description |
| ----------------- | ----------- |
| `id` | Ici la clé primaire |
| `name` | Le nom du pet |
| `color` | La couleur du pet |

> Pour information, un `pet` c'est un animal domestique

### Execution de requête Select

Pour executer une requête brute de type `SELECT` nous devrez utiliser la méthode `Database::select` ou le helper `select`. On considère notre table `pets` et que nous sommes bien connectés à la base de donnée.

Execution d'un requête pour optenir tous les informations de la table `pets`:

```php
use Bow\Database\Database;

$pets = Database::select('select * from `pets`');
```

Via helper `db_select`:

```php
$pets = db_select('select * from `pets`');
```

### Sélection conditionnel

Execution d'un requête pour optenir tous les informations de la table `pets` quand `id` égale à 1:

```php
use Bow\Database\Database;

$pet = Database::select('select * from `pets` where id = :id', ['id' => 1]);
```

Via helper `db_select`:

```php
$pet = db_select('select * from `pets` where id = :id', ['id' => 1]);
```

Notez que la valeur retournée par la méthode `db_select` est un `array` ou `null` s'il y a aucune informations.
Dans le cas ou c'est un `array` le contenu est de type `stClass` (plus d'information sur [stClass](http://php.net/manual/fr/language.types.object.php)).

### Execution de requête Insert

Pour executer une requête brute de type `INSERT` nous devrez utiliser la méthode `Database::insert` ou le helper `insert`. On considère toujour notre table `pets` et que nous sommes bien connectés à la base de donnée.

Execution d'un requête pour inserer une information dans table `pets`:

```php
use Bow\Database\Database;

$pet = [
  'id' => 1,
  'name' => 'Medor',
  'color' => 'Green'
];

$inserted = Database::insert('insert into `pets` (id, name, color) values (:id, :name, :color);', $pet);
```

Via helper `db_insert`:

```php
$pet = [
  'id' => 2,
  'name' => 'Mashmalo',
  'color' => 'White'
];

$inserted = db_insert('insert into `pets` (id, name, color) values (:id, :name, :color);', $pet);
```

Notez que la valeur retournée par la méthode `insert` est un `int` ou `number` qui est le nombre d'insertion.

#### Insertion multiple

Vous avez aussi la possibilité d'inserer plusieurs enregistrements en même temps.

```php
use Bow\Database\Database;

// Liste de pets
$pets = [
  [
    'id' => 1,
    'name' => 'Medor',
    'color' => 'Black'
  ],
  [
    'id' => 2,
    'name' => 'Milou',
    'color' => 'Gay'
  ]
];

$inserted = Database::insert(
  'insert into `pets` (id, name, color) values (:id, :name, :color);',
  $pets
);
```

Via helper `db_insert`:

```php
$updated = db_insert(
  'insert into `pets` (id, name, color) values (:id, :name, :color);',
  $pets
);
```

### Execution de requête Update

Pour executer une requête brute de type `UPDATE` nous devrez utiliser la méthode `Database::update` ou le helper `db_update`. On considère toujour notre table `pets` et que nous sommes bien connectés à la base de donnée.

Execution d'un requête de mettre à jour d'information dans table `pets`:

```php
use Bow\Database\Database;

$pet = [
  'id' => 1,
  'name' => 'Medora',
  'color' => 'Purple'
];

$updated = Database::update(
  'update `pets` set id = :id, name = :name, color = :color where id = :id',
  $pet
);
```

Via le helper `db_update`:

```php
$pet = [
  'id' => 2,
  'name' => 'Spark',
  'color' => 'Yellow'
];

$updated = db_update(
  'update `pets` set id = :id, name = :name, color = :color where id = :id',
  $pet
);
```

### Execution de requête Delete

Pour executer une requête brute de type `DELETE` nous devrez utiliser la méthode `Database::delete` ou le helper `db_delete`. On considère toujour notre table `pets` et que nous sommes bien connectés à la base de donnée.

Execution d'un requête pour inserer une information dans table `pets`:

```php
use Bow\Database\Database;

$deleted = Database::delete(
  'delete from `pets` where id = :id',
  ['id' => 1]
);
```

Via le helper `db_delete`:

```php
$deleted = db_delete(
  'delete from `pets` where id = :id',
  ['id' => 2]
);
```

### Execution de requête

Pour exécuter une requête brute autre que `SELECT`, `UPDATE`, `INSERT`, `DELETE`. Il y a une méthode faite pour `Database::statement` ou le helper `db_statement`.

```php
use Bow\Database\Database;

Database::statement('alter table `pets` add `owner` varchar(80) default null;');
```

Via le helper `db_statement`:

```php
db_statement('alter table `pets` add `owner` varchar(80) default null;');
```

## Database Transactions

Vous pouvez utiliser la méthode de `startTransaction` sur la classe `Database` pour exécuter un ensemble d'opérations dans une transaction de base de données.

Si vous passez une `Closure` et qu'une exception est levée dans la fonction de rappel de la transaction, la transaction sera automatiquement annulée. Si la `Closure` s'exécute correctement, la transaction sera automatiquement validée. Vous n'avez pas à vous soucier de l'annulation manuelle ou de la validation lorsque vous utilisez la méthode de transaction:

```php
use Bow\Database\Database;

Database::startTransaction(function () {
  Database::update('update users set votes = :votes', ['votes' => 1]);

  Database::delete('delete from posts');
});
```

Via le helper `db_transaction`:

```php
db_transaction(function () {
  update('update users set votes = :votes', ['votes' => 1]);

  delete('delete from posts');
});
```

### Utilisation manuel des transaction

Vous pouvez aussi utiliser manuelement le système de transaction.
Pour démarrer la transaction avec la méthode:

```php
use Bow\Database\Database;

Database::startTransaction();
// Ou
db_transaction();
```

Vous pouvez annuler la transaction avec la méthode:

```php
use Bow\Database\Database;

Database::rollback();
// Ou
db_rollback();
```

Vous pouvez valider la transaction avec la méthode:

```php
use Bow\Database\Database;

Database::commit();
// Ou
db_commit();
```

Avec la méthode `inTransaction` vous pouvez vérifier si la base de donnée est en transaction:

```php
use Bow\Database\Database;

Database::inTransaction();
// Ou
db_transaction_started();
```

## Les jointures

Considérons les tables suivantes:

```sql
create table `author` (
  `id` int primary key,
  `name` varchar(200)
);

create table `pets` (
  `id` int primary key,
  `name` varchar(200),
  `color` varchar(50),
  `author_id` int default 0
);
```

Pour faire une jointure dans Bow Framework c'est très simple en fait. Pour ce faire on utilise la méthode `join`.

```php
$results = table('pets')->join('autors', 'authors.id', 'pets.author_id')->get();
```

Souvant il est intéressant d'ajouter des contraintes dans la réquête normalement avec la clause `WHERE`.

```php
$results = table('pets')
  ->join('authors', 'authors.id', 'pets.author_id')
  ->whereColumn('pets.author_id', 1)->get();
```

Normalement vous pouvez ajouter plusieur jointure dans l'appel de méthode.
Pour l'exemple disons qu'il y a une autre table nommé `countries` qui est le pays du propriétaire et que la table `authors` est maintenant:

```sql
create table `author` (
  `id` int primary key,
  `name` varchar(200),
  `country_id` int
);
```

Notre requête sera maintenant:

```php
$results = table('authors')
  ->join('authors', 'authors.id', 'pets.author_id')
  ->join('countries', 'countries.id', 'pets.country_id')
  ->whereColumn('pets.author_id', 1)->get();
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
