---
id: cli
title: CLI Commands
---

> Section en rédaction

Create create a user class

    [option]
    --no-plain              Create a plain controller [available in add:controller]
    -m                      Create a migration [available in add:model]
    --create                Create a migration for create table [available in add:migration]
    --table                 Create a migration for alter table [available in add:migration]

    * you can use --no-plain --with-model in same command

    $ php bow add:controller name [option]  For create a new controlleur
    $ php bow add:middleware name           For create a new middleware
    $ php bow add:service name              For create a new service
    $ php bow add:model name [option]       For create a new model
    $ php bow add:validation name           For create a new validator
    $ php bow add:seeder name [--n-seed=n]  For create a new table seeder
    $ php bow add:migration name            For create a new table migration
    $ php bow add help                      For display this

Generate create a resource and app key

Option

- --model   Define the usable model

```sh
$ php bow generate:resource name             For create a new REST controller
$ php bow generate:key                       For generate a new APP KEY
$ php bow generate help                      For display this
```

Migrate apply a migration in user model
    [option]
    --all                 Optionnel
    --display-sql         Display rendered sql code

    $ php bow migrate:up name [option]  Up the specify migration
    $ php bow migrate:down name         Down migration
    $ php bow migrate [--all]           Up all defined migration
    $ php bow migrate help              For display this

Run for launch repl and local server
    Option: run:server [--port=5000] [--host=localhost] [--php-settings="display_errors=on"]
    Option: run:console [--include=filename.php]

   $ php bow run:console [option] Show psysh php REPL 
   $ php bow run:server [option]  Start local developpement server

Clear for clear cache information

   $ php bow clear:view        Clear view cached information
   $ php bow clear:cache       Clear cache information
   $ php bow clear:all         Clear all cache information

Make table seeding
   $ php bow seed:all               Make seeding for all
   $ php bow seed:table table_name  Make seeding for one table