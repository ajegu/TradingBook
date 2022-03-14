<?php
/** @var Application $app */

use Ajegu\TradingBook\Dashboard\Api\Lambda\AssetImportLambda;
use Laravel\Lumen\Application;

return function () {
    $app = require __DIR__.'/../bootstrap/app.php';

    $app->when(AssetImportLambda::class)
        ->needs('$coinGeckoApiUrl')
        ->give(getenv('COIN_GECKO_API_URL'));

    return $app->make(AssetImportLambda::class);
};
