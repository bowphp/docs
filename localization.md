# Localisation

- [Introduction](#introduction)
- [Fonctionnement](#fonctionement)
- [Traduction simple](#traduction-simple)
- [Traduction pluriel](#traduction-pluriel)

## Introduction

Dans tout application, il y a le besoin de rendre l'application multi-languge. Bow implement un systeme simple tranduction.

Dans le dossier `components/lang` sont ranger les traductions de votre application. Ce sont des fichier php qui retourne un `array` et si vous remarquez il y a un dossier `fr` et `en`. Ce sont les dossiers pour chaque langue ici `fr` pour français et `en` pour anglais.

## Fonctionnement

Pour utiliser le systeme de traduction. Il faut d'abort considéré la confirguration qui se trouve dans le dossier `config/trans.php`. Dans le fichier la langue par defaut c'est le francais dont le `fr`.

## Traduction simple

## Traduction pluriel