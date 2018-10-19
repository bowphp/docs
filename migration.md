---
id: migration
title: Migration
custom_edit_url: https://github.com/bowphp/docs/edit/3.0/migration.md
---

- [Introduction](#introduction)
- [Ajouter une migration](#ajouter-une-migration)
- [Liste de méthode](liste-de-methode)

## Introduction

Les migrations sont un moyen pour versionner votre base de donnée qui évolue souvent avec les modifications de l'application.

Les migrations sont sauvegardés dans le dossier `db/migration`.

## Ajouter une migration

Pour ajouter une migration il faut passer par `php bow` avec la commande `add:migration` ensuite le nom de la migration(ex: `create_todos_table`). Bow créra un fichier du même nom précédé d'une date de création.

Si vous voulez ajouter directement le nom de table dans la migration, ajouter le flag `--create=nom_de_table` ou `--table=nom_de_table`.

```bash
php bow add:migration create_todos_table --create=todos
```

Dans le fichier créé:

```php
<?php

use Bow\Database\Migration\Schema;
use Bow\Database\Migration\Migration;
use Bow\Database\Migration\TablePrinter as Printer;

class CreatTodosTable extends Migration
{
  /**
   * create Table
   */
  public function up()
  {
    Schema::create("users", function (Printer $table) {
      $table->increment('id');
      $table->timestamps();
    });
  }

  /**
   * Drop Table
   */
  public function down()
  {
    Schema::drop("users");
  }
}
```

## Liste de méthode

|  Method | Description |
|-----|------|
| `integer` | Ajout une colonne de type `INT` |
| `tinyInteger` | Ajout une colonne de type `TINYINTEGER` |
| `boolean` | Ajout une colonne de type `TINYINTEGER` |
| `smallInteger` | Permet d'ajouter une colonne de type `SMALLINTEGER` |
| `mediumInteger` | Permet d'ajouter une colonne de type `MEDIUMINTEGER` |
| `bigInteger` | Permet d'ajouter une colonne de type |
| `float` | Permet d'ajouter une colonne de type `FLOAT` |
| `string` | Permet d'ajouter une colonne de type `VARCHAR` |
| `longText` | Permet d'ajouter une colonne de type `LONGTEXT` |
| `mediumText` | Permet d'ajouter une colonne de type `MEDIUMTEXT` |
| `tinyText` | Permet d'ajouter une colonne de type `TINYTEXT` |
| `text` | Permet d'ajouter une colonne de type `TEXT` |
| `binary` | Permet d'ajouter une colonne de type `BINARY` |
| `blob` | Permet d'ajouter une colonne de type `BLOB` |
| `tinyBlob` | Permet d'ajouter une colonne de type `TINYBLOB` |
| `longBlob` | Permet d'ajouter une colonne de type `LONGBLOB` |
| `mediumBlob` | Permet d'ajouter une colonne de type `MEDIUMBLOB` |
| `date` | Permet d'ajouter une colonne de type `DATE` |
| `year` | Permet d'ajouter une colonne de type `YEAR` |
| `time` | Permet d'ajouter une colonne de type `TIME` |
| `dateTime` | Permet d'ajouter une colonne de type `DATETIME` |
| `timestamps` | Permet d'ajouter une colonne de type `TIMESTAMPS` |
| `longInteger` | Permet d'ajouter une colonne de type `LONGINTEGER` |
| `character` | Permet d'ajouter une colonne de type `CHARACTER` |
| `enumerate` | Permet d'ajouter une colonne de type `ENUMERATE` |
| `increment` | Permet d'ajouter une colonne de type `INCREMENT` |
| `primary` | Permet d'ajouter une colonne de type `PRIMARY` |
| `indexe` | Permet d'ajouter une colonne de type `INDEXE` |
| `unique` | Permet d'ajouter une colonne de type `UNIQUE` |

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.