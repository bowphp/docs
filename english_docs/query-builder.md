---
id: query-builder
title: 🏗 SQL Builder
---

- [Introduction](#introduction)
- [Recupéré les informations](#recupéré-les-informations)
  - [Exemple avec `get`](#exemple-avec-get)
  - [Exemple avec `first`](#exemple-avec-first)
  - [Exemple avec `last`](#exemple-avec-last)
  - [Ajoutez des restrictions](#ajoutez-des-restrictions)
    - [Restriction simple](#restriction-simple)
    - [La clause OR](#la-clause-or)
  - [Clauses additionnelles](#clauses-additionnelles)
    - [whereNull / whereNotNull](#wherenull--wherenotnull)
    - [whereIn / whereNotIn](#wherein--wherenotin)
    - [whereBetween / whereNotBetween](#wherebetween--wherenotbetween)
  - [Ordonner, Grouper, et limiter](#ordonner-grouper-et-limiter)
    - [orderBy](#orderby)
    - [groupBy et having](#groupby-et-having)
    - [jump et take](#jump-et-take)
- [Aggregates](#aggregates)
  - [Déterminer si des enregistrements existent](#déterminer-si-des-enregistrements-existent)
  - [Spécification d'une clause de sélection](#spécification-dune-clause-de-sélection)
  - [Insertion d'information](#insertion-dinformation)
  - [Mise à jour](#mise-à-jour)
  - [Supprimer un enregistrement](#supprimer-un-enregistrement)

## Introduction

Bow fourni un api lié à la construction de requête. Avec la méthode `table` permet de construire une requête `sql` en se basant sur la nom de la table et retour une instance de [`Bow\Database\QueryBuilder::class`](https://bowphp.com/api/master/Bow/Database/QueryBuilder.html).

```php
use Bow\Database\Database

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

## Recupéré les informations

Pour recupérer les informations avec le builder, vous devez utiliser le méthode `get` qui retourne une collection, `first` qui lui retourne `null` ou un objet `stdclass` et `last` qui se comporte comme `first` sauf qu'il retourne plutôt le dernier élément du résultat de l'exécution de la requête.

### Exemple avec `get`

```php
$builder = Database::table('users');

$users = $builder->get();

foreach ($users as $user) {
  echo $user->name;
}
```

> Notez que vous pouvez passer un tableau à `get` qui est une liste des colonnes de la projection comme ceci `$builder->get(['name'])`.

### Exemple avec `first`

```php
$user = table('users')->first();

// Vide
is_null($user)
// Ok
echo $user->name;
```

### Exemple avec `last`

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

## Aggregates

Le générateur de requêtes fournit également une variété de méthodes d'agrégation telles que `count`, `max`, `min`, `avg` et `sum`. Vous pouvez appeler n'importe laquelle de ces méthodes après avoir construit votre requête.

```php
$users = table('users')->count();

$price = table('orders')->max('price');

$avg = table('orders')->avg('price');
```

### Déterminer si des enregistrements existent

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

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
