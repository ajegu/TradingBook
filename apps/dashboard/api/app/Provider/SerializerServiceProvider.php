<?php

namespace Ajegu\TradingBook\Dashboard\Api\Provider;

use Illuminate\Support\ServiceProvider;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class SerializerServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(Serializer::class, function() {
            $encoders = [new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];

            return new Serializer($normalizers, $encoders);
        });
    }
}
