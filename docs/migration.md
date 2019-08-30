---
id: migration
title: Migration
---

- [Introduction](#introduction)
- [Ajouter une migration](#ajouter-une-migration)
- [Liste de méthode](liste-de-methode)

## Introduction

Les migrations sont un moyen pour versionner votre base de donnée qui évolue souvent avec les modifications de l'application.

Les migrations sont sauvegardés dans le dossier `migration`.

## Ajouter une migration

Pour ajouter une migration il faut passer par `php bow` avec la commande `add:migration` ensuite le nom de la migration(ex: `createTodosTable`). Bow créra un fichier du même nom précédé d'une date de création.

Si vous voulez ajouter directement le nom de table dans la migration, ajouter le flag `--create=nom_de_la_table` ou `--table=nom_de_la_table`.

```bash
php bow add:migration createTodosTable --create=todos
```

Dans le fichier créé:

```php
use Bow\Database\Migration\Migration;
use Bow\Database\Migration\SQLGenerator;

class Version20170407084225CreateTodosTable extends Migration
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

## Api de migration

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
