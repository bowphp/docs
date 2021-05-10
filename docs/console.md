---
id: console
title: 👨🏾‍💻 Bow Console
---

COMMAND:

help display command helper

### GENERATE create a new app key and resources

  generate:resource   Create new REST controller
  generate:session    For generate session table
  generate:key        Create new app key

### ADD Create a user class

| Commandee | Description |
|----------|------|
| add:middleware    | Create new middleware |
| add:configuration | Create new configuration |
| add:service       | Create new service |
| add:exception     | Create new exception |
| add:controller    | Create new controller |
| add:model         | Create new model |
| add:validator     | Create new validator |
| add:seeder        | Create new table fake seeder |
| add:migration     | Create a new migration |
| add:event         | Create a new event listener |

### MIGRATION apply a migration in user model

| Commandee | Description |
|----------|------|
| migration:migrate |  Make migration |
| migration:reset   |  Reset all migration |
| migration:rollback | Rollback to previous migration |
| migrate            | Alias of migration:migrate |

### CLEAR for clear cache information

  clear:view          Clear view cached information
  clear:cache         Clear cache information
  clear:session       Clear session cache information
  clear:log           Clear logs cache information
  clear:all           Clear all cache information

### SEED Make seeding

  seed:table [name]   Make seeding for one table
  seed:all            Make seeding for all

### RUN Launch process

  run:console show psysh php REPL for debug you code.
  run:server  run a local web server.

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
