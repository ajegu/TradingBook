<?php

namespace Ajegu\TradingBook\Dashboard\Api\Model;

use Ajegu\DdbAccess\Contract\CursorInterface;

class AssetList
{
    use CursorTrait;

    public function __construct(
        private array $assets,
        ?CursorInterface $cursor,
    ){
        $this->setCursor($cursor);
    }

    /**
     * @return array
     */
    public function getAssets(): array
    {
        return $this->assets;
    }


}
