<?php

namespace Ajegu\TradingBook\Dashboard\Api\Repository;

use Ajegu\DdbAccess\DDBAccess;
use Ajegu\DdbAccess\Exception\DDBAccessException;
use Ajegu\DdbAccess\Model\Query;
use Ajegu\TradingBook\Dashboard\Api\Model\Asset;
use Ajegu\TradingBook\Dashboard\Api\Model\AssetList;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Serializer;

class AssetRepository
{
    const PARTITION_KEY = 'asset';

    /**
     * @param DDBAccess $dbAccess
     * @param Serializer $serializer
     */
    public function __construct(
        private DDBAccess $dbAccess,
        private Serializer $serializer
    ) {}

    /**
     * @param string|null $cursor
     * @param int|null $pageSize
     * @return AssetList
     * @throws DDBAccessException
     * @throws ExceptionInterface
     */
    public function findAll(
        ?string $cursor,
        ?int $pageSize,
    ): AssetList {

        $query = new Query();
        $query->setPartitionKeyValue(self::PARTITION_KEY);
        $query->setPageSize($pageSize);
        $query->setCursor($cursor);

        $result = $this->dbAccess->findAll($query);

        $assets = array_map(function(array $item) {
            return $this->serializer->denormalize($item, Asset::class);
        }, $result->getData());

        return new AssetList($assets, $result->getCursor());
    }
}
