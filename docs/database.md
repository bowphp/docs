---
id: database
title: Démarrage
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

La configuration de la base donnée de votre application se localise dans le fihcier `config/db.php`. Dans ce fichier, vous pouvez définir tous les connections de votre base de donnée et un exemple en plus pour tous les supports de base de donnée est defini dans ce fichier.

## SQLite Configuration

Après avoir créé une nouvelle base de données SQLite à l'aide d'une commande tel que `touch var/database.sqlite`, vous pouvez facilement configurer vos variables d'environnement (dans le fichier `.env.json`) pour qu'elles pointent vers cette base de données nouvellement créée à l'aide du chemin absolu de la base de données:

```json
{
  "DB_DEFAULT": "mysql",
  "SQLITE_DATABASE": "/absolute/path/to/database.sqlite",
}
```

## Connexion à plusieur Base de donnée

Lorsque vous utilisez plusieurs connexions, vous pouvez accéder à chaque connexion via la méthode static de `connexion` sur la classe [`Bow\Database\Database`](https://bowphp.com/api/master/Bow/Database/Database.html). Le nom transmis à la méthode de connexion doit correspondre à l'une des points de connexions répertoriées dans votre fichier de configuration `config/db.php`:

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

Via helper `select`:

```php
$pets = select('select * from `pets`');
```

### Sélection conditionnel

Execution d'un requête pour optenir tous les informations de la table `pets` quand `id` égale à 1:

```php
use Bow\Database\Database;

$pet = Database::select('select * from `pets` where id = :id', ['id' => 1]);
```

Via helper `select`:

```php
$pet = select('select * from `pets` where id = :id', ['id' => 1]);
```

Notez que la valeur retournée par la méthode `select` est un `array` ou `null` s'il y a aucune informations.
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

Via helper `insert`:

```php
$pet = [
  'id' => 2,
  'name' => 'Mashmalo',
  'color' => 'White'
];

$inserted = insert('insert into `pets` (id, name, color) values (:id, :name, :color);', $pet);
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

Via helper `insert`:

```php
$updated = insert(
  'insert into `pets` (id, name, color) values (:id, :name, :color);',
  $pets
);
```

### Execution de requête Update

Pour executer une requête brute de type `UPDATE` nous devrez utiliser la méthode `Database::update` ou le helper `update`. On considère toujour notre table `pets` et que nous sommes bien connectés à la base de donnée.

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

Via le helper `update`:

```php
$pet = [
  'id' => 2,
  'name' => 'Spark',
  'color' => 'Yellow'
];

$updated = update(
  'update `pets` set id = :id, name = :name, color = :color where id = :id',
  $pet
);
```

### Execution de requête Delete

Pour executer une requête brute de type `DELETE` nous devrez utiliser la méthode `Database::delete` ou le helper `delete`. On considère toujour notre table `pets` et que nous sommes bien connectés à la base de donnée.

Execution d'un requête pour inserer une information dans table `pets`:

```php
use Bow\Database\Database;

$deleted = Database::delete(
  'delete from `pets` where id = :id',
  ['id' => 1]
);
```

Via le helper `delete`:

```php
$deleted = delete(
  'delete from `pets` where id = :id',
  ['id' => 2]
);
```

### Execution de requête

Pour exécuter une requête brute autre que `SELECT`, `UPDATE`, `INSERT`, `DELETE`. Il y a une méthode faite pour `Database::statement` ou le helper `statement`.

```php
use Bow\Database\Database;

Database::statement('alter table `pets` add `owner` varchar(80) default null;');
```

Via le helper `statement`:

```php
statement('alter table `pets` add `owner` varchar(80) default null;');
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

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
