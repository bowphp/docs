---
id: migration
title: Migration
---

- [Introduction](#introduction)
- [Ajouter une migration](#ajouter-une-migration)
- [Structure de migration](#structure-de-migration)
- [Exécuter des migrations](#exécuter-des-migrations)
- [Faire reculer les migrations](#faire-reculer-les-migrations)
- [Création de table](#création-de-table)
- [Connexion à la base de données et options de table](#connexion-à-la-base-de-données-et-options-de-table)
- [Renommer / Supprimer des tables](#renommer--supprimer-des-tables)
- [Créer des colonnes](#créer-des-colonnes)
- [Api de migration](#api-de-migration)
  - [Examinons ensemble](#examinons-ensemble)
  - [Liste des helpers](#liste-des-helpers)

## Introduction

Les migrations sont un moyen pour versionner votre base de donnée qui évolue souvent avec les modifications de l'application.

Les migrations sont sauvegardés dans le dossier `migration`.

## Ajouter une migration

Pour ajouter une migration il faut passer par `php bow` avec la commande `add:migration` ensuite le nom de la migration(ex: `createTodosTable`). Bow créra un fichier du même nom précédé d'une date de création.

```bash
php bow add:migration create_todos_table
```

Les options `--table` et `--create` peuvent également être utilisées pour indiquer le nom de la table et indiquer si la migration créera une nouvelle table. Ces options pré-remplissent le fichier de raccord de migration généré avec la table spécifiée:

Si vous voulez ajouter directement le nom de table dans la migration, ajouter le flag `--create=nom_de_la_table` ou `--table=nom_de_la_table`.

```bash
php bow add:migration create_todos_table --create=todos

php bow add:migration create_todos_table --table=todos
```

## Structure de migration

Une classe de migration contient deux méthodes: `up` et `rollback`. La méthode `up` sert à ajouter de nouvelles tables, colonnes ou index à votre base de données, tandis que la méthode `rollback` doit inverser les opérations effectuées par la méthode `up`.

Par exemple, la migration créé précédement:

```php
use Bow\Database\Migration\Migration;
use Bow\Database\Migration\SQLGenerator;

class Version20190929153939CreatTodosTable extends Migration
{
  /**
   * Create Table
   */
  public function up()
  {
    $this->create("users", function (SQLGenerator $table) {
      $table->addIncrement('id');
      $table->addTimestamps();
    });
  }

  /**
   * Drop Table
   */
  public function rollback()
  {
    $this->dropIfExists("users");
  }
}
```

## Exécuter des migrations

Pour exécuter toutes vos migrations en attente, exécutez la commande `migration:migrate` de la commande Bow:

```bash
php bow migration:migrate
```

Vous pouvez aussi utiliser le racourci `migrate`.

```bash
php bow migrate
```

## Faire reculer les migrations

Pour annuler la dernière opération de migration, vous pouvez utiliser la commande d'annulation. Cette commande annule le dernier "lot" de migrations, qui peut inclure plusieurs fichiers de migration:

```bash
php artisan migration:rollback
```

La commande `migration:reset` annule toutes les migrations de votre application:

```bash
php artisan migration:reset
```

## Création de table

Pour créer une nouvelle table de base de données, utilisez la méthode `create`. La méthode `create` accepte deux arguments. Le premier est le nom de la table, tandis que le second est une clôture qui reçoit un objet `\Bow\Database\Migration\SQLGenerator::class` pouvant être utilisé pour définir la nouvelle table:

```php
$this->create("users", function (SQLGenerator $table) {
  $table->addIncrement('id');
  $table->addTimestamps();
});
```

## Connexion à la base de données et options de table

Si vous souhaitez effectuer une opération de schéma sur une connexion à une base de données autre que la connexion par défaut, utilisez la méthode de `connection` suivante:

```php
$this->connection('name')->create("users", function (SQLGenerator $table) {
  $table->addIncrement('id');
  $table->addTimestamps();
});
```

Vous pouvez utiliser les commandes suivantes dans le générateur de schéma pour définir les options de la table:

| Paramètre | Description |
|----------|------|
| $table->withEngine('InnoDB') | Ici, on modifie le système de storage |
| $table->withCharset('utf8') | Ici, on modifie l'encodage |
| $table->withCollation('utf8_unicode_ci') | Ici, Spécifier un classement par défaut pour la table |

## Renommer / Supprimer des tables

Pour renommer une table de base de données existante, utilisez la méthode `renameTable`:

```php
public function up()
{
  $this->renameTable($from, $to);
}
```

Pour supprimer une table existante, vous pouvez utiliser les méthodes drop ou dropIfExists:

```php
public function rollback()
{
  $this->drop('users');
  
  $this->dropIfExists('users');
}
```

> Avant de renommer une table, vous devez vérifier que toutes les contraintes de clé étrangère sur la table ont un nom explicite dans vos fichiers de migration au lieu de laisser Laravel attribuer un nom basé sur une convention. Sinon, le nom de la contrainte de clé étrangère fera référence à l'ancien nom de la table.

## Créer des colonnes

La méthode de `alter` sur `Bow\Database\Migration\Migration::class` peut être utilisée pour mettre à jour des tables existantes. Comme la méthode `create`, la méthode `alter` accepte deux arguments: le nom de la table et une clôture qui reçoit une instance de `\Bow\Database\Migration\SQLGenerator::class` que vous pouvez utiliser pour ajouter des colonnes à la table:

```php
public function up()
{
  $this->alter('users', function (SQLGenerator $table) {
    $table->addString('name');
  });
}
```

## Api de migration

Notons pour l'instant que tous ces méthodes sont en réalité des helpers de la méthode `addColumn` de `\Bow\Database\Migration\SQLGenerator::class`.

### Examinons ensemble

Prototype de la méthode `addColumn`.

```php
$table->addColumn(string $column_name, string $column_type, array $column_attributes);
```

| Paramètre | Type | Description |
|----------|------|------|
| $column_name  | **String** | Le nom de la colonne de la table |
| $column_type  | **String** | Le type de la colonne de la table |
| $column_attributes   | **Array** | Les différents attributes de la colonne en fonction du type |

Liste des attributes: **unique**, **primary**, **index**, **increment**, **default**, **size**, **nullable**, **unsigned**.

| Paramètre | Type | Description |
|----------|------|------|
| unique  | **Boolean** | Ajout UNIQUE sur la description de la colonne |
| primary  | **Boolean** | Define la colonne comme une clé primaire. Ajout PRIMARY AUTO sur la description de la colonne |
| index  | **Boolean** | Definie la colonne comme une INDEX |
| increment  | **Boolean** | Definie la colonne comme une AUTO INCREMENT |
| size  | **Integer** | Definie la taille de la colonne |
| nullable  | **Boolean** | La colonne pourra avoir une valeur nul |
| unsigned  | **Boolean** | Seulement pour les colonnes de type nombre. Elle define la colonne comme non signé |
| default  | **Mixed** | Ajout une valeur par defaut à la colonne si une valeur n'est pas ajouté |

Regardons ensemble cette exemple:

```php
$table->addColumn('id', 'int', [
  'primary' => true,
  'increment' => true,
  'size' => 11
]);

$table->addColumn('price', 'int', [
  'size' => 11,
  'unsigned' => true
]);

$table->addColumn('name', 'string', [
  'nullable' => true,
  'default' => 'Franck DAKIA',
  'size' => 200
]);
```

### Liste des helpers

Bien entendu, le générateur de schéma contient divers types de colonnes que vous pouvez spécifier lors de la construction de vos tables:

| Commande | Description |
|----------|------|
| $table->addIncrement('id') | Incrémentation automatique de la colonne équivalente à INTEGER (clé primaire). |
| $table->addString('name', $attr = []) | Colonne équivalente à VARCGAR. |
| $table->addInteger('price', $attr = []) | Colonne équivalente à INTEGER. |
| $table->addBigInteger('price', $attr = []) | Colonne équivalente à BIGINT. |
| $table->addDouble('price', $attr = []) | Colonne équivalente à DOUBLE. |
| $table->addTinyInteger('status', $attr = []) | Colonne équivalente à TINYINT |
| $table->addBoolean('verified') | Colonne équivalente à BOOLEAN |

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
