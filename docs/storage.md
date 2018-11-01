---
id: storage
title: Storage
---

## Introduction

Bow intègre un système de gestion de fichier permettant de manipuler les fichiers avec une grande simplicité et support plusieurs pilotes:

- S3 [aws/aws-php-sdk](#aws/aws-php-sdk)
- FTP
- Dropbox

## Configuration

Le fichier de configuration du système de fichiers se trouve dans `config/resource.php`. Dans ce fichier, vous pouvez configurer tous vos "disk" locale. Chaque disque représente un emplacement de stockage particuliers.

Des exemples de configuration pour chaque pilote pris en charge sont inclus dans le fichier de configuration. Alors, modifiez la configuration pour refléter vos préférences de stockage et vos informations d'identification.

Bien entendu, vous pouvez configurer autant de disques locale que vous le souhaitez.

> Section en rédaction