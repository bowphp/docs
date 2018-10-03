# Configuration

- [Structure globale](#structure-globale)
- [Le dossier app](#le-dossier-app)
- [Le dossier storage](#le-dossier-storage)

## Structure globale

L'orgination de `bow` respect le parten *MVC*, entendez par *M*odel *V*ue *C*ontrolleur.

| Dossier ou fichier | Description |
|---------|-------------|
| __app__ | Contient les dossiers de l'application. C'est le dossier dans lequel vous allez programmer votre application à `80%`. Il contient entre autre le dossier `Controller`, le dossier `Middelware`, le dossier `routes` et `views`, (si vous générez un validateur le dossier Validation apparaitra). Enfin tout les fichiers du model y seront stocker |
| __components__ | Contient les assets de l'application. Il contient entre autre le dossier `assets`, `lang` et le dossier `views`. Qui sont le assets de votre application. C'est la que vous allez mettre vos fichiers static et ensuite les compiler |
| __config__ | Contient tout la configuration de l'application. |
| __db__ | Dossier dans lequel sera souvegardé les migrations et seeding de votre application |
| __public__ | Régroupe les feuilles de styles et fichier javascript ou tout autre fichier statique. (Si vous utiliser des préprocésseurs. Nous vous invitons à les mettres dans le dossier `components/views` pour ensuite les compilés afin de les protégés le accès publique de ce dossier) |
| __routes__ | dossier dans lequel sera souvegardé les routes de votre application |
| __storage__ | Contient le dossier dans lequel est sauvegardé les `caches`, les `logs` et le stockage de fichier uploader par le bien du système de `Storage` de bow de l'application.|
| __tests__ | Contient le dossier dans lequel vous allez faire les tests de l'application.|

## Le dossier `app`

C'est votre repertoire de travail sur bow. C'est la que vous allez inserer tout les fichiers de votre application.

Ici vous rétrouverez les dossiers suivant.

- __Controllers__ dossier dans lequel sera souvegardé les controlleurs de l'application.
- __Middleware__ dossier dans lequel sera souvegardé les middlewares de l'application.
- __Configiration__ dossier dans lequel sera souvegardé les Configuration personnalisés de l'application.
- __Kernel__ dossier dans lequel sera souvegardé la configuration du lanceur de l'application.
- __Validations__ dossier dans lequel sera souvegardé les validations de l'application.

## Le dossier `components`

C'est la que vous allez inserer tout les fichiers de votre application. Vous rétrouverez les dossiers suivant.

- __assets__:
  - __js__: Votre fichier `Jqvascript` seront sauvegardés ici.
  - __scss__: Votre ficher scss seront sauvégardés ici.
  - __components__: Si vous utiliser des components Web dans votre application créés au traver `Reactjs` ou `Vuejs`. Il est récommendé de les organisés dans ce dossier.
- __lang__: Dossier dans lequel les locales de votre application seront sauvegardés.
- __views__: Dossier dans lequel sera souvegardé les vues de votre application.

## Le dossier `storage`

Ici, bow va stocker les fichers de log et le cache de votre application. Vous rétrouverez les dossiers suivant.

- __app__: Dossier dans lequel l'application sauvegarde les fichiers uploader de l'applications
- __workspace__: Dossier dans lequel est sauvegardé les logs de l'application.
  - __cache__: Dossier dans lequel l'application sauvegarde les caches de l'applications
  - __view__: Dossier dans lequel l'application sauvegarde le cache de compilation des vues

## Le dossier `db`

- __migration__: Régroupe tout les fichiers de migration de la base de donnée. Il existe un fichier nommé `.registers` qui ne doit en aucun cas être supprimer, c'est la mémoire en effet du système de migration de bow
- __seeders__: Régroupe tout les fichiers de migration de la base de donnée. Il existe un fichier nommé.