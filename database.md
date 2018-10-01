# Database

- [Introduction](#introduction)
	- [Configuration](#configuration)
	- [Connexion à plusieur Base de donnée](#connexion-multiple)
- [Réquête SQL Brute](#introduction)
	- [Execution de réquête Select](#execution-select)
	- [Execution de réquête Insert](#execution-insert)
	- [Execution de réquête Update](#execution-update)
	- [Execution de réquête Delete](#execution-delete)

## Introduction

Bow rend l'interaction avec les bases de données extrêmement simple sur une grande variété de backends de bases de données en utilisant le `SQL brut`, `le générateur de requêtes courant` et l'ORM Barry. 

Actuellement, Bow prend en charge deux bases de données:

- MySQL
- SQLite

### Configuration

La configuration de la base donnée de votre application se localise dans le fihcier `config/db.php`. Dans ce fichier, vous pouvez definir tous les connections de votre base de donnée, as well as specify which connection should be used by default. Un exemple en plus definir pour tous les supports de base de donnée est defini dans le fichier.

### SQLite Configuration

Après avoir créé une nouvelle base de données SQLite à l'aide d'une commande telle que `touch database/database.sqlite`, vous pouvez facilement configurer vos variables d'environnement (dans le fichier `.env.json`) pour qu'elles pointent vers cette base de données nouvellement créée à l'aide du chemin absolu de la base de données:

```
"DB_DEFAULT": "seconds",
...
"SQLITE_DATABASE": "/absolute/path/to/database.sqlite",
```

### Connexion à plusieur Base de donnée

Lorsque vous utilisez plusieurs connexions, vous pouvez accéder à chaque connexion via la méthode de `connexion` sur la classe de la `Database`. Le nom transmis à la méthode de connexion doit correspondre à l'une des points de connexions répertoriées dans votre fichier de configuration `config/db.php`:

```
use \Bow\Database\Database;
$users = Database::connection('seconds')->select(...);
```

Ou via le helper `db`:

```
$users = db('seconds')->select(...);
```

Dans ce cas là le 