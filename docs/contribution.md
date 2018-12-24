---
id: contribution
title: Guide de Contribution
---

- [Introduction](#introduction)
- [Processus de contribution](#processus-de-contribution)
- [Format des messages de commit](#format-des-messages-de-commit)

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

Pour faciliter la maintenance du dépôt, Bow utilise un format pour les messages de commits. Veuillez vous référer à
l'exemple suivant:

```sh
git commit
```

Dans votre éditeur

```sh
[nom-de-la-section] message of commit

Description
```

Si la modification affecte une section:

```sh
git commit -m "[session] modification message"
```

Si la modification affecte un élément dans une section:

```sh
git commit -m "[http:request] bug fix #40"
```

Dans le cas où vos modifications affectent plusieurs sections, ajoutez une description avec votre commit sous forme de liste à puce.

> Notez que les messages de commit doivent être en anglais.
