# Controlleur

Les controlleurs sont les moins simples de simplifier l'organisation de vos projet.

## Instroduction

Au lieu de définir toute la logique de gestion des demandes en tant que fermetures dans les fichiers de routage, vous pouvez organiser ce comportement à l'aide de classes de contrôleur. Les contrôleurs peuvent regrouper la logique de traitement des demandes associée en une seule classe. Les contrôleurs sont stockés dans le répertoire `app/Controllers`.

## Controlleur basic

### Definir un controlleur

Voici un exemple de classe de contrôleur de base. Notez que le contrôleur étend la classe de contrôleur de base incluse avec Bow. La classe de base fournit quelques méthodes pratiques telles que la méthode du middleware, qui peut être utilisée pour attacher un middleware aux actions du contrôleur.

```
namespace App\Controllers;

use App\User;
use App\Controllers\Controller;
class UserController extends Controller
{
	/**
	 * Show the profile for the given user.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
	    return view('user/profile', ['user' => User::findOrFail($id)]);
	}
}
```

Vous pouvez définir une route vers cette action de contrôleur comme suit:

	$app->get('user/:id', 'UserController@show');

Désormais, lorsqu'une demande correspond à l'URI de la route spécifiée, la méthode `show` de la classe `UserController` sera exécutée. Bien entendu, les paramètres de l'itinéraire seront également transmis à la méthode.

Vous pouvez générer un contrôleur en utilisant la commande `add:controller` de `php bow`:

	php bow add:controller UserController

### Contrôleurs et espaces de noms

Il est très important de noter que nous n’avons pas eu besoin de spécifier l’espace de noms du contrôleur complet lors de la définition de la route du contrôleur. Étant donné que RouteServiceProvider charge vos fichiers de route dans un groupe de routage contenant l'espace de noms, nous avons uniquement spécifié la partie du nom de classe qui vient après la partie `App\Controllers` de l'espace de noms.

Si vous choisissez d'imbriquer vos contrôleurs plus profondément dans le répertoire `App\Controllers`, utilisez le nom de classe spécifique relatif à l'espace de noms racine `App\Controllers`. Donc, si votre classe de contrôleur complète est `App\Controllers\Photos\AdminController`, vous devez enregistrer les routes sur le contrôleur comme suit:

	$app->get('/foo', 'Photos\AdminController@method');

Vous pouvez générer un contrôleur en utilisant la commande `add:controller` de `php bow`:

	php bow add:controller Photos/AdminController

### Contrôleur et Middleware

Le middleware peut être assigné aux routes du contrôleur dans vos fichiers de route:

	$app->get('profile', 'UserController@show')->middleware('auth');

Cependant, il est plus pratique de spécifier le middleware dans le constructeur de votre contrôleur. En utilisant la méthode middleware du constructeur de votre contrôleur, vous pouvez facilement attribuer un middleware à l'action du contrôleur. Vous pouvez même limiter le middleware à certaines méthodes de la classe du contrôleur:

	class UserController extends Controller
	{
	  /**
	   * Instantiate a new controller instance.
	   *
	   * @return void
	   */
	  public function __construct()
	  {
	    $this->middleware('auth');
	  }
	}