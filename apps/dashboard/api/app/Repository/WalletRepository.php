<?php

namespace Ajegu\TradingBook\Dashboard\Api\Repository;

use Ajegu\DdbAccess\DynamoDbAccess;
use Ajegu\DdbAccess\Exception\DynamoDbErrorException;
use Ajegu\DdbAccess\Exception\MarshalerErrorException;

class WalletRepository
{
    /**
     * @param DynamoDbAccess $dbAccess
     */
    public function __construct(
        private DynamoDbAccess $dbAccess
    ) {}

    /**
     * @return array
     * @throws DynamoDbErrorException
     * @throws MarshalerErrorException
     */
    public function findAll(): array
    {
        return $this->dbAccess->findAll('wallet');
    }
}
