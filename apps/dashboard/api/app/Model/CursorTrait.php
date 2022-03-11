<?php

namespace Ajegu\TradingBook\Dashboard\Api\Model;

use Ajegu\DdbAccess\Contract\CursorInterface;

trait CursorTrait
{
    private ?CursorInterface $cursor;

    /**
     * @return CursorInterface|null
     */
    public function getCursor(): ?CursorInterface
    {
        return $this->cursor;
    }

    /**
     * @param CursorInterface|null $cursor
     */
    public function setCursor(?CursorInterface $cursor): void
    {
        $this->cursor = $cursor;
    }

}
