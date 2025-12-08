import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SponsorsFeatures from '@site/src/components/SponsorsFeatures';
import styles from './index.module.css';
import TeamFeatures from '../components/TeamFeatures';
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className="text--center">
            <div className={styles.logoWrapper}>
              <img 
                src={siteConfig.favicon} 
                alt={`${siteConfig.title} logo`}
                title={siteConfig.title}
                loading="eager"
              />
            </div>
            <h1 className={clsx("hero__title", styles.heroTitle)}>
              {siteConfig.title}
            </h1>
            <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>
            <div 
              className={styles.heroDescription}
              dangerouslySetInnerHTML={{
                __html: siteConfig.customFields.landingText,
              }}
            />
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/installation">
                Démarrer →
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                to="/blog/televersement-de-fichiers-avec-bowphp"
                style={{ fontWeight: 700 }}>
                📝 Téléversement de fichiers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function CodeSnippetSection() {
  return (
    <section className={styles.codeSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className="text--center margin-bottom--lg">
              Simple, Élégant, Puissant
            </h2>
            <p className="text--center margin-bottom--xl" style={{ fontSize: '1.125rem', color: 'var(--ifm-color-emphasis-700)' }}>
              Découvrez la simplicité de BowPHP avec des exemples de code concrets
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col col--12">
            <Tabs groupId="code-examples" className={styles.codeTabs}>
              <TabItem value="routes" label="🛣️ Routes" default>
                <CodeBlock language="php" title="routes/app.php">
{`$app->get('/hello/{name}', function($name) {
  return "Hello, $name!";
});

$app->post('/users', [UserController::class, 'store']);

$app->group(['prefix' => 'api'], function() use ($app) {
  $app->get('/posts', [PostController::class, 'index']);
  $app->put('/posts/{id}', [PostController::class, 'update']);
  $app->delete('/posts/{id}', [PostController::class, 'destroy']);
});`}
                </CodeBlock>
              </TabItem>
              
              <TabItem value="controller" label="🎮 Contrôleur">
                <CodeBlock language="php" title="app/Controllers/UserController.php">
{`namespace App\\Controllers;

use Bow\\Http\\Request;
use Bow\\Http\\Response;
use App\\Models\\User;

class UserController
{
  public function store(Request $request): Response
  {
    $request->validate([
      'email' => 'required|email|unique:users',
      'name' => 'required|min:3|max:255',
      'password' => 'required|min:8'
    ]);

    $user = User::create([
      'name' => $request->get('name'),
      'email' => $request->get('email'),
      'password' => password_hash($request->get('password'), PASSWORD_DEFAULT)
    ]);

    return response()->json([
      'message' => 'Utilisateur créé avec succès',
      'user' => $user
    ], 201);
  }
}`}
                </CodeBlock>
              </TabItem>
              
              <TabItem value="database" label="💾 Base de données">
                <CodeBlock language="php" title="app/Models/User.php">
{`namespace App\\Models;

use Bow\\Database\\Barry\\Model;

class User extends Model
{
  protected $fillable = ['name', 'email', 'password'];
  protected $hidden = ['password'];
}

// Utilisation dans un contrôleur
$users = User::where('active', true)
  ->orderBy('created_at', 'desc')
  ->limit(10)
  ->get();

$user = User::find(1);
$user->update(['name' => 'John Doe']);

// Relations
$user->posts()->where('published', true)->get();`}
                </CodeBlock>
              </TabItem>
              
              <TabItem value="middleware" label="🔒 Middleware">
                <CodeBlock language="php" title="app/Middleware/AuthMiddleware.php">
{`namespace App\\Middleware;

use Bow\\Http\\Request;

class AuthMiddleware
{
  public function handle(Request $request, callable $next)
  {
    if (!auth()->check()) {
      if ($request->wantsJson()) {
        return response()->json([
          'message' => 'Non authentifié'
        ], 401);
      }
      
      return redirect('/login')
        ->withFlash('error', 'Veuillez vous connecter');
    }

    return $next($request);
  }
}

// Application dans routes/app.php
$app->group(['middleware' => ['auth']], function() use ($app) {
  $app->get('/dashboard', [DashboardController::class, 'index']);
  $app->get('/profile', [ProfileController::class, 'show']);
});`}
                </CodeBlock>
              </TabItem>
              
              <TabItem value="validation" label="✅ Validation">
                <CodeBlock language="php" title="Validation des données">
{`// Validation simple
$request->validate([
  'email' => 'required|email',
  'age' => 'required|numeric|min:18',
  'website' => 'url'
]);

// Validation personnalisée
$validator = validator($request->all(), [
  'username' => 'required|alpha_dash|min:3|max:20',
  'password' => 'required|min:8|confirmed',
  'terms' => 'accepted'
]);

if ($validator->fails()) {
  return response()->json([
    'errors' => $validator->errors()
  ], 422);
}

// Règles disponibles: required, email, numeric, min, max, 
// alpha, alpha_dash, url, ip, date, unique, exists, etc.`}
                </CodeBlock>
              </TabItem>
              
              <TabItem value="response" label="📤 Réponses">
                <CodeBlock language="php" title="Types de réponses">
{`// JSON
return response()->json(['message' => 'Success'], 200);

// Vue
return view('welcome', ['name' => 'John']);

// Redirection
return redirect('/dashboard')
  ->withFlash('success', 'Opération réussie');

// Téléchargement
return response()->download('/path/to/file.pdf');

// Fichier
return response()->file('/path/to/image.jpg');

// Réponse personnalisée
return response('Contenu', 200)
  ->header('Content-Type', 'text/plain')
  ->cookie('name', 'value', 3600);`}
                </CodeBlock>
              </TabItem>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader/>
      <main>
        <SponsorsFeatures />
        <CodeSnippetSection />
        <HomepageFeatures />
        <TeamFeatures />
      </main>
    </Layout>
  );
}
