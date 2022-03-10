<?php

namespace Ajegu\TradingBook\Dashboard\Api\Provider;

use Ajegu\TradingBook\Dashboard\Api\Service\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->when(AuthService::class)
            ->needs('$cognitoJwksUrl')
            ->give(
                sprintf(
                    'https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json',
                    getenv('AWS_REGION'),
                    getenv('AWS_COGNITO_USER_POOL_ID')
                )
            );
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot(AuthService $authService)
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function (Request $request) use ($authService) {
            return $authService->verify($request->bearerToken());
        });
    }
}
