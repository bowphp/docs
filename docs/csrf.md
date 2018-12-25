---
id: csrf-protection
title: CSRF Protection
---

- [Introduction](#introduction)
- [X-CSRF-Token](#x-csrf-token)
- [X-XSRF-Token](#x-xsrf-token)

## Introduction

Bow facilite la protection de votre application contre les attaques par contrefaçon de requête intersite (CSRF). Les falsifications de requêtes intersites sont un type d'exploitation malveillante par lequel des commandes non autorisées sont effectuées pour le compte d'un utilisateur authentifié.

Bow génère automatiquement un "jeton" CSRF pour chaque session utilisateur active gérée par l'application. Ce jeton est utilisé pour vérifier que l'utilisateur authentifié est celui qui envoie les requêtes à l'application.

Chaque fois que vous définissez un formulaire HTML dans votre application, vous devez inclure un champ de jeton CSRF masqué dans le formulaire afin que le middleware de protection CSRF puisse valider la demande:

```tintin
<form method="POST" action="/upload">
  {{ csrf_field() }}
  ...
</form>
```

Le middleware `CsrfMiddleware`, qui est inclus dans le groupe de middleware Web, vérifie automatiquement que le jeton dans l'entrée de la requête correspond au jeton stocké dans la session.

### Jetons CSRF & JavaScript

Lors de la création d'applications pilotées par JavaScript, il est pratique que votre bibliothèque HTTP JavaScript associe automatiquement le jeton CSRF à chaque requête sortante.

Le middleware CSRF est automatiquement ajouté lors de l'exécution de chaque requête.

## X-CSRF-TOKEN

Outre la vérification du jeton CSRF en tant que paramètre POST, le middleware `CsrfMiddleware` vérifie également l’en-tête de demande X-CSRF-TOKEN. Vous pouvez, par exemple, stocker le jeton dans une balise META HTML:

```tintin
<meta name="csrf-token" content="{{ csrf_token() }}">
```

Ensuite, une fois que vous avez créé la balise `<meta>`, vous pouvez demander à une bibliothèque comme jQuery d'ajouter automatiquement le jeton à tous les en-têtes de requête. Cela fournit une protection CSRF simple et pratique pour vos applications basées sur AJAX:

```js
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
```

## X-XSRF-TOKEN

Bow stock le jéton CSRF actuel dans un cookie `XSRF-TOKEN` inclus dans chaque réponse générée par le Framework. Vous pouvez utiliser la valeur de cookie pour définir l'en-tête de demande `X-XSRF-TOKEN`.

Ce cookie est principalement envoyé par commodité, car certains Frameworks et bibliothèques JavaScript, comme Angular et Axios, placent automatiquement sa valeur dans l'en-tête X-XSRF-TOKEN.

> N'hésitez pas à donner votre avis sur la qualité de la documentation ou proposez des correctifs.
