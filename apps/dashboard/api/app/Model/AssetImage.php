<?php

namespace Ajegu\TradingBook\Dashboard\Api\Model;

class AssetImage
{
    private ?string $thumb;
    private ?string $small;
    private ?string $large;

    /**
     * @return string|null
     */
    public function getThumb(): ?string
    {
        return $this->thumb;
    }

    /**
     * @param string|null $thumb
     */
    public function setThumb(?string $thumb): void
    {
        $this->thumb = $thumb;
    }

    /**
     * @return string|null
     */
    public function getSmall(): ?string
    {
        return $this->small;
    }

    /**
     * @param string|null $small
     */
    public function setSmall(?string $small): void
    {
        $this->small = $small;
    }

    /**
     * @return string|null
     */
    public function getLarge(): ?string
    {
        return $this->large;
    }

    /**
     * @param string|null $large
     */
    public function setLarge(?string $large): void
    {
        $this->large = $large;
    }


}
