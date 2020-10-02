---
id: orm
title: Barry ORM
---

<h1 align="center">
  <img src="https://raw.githubusercontent.com/bowphp/arts/master/barry.jpg" width="150px">
  <br>Barry ORM
</h1>

<p align="center">BARRY c'est l'ORM (<strong>Object Relation Mapping</strong>) intégrer dans Bow Framework.</p>

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
use App\Models\Todo;

$todos = Todo::all();

foreach ($todos as $todo) {
  echo $todo->title;
}
```

La méthode `find` et `findBy` permet aussi de récupérer les informations:

```php
// Avec find
$todo = Todo::find(1);

// Avec findBy
$todo = Todo::findBy('id', 1);
```

> La méthode peut aussi retourner `null` dans le case ou il y a aucun enrégistrement trouvé

## Ajout de contraintes supplémentaires

La méthode BARRY `all` retournera tous les résultats dans le tableau du modèle. Étant donné que chaque modèle BARRY sert de [générateur de requêtes](./query-build.md), vous pouvez également ajouter des contraintes aux requêtes, puis utiliser la méthode get pour récupérer les résultats:

```php
$flights = App\Models\Todo::where('status', 'done')
            ->orderBy('titie', 'desc')
            ->take(10)
            ->get();
```

## Récupération d'agrégats

Vous pouvez également utiliser les méthodes `count`, `sum`, `max` et d'autres méthodes d'agrégation fournies par le [générateur de requêtes](./query-build.md). Ces méthodes renvoient la valeur scalaire appropriée au lieu d'une instance de modèle complète:

```php
use App\Models\Todo;

$count = Todo::where('status', 'done')->count();

$max = Todo::where('status', 'done')->max('budget');
```

## Insertion et mise à jour de modèles

### INSERT

Pour créer un nouvel enregistrement dans la base de données, créez une nouvelle instance de modèle, définissez des attributs sur le modèle, puis appelez la méthode de sauvegarde:

```php

namespace App\Http\Controllers;

use App\Controllers\Controller;
use App\Models\Todo;
use Bow\Http\Request;

class TodoController extends Controller
{
  /**
   * Créez une nouvelle instance de todo.
   *
   * @param Request $request
   * @return mixed
   */
  public function store(Request $request)
  {
    // Validez la demande...

    $todo = new Todo;

    $todo->title = $request->get('title');
    $todo->budget = $request->get('budget', 0);
    $todo->status = 'pending';

    $todo->save();
  }
}
```

Dans cet exemple, nous affectons le paramètre de nom de la requête HTTP entrante à les attributs `title`, `budget` de l'instance de modèle `App\Models\Todo`. Lorsque nous appelons la méthode `save`, un enregistrement sera inséré dans la base de données. Les horodatages `created_at` et `updated_at` seront automatiquement définis lorsque la méthode de sauvegarde sera appelée, il n'est donc pas nécessaire de les définir manuellement.

### Insert via CREATE

Les objets Active Record peuvent être créés à partir d'un hachage, d'un bloc ou avoir leurs attributs définis manuellement après la création. La nouvelle méthode renverra un nouvel objet tandis que `create` renverra l'objet et l'enregistrera dans la base de données.

Par exemple, étant donné un utilisateur modèle avec des attributs de nom et d'occupation, l'appel de la méthode create créera et enregistrera un nouvel enregistrement dans la base de données:

```php
use App\Models\Todo;

$user = Todo::create([
  'title' => 'Acheter un ticket metro',
  'budget' => 2000,
  'status' => 'pending',
]);
```

### UPDATE

La méthode `save` peut également être utilisée pour mettre à jour des modèles qui existent déjà dans la base de données. Pour mettre à jour un modèle, vous devez le récupérer, définir les attributs que vous souhaitez mettre à jour, puis appeler la méthode `save`. Encore une fois, l'horodatage `updated_at` sera automatiquement mis à jour, il n'est donc pas nécessaire de définir manuellement sa valeur:

```php
use App\Models\Todo;

$todo = Todo::find(1);

$todo->title = 'Shopping pour Franck';

$todo->save();
```

Ou bien vous pouvez aussi utiliser la methode `update`. Seulement vous dévez definir les conditions pour ainsi limiter l'impact de la mise à jour.

```php
use App\Models\Todo;

Todo::where('status', 'done')
  ->update(['title' => 'Achat de ticket d\'avion']);
```

La méthode `update` attend un tableau de paires de colonnes et de valeurs représentant les colonnes à mettre à jour.

## Suppression de donnée

De même, une fois récupéré, un objet Active Record peut être détruit, ce qui le supprime de la base de données.

```php
use App\Models\Todo;

$todo = Todo::find(1);
$todo->delete();
```

Si vous souhaitez supprimer plusieurs enregistrements en masse, vous pouvez utiliser la méthode `destroyBy` ou `truncate`:

```php
// find and delete all todo by id
Todo::destroyBy('id', 'David');

// delete all todo
Todo::truncate();
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
