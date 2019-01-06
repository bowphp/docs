---
id: version-3.2.5-database
title: Démarrage
original_id: database
---

- [Introduction](#introduction)
  - [Configuration](#configuration)
  - [SQLite Configuration](#sqlite-configuration)
  - [Connexion à plusieur Base de donnée](#connexion-multiple)
- [requête SQL Brute](#introduction)
  - [Execution de requête Select](#execution-de-requete-select)
  - [Execution de requête Insert](#execution-de-requete-insert)
  - [Execution de requête Update](#execution-de-requete-update)
  - [Execution de requête Delete](#execution-de-requete-delete)
- [Migration](#migration)
  - [Ajouter une migration](#ajouter-une-migration)

## Introduction

Bow rend l'interaction avec les bases de données extrêmement simple sur deux backends de bases de données en utilisant le `SQL brut`, `le générateur de requêtes courant` et l'ORM Barry.

Actuellement, Bow prend en charge deux bases de données:

- MySQL
- SQLite

### Configuration

La configuration de la base donnée de votre application se localise dans le fihcier `config/db.php`. Dans ce fichier, vous pouvez définir tous les connections de votre base de donnée et un exemple en plus pour tous les supports de base de donnée est defini dans ce fichier.

### SQLite Configuration

Après avoir créé une nouvelle base de données SQLite à l'aide d'une commande tel que `touch storage/database.sqlite`, vous pouvez facilement configurer vos variables d'environnement (dans le fichier `.env.json`) pour qu'elles pointent vers cette base de données nouvellement créée à l'aide du chemin absolu de la base de données:

```text
"DB_DEFAULT": "seconds",
...
"SQLITE_DATABASE": "/absolute/path/to/database.sqlite",
```

### Connexion à plusieur Base de donnée

Lorsque vous utilisez plusieurs connexions, vous pouvez accéder à chaque connexion via la méthode static de `connexion` sur la classe [`Bow\Database\Database`](https://bowphp.github.io/api/master/Bow/Database/Database.html). Le nom transmis à la méthode de connexion doit correspondre à l'une des points de connexions répertoriées dans votre fichier de configuration `config/db.php`:

```php
use Bow\Database\Database;

$users = Database::connection('seconds')->select(...);
```

Ou via le helper `db`:

```php
$users = db('seconds')->select(...);
```

Une fois la configuration changé, elle est directement appliquer sur la connexion des modèles. [Cliquer ici](./orm) pour plus d'information sur les models.

## requête SQL Brute

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

#### Sélection conditionnel

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

Database::inTransaction()
// Ou
db_transaction_started()
```

## Query Builder (Contructeur de sql à la volée)

Bow fourni un api lié à la construction de requête. Avec la méthode `table` permet de construire une requête `sql` en se basant sur la nom de la table et retour une instance de [`Bow\Database\QueryBuilder::class`](https://bowphp.github.io/api/master/Bow/Database/QueryBuilder.html).

```php
use Bow\Database\Database;

$builder = Database::table('users');
// => Instance \Bow\Database\QueryBuilder::class
```

Vous pouvez aussi utiliser le helper `table`:

```php
$builder = table('users');
```

Sur l'instance de la `QueryBuilder` de Bow, il y a plusieurs méthodes qui vont vous permettre de construire une requête SQL.
Par exemple la methode `toSql` qui permet d'affichez la requête construite.

```php
$builder->toSql();
// select * from `users`
```

### Recupéré les informations

Pour recupérer les informations avec le builder, vous devez utiliser le méthode `get` qui retourne une collection, `first` qui lui retourne `null` ou un objet `stdclass` et `last` qui se comporte comme `first` sauf qu'il retourne plutôt le dernier élément du résultat de l'exécution de la requête.

#### Exemple avec `get`:

```php
$builder = Database::table('users');

$users = $builder->get();

foreach ($users as $user) {
  echo $user->name;
}
```

> Notez que vous pouvez passer un tableau à `get` qui est une liste des colonnes de la projection comme ceci `$builder->get(['name'])`.

#### Exemple avec `first`

```php
$user = table('users')->first();

// Vide
is_null($user)
// Ok
echo $user->name;
```

#### Exemple avec `last`

```php
$user = $builder->last();
```

### Ajoutez des restrictions

#### Restriction simple

Avec le builder, vous pouvez ajouter des restrictions simple sur la construction de la requête SQL avec la méthode `where`.

```php
$users = table('users')->where('id', 1)->get();

$users = table('users')->where('id', '!=', 1)->get();
```

#### La clause OR

Vous pouvez enchainer la restriction en ajoutant un `or` dans votre requête. La méthode `orWhere` vous permet de faire cela:

```php
$users = table('users')->where('id', 1)->orWhere('name', 'Papac')->get();
```

Vous pouvez voir le resultat de la construction de la requête avec la méthode `toSql`.

```php
$sql = table('users')->where('id', 1)->orWhere('id', 1)->toSql();
// => select * from `users` where id = 1 or id = 3;
```

### Clauses additionnelles

#### whereNull / whereNotNull

La méthode `whereNull` vérifie que la valeur de la colonne donnée est `NULL`:

```php
$users = table('users')->whereNull('name')->get();
```

La méthode `whereNotNull` vérifie que la valeur de la colonne n'est pas `NULL`:

```php
$users = table('users')->whereNotNull('age')->get();
```

#### whereIn / whereNotIn

La méthode `whereIn` vérifie que la valeur d'une colonne donnée est contenue dans le tableau donné:

```php
$users = table('users')->whereIn('age', [27, 30])->get();
```

La méthode `whereNotIn` vérifie que la valeur de la colonne donnée n'est pas contenue dans le tableau donné:

```php
$users = table('users')->whereNotIn('age', [27, 30])->get();
```

#### whereBetween / whereNotBetween

La méthode `whereBetween` vérifie que la valeur d'une colonne est comprise entre deux valeurs:

```php
$users = table('users')->whereBetween('votes', [1, 100])->get();
```

La méthode `whereNotBetween` vérifie que la valeur d'une colonne se situe en dehors de deux valeurs:

```php
$users = table('users')->whereNotBetween('votes', [1, 100])->get();
```

### Ordonner, Grouper, et limiter

#### orderBy

La méthode `orderBy` vous permet de trier le résultat de la requête en fonction d'une colonne donnée. Le premier argument de la méthode `orderBy` devrait être la colonne que vous souhaitez trier, tandis que le second argument contrôle le sens du tri et peut être `asc` ou `desc`:

```php
$users = table('users')->orderBy('name', 'desc')->get();
```

#### groupBy et having

Les méthodes `groupBy` et `having` peuvent être utilisées pour regrouper les résultats de la requête. La signature de la méthode `having` est similaire à celle de la méthode `where`:

```php
$users = table('orders')
  ->groupBy('price')
  ->having('price', '>', 100)
  ->get();
```

#### jump et take

Pour limiter le nombre de résultats renvoyés par la requête ou pour ignorer un nombre donné de résultats dans la requête, vous pouvez utiliser les méthodes `jump` (pour ignorer) et `take` (pour renvoyer un nombre):

```php
$users = DB::table('users')->jump(10)->take(5)->get();
```

### Aggregates

Le générateur de requêtes fournit également une variété de méthodes d'agrégation telles que `count`, `max`, `min`, `avg` et `sum`. Vous pouvez appeler n'importe laquelle de ces méthodes après avoir construit votre requête.

```php
$users = table('users')->count();

$price = table('orders')->max('price');

$avg = table('orders')->avg('price');
```

#### Déterminer si des enregistrements existent

Au lieu d'utiliser la méthode `count` pour déterminer s'il existe des enregistrements correspondant aux contraintes de votre requête, vous pouvez utiliser la méthode `exists`:

```php
$exists = table('users')->where('id', 1)->exists();
```

### Spécification d'une clause de sélection

Bien entendu, il se peut que vous ne souhaitiez pas toujours sélectionner toutes les colonnes d'une table de base de données. À l'aide de la méthode `select`, vous pouvez spécifier une clause select personnalisée pour la requête:

```php
$price = table('orders')->select('price')->get();
// Ou séléctionnez plusieurs colonne
$price = table('orders')->select(['id', 'price'])->get();
```

### Insertion d'information

Le générateur de requêtes fournit également une méthode `insert` pour insérer des enregistrements dans la table de base de données. La méthode insert accepte un tableau de noms de colonnes et de valeurs:

```php
table('users')->insert(
  ['email' => 'exemple@gmail.com', 'age' => 27]
);
```

Vous pouvez même insérer plusieurs enregistrements dans la table avec un seul appel à insérer en transmettant un tableau de tableaux. Chaque tableau représente une ligne à insérer dans la table:

### Mise à jour

Bien entendu, en plus d'insérer des enregistrements dans la base de données, le générateur de requêtes peut également mettre à jour des enregistrements existants à l'aide de la méthode `update`. La méthode update, comme la méthode `insert`, accepte un tableau de paires de colonnes et de valeurs contenant les colonnes à mettre à jour. Vous pouvez contraindre la requête de mise à jour à l'aide de clauses `where`:

```php
table('users')->where('id', 1)->update(
  ['email' => 'exemple@gmail.com', 'age' => 27]
);
```

### Supprimer un enregistrement

Le générateur de requêtes peut également être utilisé pour supprimer des enregistrements de la table via la méthode `delete`. Vous pouvez contraindre des instructions delete en ajoutant des clauses where avant d'appeler la méthode `delete`:

```php
table('users')->delete();

table('users')->where('age', '>', 27)->delete();
```

Si vous souhaitez vider la table entière, ce qui supprimera toutes les lignes et réinitialisera l'ID d'auto-incrémentation à zéro, vous pouvez utiliser la méthode `truncate`:

```php
table('pets')->truncate();
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
