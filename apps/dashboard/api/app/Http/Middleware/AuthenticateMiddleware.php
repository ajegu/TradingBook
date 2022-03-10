<?php
namespace Ajegu\TradingBook\Dashboard\Api\Http\Middleware;

use Illuminate\Contracts\Auth\Factory;
use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Http\Request;

class AuthenticateMiddleware
{
    /**
     * The authentication guard factory instance.
     *
     * @var Factory
     */
    protected Auth $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string|null $guard
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $guard = null): mixed
    {
        if ($this->auth->guard($guard)->guest()) {
            return response('Unauthorized.', 401);
        }

        return $next($request);
    }
}
