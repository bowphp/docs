---
id: http-upload
title: Upload File
---

# Traiter les fichiers uploader

Souvent les requêtes sont associés à des fichiers envoyés par l'utilisateur, vous pouvez traiter ces fichiers sur [`Bow\Http\Request`](https://bowphp.com/api/master/Bow/Http/Request.html) les méthodes `file` et le helper du même nom.

Considérons le formulaire suivant:

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="photo" accept="image/png"><br/>
  <button type="submit">Uploader</button>
</form>
```

> Comment avoir accès au fichier envoyé ?

Ici nous pouvons utiliser la méthode `file` qui retourne `null` ou une instance de [`Bow\Http\UploadFile`](https://bowphp.com/api/master/Bow/Http/UploadFile.html).

```php
use Bow\Http\Request;

$app->post('/upload', function(Request $request) {
  $file = $request->file('photo');
  // ou
  $file = file('photo');

  debug($file);
});
```

```php
// Debug output
UploadFile {#92 ▼
  -file: array:5 [▼
    "name" => "23270116.png"
    "type" => "image/png"
    "tmp_name" => "/tmp/phpellwCx"
    "error" => 0
    "size" => 7388
  ]
}
```

## Determiner si un fichier existe

Vous pouvez déterminer si un fichier est présent sur la requête en utilisant la méthode `hasFile`:

```php
if ($request->hasFile('photo')) {
  //
}
```

## Validation des téléchargements réussis

Vous pouvez vérifier qu'il n'y a pas eu de problèmes lors du téléchargement avec la méthode `isUploaded`:

```php
$file = $request->file('photo');

if ($file->isUploaded()) {
  // Code ici
}
```

## Savegarder le fichier

Cela consiste juste à déplacer le fichier uploader dans une autre dossier et ceci grace à la méthode `moveTo`.

```php
$file = $request->file('photo');

$file->moveTo("/path/to/your/store/directory", $filename = null);
```

Si `$filename` est `null`, sa valeur sera le nom du fichier hasher avec la méthode [`getHashName`](https://bowphp.com/api/master/Bow/Http/UploadFile.html#method_getHashName).

Souvent dans le cas où vous attendez des fichiers envoyé via un formulaire dont le champs est sous la forme `photo[]`. la méthode `file` retourne une [`Bow\Support\Collection`](https://bowphp.com/api/master/Bow/Support/Collection.html):

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <label>Fichier 1: <input type="file" name="photo[]" accept="image/png"></label><br/>
  <label>Fichier 2: <input type="file" name="photo[]" accept="image/png"></label><br/>
  <button type="submit">Uploader</button>
</form>
```

Dans cette exemple, la méthode `file` retournera une [`Bow\Support\Collection`](https://bowphp.com/api/master/Bow/Support/Collection.html) qui contiendra pour chaque oruccencre une instance de [`Bow\Http\UploadFile`](https://bowphp.com/api/master/Bow/Http/UploadFile.html).

```php
use Bow\Http\Request;
use Bow\Http\UploadFile;

$app->get('/upload', function (Request $request)
{
  $files = $request->file('photo');

  if (!$files->isEmpty()) {
    $files->each(function(UploadFile $file) {
      $file->moveTo("/path/to/your/store/directory");
    });
  }
});
```

## Il manque quelque chose ?

Si vous rencontrez des problèmes avec la documentation ou si vous avez des suggestions pour améliorer la documentation ou le projet en général, veuillez déposer une issue pour nous, ou envoyer un tweet mentionnant le compte Twitter @BowFramework ou sur directement sur le [github](https://github.com/bowphp/docs/issues).
