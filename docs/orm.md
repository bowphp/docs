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

Dans tout bon Framework qui se respect, il y a un système de ORM et qui posséde un nom super mignon. Celui de Bow se nomme **Barry**, n'est pas mignon ça :smile:.

## Ajouter un model

Pour ajouter un modêle il faut utiliser la ligne de commande `php bow` avec la commande `add:model` suivi du nom du model

```bash
php bow add:model Todo
```

Après création du modele, un fichier du meme nom sera créer, dans note cas `Todo.php`, à la racine du dossier `app/Model`.

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

Ici Chaque model suit le parten Active Recorde.

## Récupérer les données

Pour manipuler les données de la base de donnée

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
