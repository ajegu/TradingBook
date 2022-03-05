<?php

namespace Ajegu\TradingBook\Dashboard\Api\Provider;

use Aws\DynamoDb\DynamoDbClient;
use Aws\Sdk;
use Illuminate\Support\ServiceProvider;

class AwsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $awsSdk = new Sdk([
            'version' => 'latest',
            'region' => getenv('AWS_REGION')
        ]);

        $this->app->singleton(DynamoDbClient::class, fn() => $awsSdk->createDynamoDb());
    }
}
