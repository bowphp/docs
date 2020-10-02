---
id: orm
title: Barry ORM
---

<h1 align="center">
  <img src="https://raw.githubusercontent.com/bowphp/arts/master/barry.jpg" width="150px">
  <br>Barry ORM
</h1>

<p align="center">Barry c'est l'ORM (<strong>Object Relation Mapping</strong>) intégrer dans Bow Framework.</p>

## Introduction

Un ORM c'est une façon de rélier les tables entre elles en utilisant des classes. Ici chaque enregistrement d'une table représentera un Objet qui peut être en rélation avec d'autre enregistrement. C'est ce qu'on appel en anglais **The Object Relation Mapping** et en français ben, Mappage de rélation en Objet :wink:.

L'ORM BARRY inclus avec Bow Framework fournit une implémentation ActiveRecord belle et simple pour travailler avec votre base de données. Chaque table de base de données a un "modèle" correspondant qui est utilisé pour interagir avec cette table. Les modèles vous permettent de rechercher des données dans vos tables, ainsi que d'insérer de nouveaux enregistrements dans la table.

Dans tout bon Framework qui se respect, il y a un système de ORM et qui posséde un nom super mignon. Celui de Bow se nomme **BARRAY**, n'est pas mignon ça :smile:.

> Avant de commencer, assurez-vous de configurer une connexion à la base de données dans `config/database.php`.

## Ajouter un model

Pour ajouter un modêle il faut utiliser la ligne de commande `php bow` avec la commande `add:model` suivi du nom du model.

```bash
php bow add:model Todo
```

Après création du modele, un fichier du meme nom sera créer, dans note cas `Todo.php`, à la racine du dossier `app/Models`.

Voici un aperçu du fichier:

```php
namespace App\Models;

use Bow\Database\Barry\Model;

class Todo extends Model
{
  //
}
```

> Avant d'utiliser le model vérifier que vous avez configurer votre base de donnée

### Nom de Table

Notez que nous n'avons pas indiqué à BARRY quelle table utiliser pour notre modèle Todo. Par convention, le "snake case", le nom pluriel de la classe sera utilisé comme nom de table à moins qu'un autre nom ne soit explicitement spécifié.

Vous pouvez spécifier manuellement un nom de table en définissant une propriété de table sur votre modèle:

```php
namespace App\Models;

use Bow\Database\Barry\Model;

class Todo extends Model
{
  /**
   * Définissez la table associée au modèle.
   *
   * @var string
   */
  protected $table = 'tbl_todos';
}
```

### Clés primaires

BARRY supposera également que chaque table a une colonne de clé primaire nommée id. Vous pouvez définir une propriété `$primary_key` protégée pour remplacer cette convention:

```php
namespace App\Models;

use Bow\Database\Barry\Model;

class Todo extends Model
{
  /**
   * La clé primaire associée à la table.
   *
   * @var string
   */
  protected $primary_key = 'id_todo';
}
```

## Récupérer les données

Une fois que vous avez créé un modèle et sa table de base de données associée, vous êtes prêt à commencer à récupérer les données de votre base de données. Considérez chaque modèle BARRY comme un puissant [générateur de requêtes](./query-build.md) vous permettant d'interroger couramment la table de base de données associée au modèle.

Par exemple:

```php
$todos = App\Models\Todo::all();

foreach ($todos as $todo) {
  echo $todo->title;
}
```

## Ajout de contraintes supplémentaires

La méthode BARRY `all` retournera tous les résultats dans le tableau du modèle. Étant donné que chaque modèle BARRY sert de [générateur de requêtes](./query-build.md), vous pouvez également ajouter des contraintes aux requêtes, puis utiliser la méthode get pour récupérer les résultats:

```php
$flights = App\Models\Todo::where('status', 'done')
            ->orderBy('titie', 'desc')
            ->take(10)
            ->get();
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
