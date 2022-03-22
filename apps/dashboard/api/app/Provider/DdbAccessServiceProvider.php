<?php

namespace Ajegu\TradingBook\Dashboard\Api\Provider;

use Ajegu\DdbAccess\Contract\DDBAccessInterface;
use Ajegu\DdbAccess\Contract\TableDefinitionInterface;
use Ajegu\DdbAccess\DDBAccess;
use Ajegu\DdbAccess\Model\TableDefinition;
use Illuminate\Support\ServiceProvider;

class DdbAccessServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $tableDefinition = new TableDefinition(
            getenv('AWS_DDB_TABLE_NAME'),
            getenv('AWS_DDB_PARTITION_KEY_NAME'),
            getenv('AWS_DDB_SORT_KEY_NAME') ?? null,
            []
        );

        $this->app->singleton(TableDefinitionInterface::class, fn() => $tableDefinition);

//        $this->app->when(DDBAccess::class)
//            ->needs('$tableDefinition')
//            ->give(fn() => $tableDefinition);
    }
}
