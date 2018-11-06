---
id: contribution
title: Guide de Contribution
---

- [Introduction](#introduction)
- [Découpage du projet](#decoupage-du-projet)
- [Comment faire les commits](#comment-faire-les-commits)

## Introduction

Pour participer au projet il faut:

- Fork le projet afin qu'il soit parmi les répertoires de votre compte github ex :`https://github.com/votre-compte/app`
- Cloner le projet depuis votre compte github `git clone https://github.com/votre-crompte/app`
- Créer un branche qui aura pour nom le résumé de votre modification `git branch branche-de-vos-traveaux`
- Faire une publication sur votre dépot `git push origin branche-de-vos-traveaux`
- Enfin faire un [pull-request](https://www.thinkful.com/learn/github-pull-request-tutorial/Keep-Tabs-on-the-Project#Time-to-Submit-Your-First-PR)

## Découpage du projet

Le projet Bow framework est découper en sous projet. Alors chaque participant poura participer sur la section dans laquelle il se sens le mieux.

Imaginons que vous êtes plus confortable avec la construction des Routing. Il suffit de vous concentrer sur `src/Routing`. Notez que les sections ont faire pour être indépendant et donc possède leur propre configuration du style `SectionConfiguration` et qui implément l'interface `Bow\Configuration\Configuration`.

## Comment faire les commits

Les commits permettent de valider vos modifications. Mais dans le projet Bow, il y a une façon d'écrire le message de commit. Prenons un exemple, vous avez travailler sur la section `Session` et vous voulez valider vos modification.

Pour le faire, regardons un peu la nomenclature d'un message de commit:

```sh
git commit
```

Dans votre éditeur

```sh
[nom-de-la-section] message of commit

Description
```

Dans notre exemple précédant nous allons donc faire:

```sh
git commit -m "[session] modification message"
```

La modification peut aussi affecté un élément dans un section:

```sh
git commit -m "[http:request] bug fix #40"
```

Dans le cas ou votre modification affecte plusieur section ? Vous donnez un message et un description des modifications sous forme de liste à puce.

> Notez que les messages de commit son anglais.

## Auteurs

**Franck Dakia** est un développeur Full Stack basé actuellement en Afrique, Côte d'ivore. Passioné de code, et développement collaboratif, Speaker, Formateur et Membre de plusieurs communautés de développeurs.

Contact: [dakiafranck@gmail.com](mailto:dakiafranck@gmail.com) - [@franck_dakia](https://twitter.com/franck_dakia)

**SVP s'il y a un bogue sur le projet veuillez me contacter par email ou laissez moi un message sur le [slack](https://bowphp.slack.com).**