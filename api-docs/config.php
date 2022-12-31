<?php

use Doctum\Doctum;
use Doctum\RemoteRepository\GitHubRemoteRepository;
use Doctum\Version\GitVersionCollection;
use Symfony\Component\Finder\Finder;

$directory = sys_get_temp_dir() . '/framework/src';

$iterator = Finder::create()
    ->files()
    ->name('*.php')
    ->exclude('*.stub')
    ->exclude('tests')
    ->in($directory);

$versions = GitVersionCollection::create($directory)
    ->addFromTags('v4.4.*')
    ->add('4.0', '4.0')
    ->add('5.0', '5.0')
    ->add("master", "Master");

return new Doctum($iterator, [
    'versions'             => $versions,
    'title'                => 'Bow Framework',
    'language'             => 'fr', // Could be 'fr'
    'build_dir'            => __DIR__ . '/../build/api/%version%',
    'cache_dir'            => sys_get_temp_dir() . '/bow_api_buid_cache/api/%version%',
    'source_dir'           => dirname($directory) . '/',
    'remote_repository'    => new GitHubRemoteRepository('bowphp/framework', dirname($directory)),
    'default_opened_level' => 2,
]);
