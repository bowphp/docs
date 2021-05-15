---
id: structure
title: ⚙️ App Structure
---

- [Structure globale](#structure-globale)
- [Dossier app](#dossier-app)
- [Dossier frontend](#dossier-frontend)
- [Dossiers migrations et seeders](#dossiers-migrations-et-seeders)
- [Dossier var](#dossier-var)
- [Dossier tests](#dossier-tests)

## Structure globale

Bow Framework se conforme au modèle *MVC* (*M*odèle *V*ue *C*ontrôleur).

| Dossier | Description |
|---------|-------------|
| __app__ | Contient la logique principale de votre application. Presque toutes les classes de votre application seront dans ce dossier |
| __frontend__ | Contient les scripts et fichiers de styles de l'application. Il contient entre autre le dossier `js`, `sass`, `lang`. C'est là que vous allez mettre vos fichiers static et ensuite les compiler |
| __templates__ | Contient les vues de votre application |
| __config__ | Contient les différents fichier de configuration des composants de l'application. |
| __migrations__ | Dossier dans lequel sera sauvegardé les migrations de votre application |
| __seeders__ | Dossier dans lequel sera sauvegardé les seeding de votre application |
| __public__ | Le front contrôleur et les fichiers compilés sont stockés dans ce dossier. |
| __routes__ | Contient les routes de votre applications |
| __var__ | Contient le dossier dans lequel est sauvegardé les `cache`, les `log` et le stockage de fichier télécharger via le système de `Storage` de Bow.|
| __tests__ | Contient les tests de l'application. |

## Dossier app

C'est votre répertoire de travail sur bow. C'est là que vous allez insérer tous les fichiers de votre application.

Ici vous retrouverez les dossiers suivants:

- __Configurations__: Dossier dans lequel sera sauvegardé les Configuration personnalisés de l'application.
- __Controllers__: Dossier dans lequel sera sauvegardé les contrôleurs de l'application.
- __Middlewares__: Dossier dans lequel sera sauvegardé les middlewares de l'application.
- __Events__: Dossier dans lequel sera sauvegardé les events générés par Bow Console.
- __Models__: Dossier dans lequel sera sauvegardé les modèles de l'application.
- __Validations__: Dossier dans lequel sera sauvegardé les validations de l'application.
- __Exceptions__: Dossier dans lequel sera sauvegardé les exceptions personnalisés de l'application.
- __Services__: Dossier dans lequel sera sauvegardé les services générés par Bow Console.

Vous trouverez aussi les fichiers suivants:

- __Kernel.php__: La configuration du lanceur de l'application.

## Dossier frontend

C'est là que vous allez insérer tous les fichiers qui sont utilisé dans les vues de votre application. Vous y retrouverez les dossiers suivant:

- __js__: Votre fichier `Javascript` seront sauvegardés ici.
- __sass__: Votre ficher scss seront sauvegardés ici.
- __lang__: Dossier dans lequel les locales de votre application seront sauvegardés.

> Consultez la section [webpack.mix.js](./frontend)

## Dossiers migrations et seeders

- __migrations__: Regroupe tout les fichiers de migration de la base de donnée.
- __seeders__: Regroupe tout les fichiers permettant d'entrer des données de test dans votre base de données.

## Dossier var

Ici, Bow va stocker les fichiers de log et le cache de votre application. Vous y retrouverez les dossiers suivant:

- __storage__: Dossier dans lequel l'application sauvegarde les fichiers téléchargé de l'application
- __logs__: Dossier dans lequel est sauvegardé les logs de l'application.
- __session__: Dossier dans lequel est sauvegardé les fichiers de session de l'application.
- __cache__: Dossier dans lequel l'application sauvegarde les caches de l'application
- __view__: Dossier dans lequel l'application sauvegarde le cache de compilation des vues

## Dossier tests

Ici, vous allez stocker vos fichiers de test unity. Et par soucie de bien faire nous avons:

- __Http__: Vos sauvegarder vos fichiers de test Http seront ici
- __Unity__: Vos fichiers de test Unity seront ici

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
