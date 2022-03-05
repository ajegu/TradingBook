<?php

namespace Ajegu\TradingBook\Dashboard\Api\Provider;

use Ajegu\DdbAccess\DynamoDbAccess;
use Illuminate\Support\ServiceProvider;

class DdbAccessServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->when(DynamoDbAccess::class)
            ->needs('$tableName')
            ->give(getenv('AWS_DDB_TABLE_NAME'));

        $this->app->when(DynamoDbAccess::class)
            ->needs('$partitionKeyName')
            ->give(getenv('AWS_DDB_PARTITION_KEY_NAME'));
    }
}
