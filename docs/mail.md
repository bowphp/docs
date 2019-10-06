---
id: mail
title: Mail
---

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
  - [La méthode send](#la-m%c3%a9thode-send)
    - [Prototype send](#prototype-send)
  - [API de Message](#api-de-message)
      - [`addHeader`, ajout des entêtes personnalisés](#addheader-ajout-des-ent%c3%aates-personnalis%c3%a9s)
      - [`to`, définit le destinataire](#to-d%c3%a9finit-le-destinataire)
      - [`toList`, Ajout plusieurs destinataires](#tolist-ajout-plusieurs-destinataires)
      - [`addFile`, Permet d'ajouter une pièce jointe](#addfile-permet-dajouter-une-pi%c3%a8ce-jointe)
      - [`subject`, Définit l'objet du mail](#subject-d%c3%a9finit-lobjet-du-mail)
      - [`from`, définit l'expéditeur du mail](#from-d%c3%a9finit-lexp%c3%a9diteur-du-mail)
      - [`toHtml`, définir le type de contenu en text/html](#tohtml-d%c3%a9finir-le-type-de-contenu-en-texthtml)
      - [`toText`, Définit le corps du message](#totext-d%c3%a9finit-le-corps-du-message)
      - [`addBcc`, ajout l'entête Carbon Copy](#addbcc-ajout-lent%c3%aate-carbon-copy)
      - [`addCc`, ajout l'entête Carbon Copy](#addcc-ajout-lent%c3%aate-carbon-copy)
      - [`addReplyTo`, ajout l'entête Reply-To](#addreplyto-ajout-lent%c3%aate-reply-to)
      - [`addReturnPath`, ajout l'entête Return-Path](#addreturnpath-ajout-lent%c3%aate-return-path)
  - [La méthode raw](#la-m%c3%a9thode-raw)
    - [Prototype raw](#prototype-raw)

## Introduction

Envoyer des emails dans une application est monnaie courante. Bow Framework intègre un système d'envoi d'email facile à utiliser. Vous pouvez utiliser ce système à travers plusieurs pilotes communement appelés drivers:

- **SMTP** - Envoie direct via un serveur SMTP
- **MAIL** - Le système utilisera le fonction `email` natif de PHP

## Configuration

Vous trouverez la configuration dans le fichier `config/mail.php` qui est rélativement simple, les options sont toutes commentés.

## Utilisation

Pour utiliser le service, vous devez appeler la classe [`Bow\Mail\Mail::class`](https://bowphp.github.io/api/master/Bow/Mail). Il y a deux méthode statique pour l'envoie de mail `send` et `raw`.

### La méthode send

**send** permet d'envoyer des emails en se basant sur une [vue](http://bowphp.github.io/docs/views) dans l'application.

#### Prototype send

```php
send($view, array $data, callable $callable)
```

| Paramètre | Type |
|----------|------|
| view | `String` L'email du destinataire |
| data | `Array` Les informations à passer à la vue |
| callable | `Closure` Le constructeur du message |

`$callable` vous permet de construire le message et prend en paramètre une instance de [`Bow\Mail\Message`](https://bowphp.github.io/api/master/Bow/Mail/Message.html) qui permet d'ajouter le destinataire, l'objet, les pièces jointes, l'expéditeur.

Exemple d'utilisation:

Considérons la vue `email-view.tintin.php` qui contient les informations suivantes:

```twig
Bonjour {{ $name }},

Nous vous informons que vous compte viens d'être créditer de 100.000 F.

Cordialement,
```

```php
use Bow\Mail\Mail;
use Bow\Mail\Message;

$data = [
  'name' => 'Franck',
];

Mail::send('email-view', $data, function (Message $message) {
  $message->to('info@exemple.com');
  $message->subject("Paiement !");
  $messate->from("Bow <info@exemple.com>");
});
```

### API de Message

Bow Framework va donc passer une instance de `Bow\Mail\Message` qui vous permettra d'ajouter des informations supplémentaires à votre email, notamment le destinataire.

##### `addHeader`, ajout des entêtes personnalisés

```php
$message->addHeader(string $key, string $value)
```

##### `to`, définit le destinataire

```php
$message->to(string $to, string $name = null)
```

##### `toList`, Ajout plusieurs destinataires

```php
$message->toList(array $list_desc)
```

##### `addFile`, Permet d'ajouter une pièce jointe

```php
$message->addFile(string $file)
```

##### `subject`, Définit l'objet du mail

```php
$message->subject(string $subject)
```

##### `from`, définit l'expéditeur du mail

```php
$message->from(string $from, string $name = null)
```

##### `toHtml`, définir le type de contenu en text/html

```php
$message->html($html)
```

##### `toText`, Définit le corps du message

```php
$message->text(string $text)
```

##### `addBcc`, ajout l'entête Carbon Copy

```php
$message->addBcc(string $mail, string $name = null)
```

##### `addCc`, ajout l'entête Carbon Copy

```php
$message->addCc(string $mail, string $name = null)
```

##### `addReplyTo`, ajout l'entête Reply-To

```php
$message->addReplyTo($mail, $name = null)
```

##### `addReturnPath`, ajout l'entête Return-Path

```php
$message->addReturnPath($mail, $name = null)
```

### La méthode raw

**raw** par contre, permet d'envoyer des emails avec un message brute

#### Prototype raw

```php
raw($to, $subject, $message, array $headers = [])
```

| Paramètre | Type |
|----------|------|
| to | `String` L'email du destinataire |
| subject | `String` L'objet du mail |
| message | `String` Le message à envoyer |
| headers | `Array` Les entête-https à envoyer, par defaut est vide |

```php
use Bow\Mail\Mail;

$email = "hello@exemple.com";
$subject = "Hello, world";
$message = "C'est juste un email de teste";

Mail::raw($email, $subject, $message);
```

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
