---
id: policier
title: 🔐 Policier JWT Auth
---

- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
  - [Mise à jour ou Récupération de la configuration](#mise-à-jour-ou-récupération-de-la-configuration)
    - [Mise à jour de la Configuration](#mise-à-jour-de-la-configuration)
    - [Récupération de la Configuration](#récupération-de-la-configuration)
  - [Encoder un Token](#encoder-un-token)
  - [Décoder un Token](#décoder-un-token)
  - [Transformer un Token](#transformer-un-token)
  - [Vérifier un Token](#vérifier-un-token)
  - [Valider un Token](#valider-un-token)
- [Bow Framework et Policier](#bow-framework-et-policier)
  - [Personnalisation du Middleware](#personnalisation-du-middleware)
    - [Publier le middleware](#publier-le-middleware)

## Installation

Policier permet de valider la demande via [JWT](https://jwt.io)

Pour installer la stratégie d'installation, vous devez utiliser `composer` (gestionnaire de paquets PHP) comme ceci.

```bash
composer require bowphp/policier
```

## Configuration

Vous pouvez regarder toutes les options de configuration ici.

```php
return [
  /**
   * Heure d'expiration du token
   */
  "exp" => 3600,

  /**
   * Le token est utilisable après cette heure
   */
  "nbf" => 60,

  /**
   * Le token était émis
   */
  "iat" => 60,

  /**
   * Configure l'émetteur
   */
  "iss" => "localhost",

  /**
   * Configure le public
   */
  "aud" => "localhost",

  /**
   * Algorithme de hachage utilisé
   *
   * HS256, HS384, HS512, RS256, RS384, RS512, ES256, ES384, ES512,
   */
  "alg" => "HS512",

  /**
   * Votre Signature, ce champs est obligatoire pour les autres type de hachage sauf RSA
   */
  'signkey' => null,

  /**
   * Signature en utilisant votre RSA, ce chargera automatique si la clé de hashage est de type RSA
   */
  "keychain" => [
    /**
     * Chemin vers votre clé privée
     */
    "private" => null,

    /**
     * Chemin vers votre clé publique
     */
    "public" => null
  ]
];
```

## Utilisation

Policier est très simple d'utilisation et possède une API claire. La configuration retourne une singleton.

```php
use Policier\Policier;

$configure = require "/path/to/config/file.php";

$policier = Policier::configure($configure);
```

Vous pouvez aussi faire comme ceci:

```php
use Policier\Policier;

$configure = require "/path/to/config/file.php";

Policier::configure($configure);

$policier = Policier::getInstance();
```

Après la configuration, vous pouvez utiliser le helper `policier`:

```php
policier($action, ...$args);
```

La valeur d'action doit être l'une de ces valeurs: `encode`, `decode`, `parse`, `verify`, `validate`.

### Mise à jour ou Récupération de la configuration

#### Mise à jour de la Configuration

Vous pouvez mettre à jour la configuration de base avec la méthode `setConfig`:

```php
$policier->setConfig('exp', time() + 72000);
```

#### Récupération de la Configuration

Vous pouvez également obtenir les informations de configuration avec la méthode `getConfig`:

```php
$policier->getConfig('exp');
```

### Encoder un Token

Encoder rapidement un token:

```php
$id = uniqid();

$claims = [
  "name" => "Franck",
  "nickname" => "papac",
  "logged" => true
];

$token = $policier->encode($id, $claims);

$token->expireIn(); // Expired In
$token->getToken(); // Token value

echo $token;
//=> eyJ0eX...OiJKV1.eyJpc3Mi...OiJsb2.l7v0bS0r...qnK1IeR
```

`$token` est une instance de `Policier\Token` et implémente la méthode magique `__toString`. Vous pouvez obtenir l'heure d'expiration avec `expiredIn` et `getToken` pour prendre la valeur du token.

Via l'assistant:

```php
policier('encode', $id, $claims);
```

### Décoder un Token

Même chose pour le décodage de token:

```php
$result = $policier->decode($token);
$result['headers'];

echo $result['claims']['name'];
//=> Franck
```

Via l'assistant:

```php
policier('decode', $token);
```

### Transformer un Token

```php
$token = $policier->parse($token);

$token->hasHeader("old") // Vérifier si l'en-tête existe
$token->getHeader("alg", $default = null); // Obtenez un en-tête
$token->getHeaders(); // Obtenir tous les en-têtes

$token->hasClaim("name") // Vérifier si la réclamation existe
$token->getClaim("name", $default = null); // Obtenez une réclamation
$token->getClaims(); // Obtenez toutes les réclamations

$token->isExpired(); // Vérifier si le token a expiré

echo $token->getClaim("name");
//=> Franck
```

Via l'assistant:

```php
policier('parse', $token);
```

### Vérifier un Token

Vérifier si le jeton est valide avec tous les attributs JWT.

```php
$verified = $policier->verify($token);

if ($verified) {
  echo "Token est valide";
} else {
  echo "Token n'est pas valide";
}
```

Via l'assistant:

```php
policier('verify', $token);
```

### Valider un Token

Validez le jeton avec les informations de réclamation et les informations `exp`.

```php
$claims = [
  "name" => "Franck",
  "nickname" => "papac",
  "logged" => true
];

$validated = $policier->validate($token, $claims);

if ($validated) {
  echo "Les informations sont valides";
} else {
  echo "Les informations ne sont pas valides";
}
```

Via l'assistant:

```php
$claims = [
  "name" => "Franck",
  "nickname" => "papac",
  "logged" => true
];

policier('validate', $token, $claims);
```

## Bow Framework et Policier

Si vous utilisez [Bow Framework](https://github.com/bowphp/app), vous pouvez utiliser le plugin de configuration `Policier\Bow\PolicierConfiguration::class` et le middleware `Policier\Bow\PolicierMiddleware::class`.

Relier la configuration sur `app\Kernel\Loader.php`:

```php
public function middlewares()
{
  return [
    ...
    'policier' => \Policier\Bow\PolicierMiddleware::class,
    ...
  ];
}

public function configurations()
{
  return [
    ...
    \Policier\Bow\PolicierConfiguration::class,
    ...
  ];
}
```

Utilisez le middleware:

```php
$app->get('/api', function () {
  $token  = policier()->getToken();
})->middleware('policier');
```

Le token a été analysé dans l'instance de Policier dans le processus middleware via la méthode `plug`. Après l'exécution du middleware, vous pouvez:

- Obtenez le token avec `getToken`
- [Décoder](#decode-token) le token avec `getDecodeToken`
- [Analyser](#parse-token) le token avec `getParsedToken`

### Personnalisation du Middleware

Notez que vous pouvez créer un autre middleware qui étendra le middleware par defaut `Policier\Bow\PolicierMiddleware::class`. Ce qui vous donne la possibilité de changer les messages d'erreur en surchargant les methodes `getUnauthorizedMessage`, `getExpirateMessage`, `getExpirateCode` et `getUnauthorizedCode`.

```bash
php bow add:middleware CustomPolicierMiddleware
```

Et ensuite vous pouvez faire ceci:

```php

use Bow\Http\Request;
use Policier\Bow\PolicierMiddleware;

class CustomPolicierMiddleware extends PolicierMiddleware
{
  /**
   * Obtenir le message d'erreur
   *
   * @return array
   */
  public function getUnauthorizedMessage()
  {
    return [
      'message' => 'unauthorized',
      'error' => true
    ];
  }

  /**
   * Obtenir le message d'expiration du token
   *
   * @return array
   */
  public function getExpirationMessage()
  {
    return [
      'message' => 'token is expired',
      'expired' => true,
      'error' => true
    ];
  }

  /**
   * Obtenir le code de réponse non autorisé
   *
   * @return int
   */
  public function getUnauthorizedStatusCode()
  {
    return 403;
  }

  /**
   * Obtenir le code de réponse
   *
   * @return int
   */
  public function getExpirationStatusCode()
  {
    return 403;
  }
}
```

#### Publier le middleware

Pour publier le middleware personnalisé et écraser celui par defaut de Policier c'est très simple, il suffit seulement d'ajouter le middleware dans le fichier `app/Kernel/Loader.php` avec la clé `api`.

```php
public function middlewares()
{
  return [
    ...
    'policier' => \App\Middleware\CustomPolicierMiddleware::class,
    ...
  ];
}
```

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
