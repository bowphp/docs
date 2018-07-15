## Configuration

Parlant de configuration. L'ensemble des configuration de votre application est accessible dont le dossier `config`. Et est divisé en plusieur fichier pour permet un meillieur organisation.

Nous allons parler de configuration pour chacun des section dans la documentation. 
Mais pour lors, presentons les differents fichiers.

| fichier | Description |
|---------|-------------|
| __.key__ | Ce fichier contient la clé de chiffrement de l'application. Que vous pouvez changer avec la commande `php bow generate:key`. |
| __app.php__ | Ce fichier contient la configuration du comportement de votre application, le moteur de template a utiliser; le nom de votre application, etc... |
| __db.php__ | Ce fichier contient votre configuration des connections à base de donnée |
| __helper.php__ | Ce fichier vous permettra d'injecter des `helper` personnaliser dans votre application |
| __mail.php__ | Ce fichier content la configuration de mail |
| __resource.php__ | Ce fichier contient la configuration des connections ftp, et dossier de base de stockage de l'application |
| __view.php__ | Ce fichier contient la configuration des connections ftp, et dossier de base de stockage de l'application |
| __trans.php__ | Ce fichier contient la configuration des connections ftp, et dossier de base de stockage de l'application |