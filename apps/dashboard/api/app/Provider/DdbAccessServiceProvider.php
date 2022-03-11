<?php

namespace Ajegu\TradingBook\Dashboard\Api\Provider;

use Ajegu\DdbAccess\DDBAccess;
use Ajegu\DdbAccess\Service\CursorService;
use Illuminate\Support\ServiceProvider;

class DdbAccessServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->when(DDBAccess::class)
            ->needs('$tableName')
            ->give(getenv('AWS_DDB_TABLE_NAME'));

        $this->app->when(DDBAccess::class)
            ->needs('$partitionKeyName')
            ->give(getenv('AWS_DDB_PARTITION_KEY_NAME'));

        $this->app->when(DDBAccess::class)
            ->needs('$sortKeyName')
            ->give(getenv('AWS_DDB_SORT_KEY_NAME'));

        $this->app->when(CursorService::class)
            ->needs('$partitionKeyName')
            ->give(getenv('AWS_DDB_PARTITION_KEY_NAME'));

        $this->app->when(CursorService::class)
            ->needs('$sortKeyName')
            ->give(getenv('AWS_DDB_SORT_KEY_NAME'));
    }
}
