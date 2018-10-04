# HTTP Request

## Introduction

Une requete HTTP c'est le message que l'utilisateur envoie à l'application Bow via son navigateur et outil telque `curl` et autre.

Ce message est traite par Bow via la classe [`Bow\Http\Request`](https://bowphp.github.com/api/master/Bow/Http/Request.html). Cette classe vous permet d'avoir les informations sur le message envoie par l'utilisateur comme son adresse ip, le type du message, les information d'un formulaire etc...

## Utilisation

Pour capturer un message HTTP, vous pouvez premièrement utiliser le helper `request()` qui vous donne une instance de `Bow\Http\Request`, deuxièmement passer par l'injecteur de dépendance via un action de controleur.

- Avec le helper `request`:

```php
$app->get('/', function()
{
  $request = request();

  return $request->get('name');
  //
});
```

- Par l'injecteur de dépandance

```php
$app->get('/', function(Bow\Http\Request $request)
{
  return $request->get('name');
});
``