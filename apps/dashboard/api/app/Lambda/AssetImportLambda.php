<?php

namespace Ajegu\TradingBook\Dashboard\Api\Lambda;

use Ajegu\DdbAccess\Exception\DDBAccessException;
use Ajegu\TradingBook\Dashboard\Api\Model\Asset;
use Ajegu\TradingBook\Dashboard\Api\Model\AssetImage;
use Ajegu\TradingBook\Dashboard\Api\Repository\AssetRepository;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use JsonException;
use Psr\Log\LoggerInterface;
use Symfony\Component\Serializer\Exception\ExceptionInterface;

class AssetImportLambda
{
    public function __construct(
        private AssetRepository $assetRepository,
        private LoggerInterface $logger,
        private string $coinGeckoApiUrl
    ) {}

    /**
     * @return void
     * @throws DDBAccessException
     * @throws GuzzleException
     * @throws JsonException
     * @throws ExceptionInterface
     */
    public function __invoke(): void
    {
        $client = new Client();
        $response = $client->get($this->coinGeckoApiUrl . 'coins/list');

        $responseBody = (string) $response->getBody();
        $rows = json_decode($responseBody, true, 512, JSON_THROW_ON_ERROR);

        foreach ($rows as $row) {

            $asset = new Asset();
            $asset->setName($row['name']);
            $asset->setSymbol($row['symbol']);
            $asset->setExternalReference($row['id']);

            $this->assetRepository->save($asset);
        }

        $this->logger->info(count($rows) . ' assets saved!');
    }
}
