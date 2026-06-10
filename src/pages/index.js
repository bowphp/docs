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
import Translate, { translate } from "@docusaurus/Translate";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className="text--center">
            <h1 className={clsx("hero__title", styles.heroTitle)}>
              {siteConfig.title}
            </h1>
            <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>
            <div
              className={styles.heroDescription}
              dangerouslySetInnerHTML={{
                __html: translate({
                  id: "home.hero.landingText",
                  message:
                    "BowPHP was designed from the ground up to be easy to install and use, getting your application up and running quickly, and is trusted by <strong>+2500</strong> developers",
                  description: "The hero landing description on the homepage",
                }),
              }}
            />
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/installation"
              >
                <Translate id="home.hero.getStarted">Get started →</Translate>
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                to="/blog/file-uploading-with-bowphp"
                style={{ fontWeight: 700 }}
              >
                <Translate id="home.hero.fileUpload">File uploading</Translate>
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
              <Translate id="home.code.title">
                Simple, Elegant, Powerful
              </Translate>
            </h2>
            <p
              className="text--center margin-bottom--xl"
              style={{
                fontSize: "1.125rem",
                color: "var(--ifm-color-emphasis-700)",
              }}
            >
              <Translate id="home.code.subtitle">
                Discover the simplicity of BowPHP with concrete code examples
              </Translate>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col col--12">
            <Tabs groupId="code-examples" className={styles.codeTabs}>
              <TabItem
                value="routes"
                label={translate({ id: "home.tab.routes", message: "Routes" })}
                default
              >
                <CodeBlock language="php" title="routes/app.php">
                  {`$app->get('/hello/{name}', function($name) {
  return "Hello, $name!";
});

$app->post('/users', [UserController::class, 'store']);

$app->prefix('api', function() use ($app) {
  $app->get('/posts', [PostController::class, 'index']);
  $app->put('/posts/{id}', [PostController::class, 'update']);
  $app->delete('/posts/{id}', [PostController::class, 'destroy']);
});`}
                </CodeBlock>
              </TabItem>

              <TabItem
                value="controller"
                label={translate({
                  id: "home.tab.controller",
                  message: "Controller",
                })}
              >
                <CodeBlock
                  language="php"
                  title="app/Controllers/UserController.php"
                >
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

    $user->persist();

    return response()->json($user, 201);
  }
}`}
                </CodeBlock>
              </TabItem>

              <TabItem
                value="database"
                label={translate({
                  id: "home.tab.database",
                  message: "Database",
                })}
              >
                <CodeBlock language="php" title="app/Models/User.php">
                  {`namespace App\\Models;

use Bow\\Database\\Barry\\Model;

class User extends Model
{
  protected $hidden = ['password'];
}

// Utilisation dans un contrôleur
$users = User::where('active', true)
  ->orderBy('created_at', 'desc')
  ->take(10)
  ->get();

$user = User::find(1);
$user->update(['name' => 'John Doe']);

// Relations
$user->posts()->where('published', true)->get();`}
                </CodeBlock>
              </TabItem>

              <TabItem
                value="middleware"
                label={translate({
                  id: "home.tab.middleware",
                  message: "Middleware",
                })}
              >
                <CodeBlock
                  language="php"
                  title="app/Middleware/AuthMiddleware.php"
                >
                  {`namespace App\\Middleware;

use Bow\\Http\\Request;

class AuthMiddleware
{
  public function process(Request $request, callable $next)
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
$router->middleware('auth')->prefix('/', function() use ($router) {
  $router->get('/dashboard', [DashboardController::class, 'index']);
  $router->get('/profile', [ProfileController::class, 'show']);
});`}
                </CodeBlock>
              </TabItem>

              <TabItem
                value="validation"
                label={translate({
                  id: "home.tab.validation",
                  message: "Validation",
                })}
              >
                <CodeBlock
                  language="php"
                  title={translate({
                    id: "home.code.validationTitle",
                    message: "Data validation",
                  })}
                >
                  {`// Validation simple
$request->validate([
  'email' => 'required|email',
  'age' => 'required|numeric|min:18',
  'website' => 'url'
]);

// Validation personnalisée
$validation = validator($request->all(), [
  'username' => 'required|alpha_dash|min:3|max:20',
  'password' => 'required|min:8|confirmed',
  'terms' => 'accepted'
]);

if ($validation->fails()) {
  return response()->json([
    'errors' => $validation->getErrors()
  ], 422);
}

// Règles disponibles: required, email, numeric, min, max, 
// alpha, alpha_dash, url, ip, date, unique, exists, etc.`}
                </CodeBlock>
              </TabItem>

              <TabItem
                value="response"
                label={translate({
                  id: "home.tab.response",
                  message: "Responses",
                })}
              >
                <CodeBlock
                  language="php"
                  title={translate({
                    id: "home.code.responseTitle",
                    message: "Response types",
                  })}
                >
                  {`// JSON
return response()->json(['message' => 'Success'], 200);

// Vue
return view('welcome', ['name' => 'John']);

// Redirection
return redirect('/dashboard')
  ->withFlash('success', 'Opération réussie');

// Téléchargement
return response()->download('/path/to/file.pdf');

// Réponse personnalisée
return response('Contenu', 200)
  ->withHeader('Content-Type', 'text/plain')
  ->withCookie('name', 'value', 3600);`}
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
