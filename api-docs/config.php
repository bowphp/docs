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
    ->add('3.x', '3.x')
    ->add('4.x', '4.x')
    ->add('5.x', '5.x')
    ->add("master", "dev");

return new Doctum($iterator, [
    'versions'             => $versions,
    'title'                => 'Bow Framework',
    'build_dir'            => __DIR__ . '/../build/api/%version%',
    'cache_dir'            => sys_get_temp_dir() . '/bow_api_buid_cache/api/%version%',
    'source_dir'           => dirname($directory) . '/',
    'remote_repository'    => new GitHubRemoteRepository('bowphp/framework', dirname($directory)),
    'default_opened_level' => 2,
]);
