<?php

use Doctum\Doctum;
use Doctum\RemoteRepository\GitHubRemoteRepository;
use Doctum\Version\GitVersionCollection;
use Symfony\Component\Finder\Finder;

$dir = __DIR__ . '/../../framework/src';
$iterator = Finder::create()
    ->files()
    ->name('*.php')
    ->exclude('*.stub')
    ->exclude('tests')
    ->in($dir);

$versions = GitVersionCollection::create($dir)
    ->addFromTags('v4.3.*')
    ->add('4.0', '4.0 branch')
    ->add("master", "Dev Branch");

return new Doctum($iterator, [
    'versions'             => "master",
    'title'                => 'Bow Framework',
    'language'             => 'en', // Could be 'fr'
    'build_dir'            => __DIR__ . '/build/%version%',
    'cache_dir'            => __DIR__ . '/cache/%version%',
    'source_dir'           => dirname($dir) . '/',
    'remote_repository'    => new GitHubRemoteRepository('bowphp/framework', dirname($dir)),
    'default_opened_level' => 2,
]);