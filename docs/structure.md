---
id: structure
title: Structure
---

- [Structure globale](#structure-globale)
- [Le dossier app](#le-dossier-app)
- [Le dossier frontend](#le-dossier-frontend)
- [Les dossier `migration` et `seeders`](#les-dossier-migration-et-seeders)
- [Le dossier var](#le-dossier-var)

## Structure globale

Bow Framework se conforme au modèle *MVC* (*M*odèle *V*ue *C*ontrôleur).

| Dossier | Description |
|---------|-------------|
| __app__ | Contient la logique principale de votre application. Presque toutes les classes de votre application seront dans ce dossier |
| __frontend__ | Contient les scripts et fichiers de styles de l'application. Il contient entre autre le dossier `js`, `sass`, `lang` et le dossier `views`. C'est là que vous allez mettre vos fichiers static et ensuite les compiler |
| __config__ | Contient les différents fichier de configuration des composants de l'application. |
| __migrations__ | Dossier dans lequel sera sauvegardé les migrations de votre application |
| __seeders__ | Dossier dans lequel sera sauvegardé les seeding de votre application |
| __public__ | Le front contrôleur et les fichiers compilés sont stockés dans ce dossier. |
| __routes__ | Contient les routes de votre applications |
| __var__ | Contient le dossier dans lequel est sauvegardé les `cache`, les `log` et le stockage de fichier télécharger via le système de `Storage` de Bow.|
| __tests__ | Contient les tests de l'application. |

## Le dossier app

C'est votre répertoire de travail sur bow. C'est là que vous allez insérer tous les fichiers de votre application.

Ici vous retrouverez les dossiers suivants:

- __Configuration__: Dossier dans lequel sera sauvegardé les Configuration personnalisés de l'application.
- __Controller__: Dossier dans lequel sera sauvegardé les contrôleurs de l'application.
- __Middleware__: Dossier dans lequel sera sauvegardé les middlewares de l'application.
- __Model__: Dossier dans lequel sera sauvegardé les modèles de l'application.
- __Validation__: Dossier dans lequel sera sauvegardé les validations de l'application.

Vous trouverez aussi les fichiers suivants:

- __Kernel.php__: La configuration du lanceur de l'application.
- __ErrorHandle.php__: Ce fichier permet au framework d'envoyer les erreurs internes et externes vers la partie frontend pour permettre au développeur de les mieux traiter

## Le dossier frontend

C'est là que vous allez insérer tous les fichiers qui sont utilisé dans les vues de votre application. Vous y retrouverez les dossiers suivant:

- __js__: Votre fichier `Javascript` seront sauvegardés ici.
- __sass__: Votre ficher scss seront sauvegardés ici.
- __lang__: Dossier dans lequel les locales de votre application seront sauvegardés.
- __templates__: Dossier dans lequel sera sauvegardé les vues de votre application.

> Consultez la section [webpack.mix.js](./frontend)

## Les dossier `migration` et `seeders`

- __migration__: Regroupe tout les fichiers de migration de la base de donnée. Il existe un fichier nommé `.registers` qui ne doit en aucun cas être supprimer, c'est la mémoire en effet du système de migration de bow
- __seeders__: Regroupe tout les fichiers permettant d'entrer des données de test dans votre base de données.

## Le dossier var

Ici, Bow va stocker les fichiers de log et le cache de votre application. Vous y retrouverez les dossiers suivant:

- __app__: Dossier dans lequel l'application sauvegarde les fichiers téléchargé de l'application
- __logs__: Dossier dans lequel est sauvegardé les logs de l'application.
- __session__: Dossier dans lequel est sauvegardé les fichiers de session de l'application.
- __cache__: Dossier dans lequel l'application sauvegarde les caches de l'application
- __view__: Dossier dans lequel l'application sauvegarde le cache de compilation des vues

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
