<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$routes = function() use ($router) {

    /**
     * health check
     */
    $router->get('/', function () use ($router) {
        return $router->app->version();
    });

    /**
     * Wallet routes
     */
    $router->get('/wallet', [
        'uses' => 'WalletController@list'
    ]);
};

$router->group([
    'prefix' => getenv('URL_PREFIX') ?? '',
], $routes);
