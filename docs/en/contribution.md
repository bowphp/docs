---
id: contribution
title: 👩🏽‍🍳 Guide de Contribution
---

- [Introduction](#introduction)
- [Processus de contribution](#processus-de-contribution)
- [Format des messages de commit](#format-des-messages-de-commit)
- [Il manque quelque chose ?](#il-manque-quelque-chose-)

## Introduction

Les contributions sont les bienvenues et seront entièrement créditées. Si vous voulez contribuer au projet, veuillez d'abord discuter
des changements que vous voulez apporter via email, en créant une issue sur github, avec les responsables du dépôt avant
de coder votre solution.

Veuillez s'il vous plaît vous conformer au code de conduite lors de vos interactions sur ce projet.

Nous acceptons les contributions via Pull Request sur [GitHub](https://github.com).

## Processus de contribution

- Fork le projet
- Créez une branche avec un nom descriptif de vos modifications
- Utilisez des messages de commits descriptifs
- Ajoutez des test unitaires
- Documentez vos modifications - Assurez vous que la documentation est mise à jour selon vos modifications
- Un pull request par fonctionnalité - Si vous voulez faire plus d'une chose, faites plusieurs pull requests
- Mettez à jour la version - Nous suivons le schema SemVer

## Format des messages de commit

Pour faciliter la maintenance du dépôt, Bow utilise un format pour les messages de commits.

- `change` pour ajouter un changement sur un functionnement
- `fix` pour fixer une bug
- `feat` pour ajouter une nouvelle fonctionnalité

Veuillez vous référer à l'exemple suivant:

```sh
git commit
```

Dans votre éditeur

```txt
change(module_name): your commit message

Description
```

Si la modification affecte une section:

```bash
git commit -m "change(session): rename init variable"
```

Si la modification affecte un élément dans une section:

```bash
git commit -m "fix(http:request): bug fix #40"
```

Dans le cas où vos modifications affectent plusieurs sections, ajoutez une description avec votre commit sous forme de liste à puce.

> Notez que les messages de commit doivent être en anglais.

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
