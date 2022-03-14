<?php

namespace Ajegu\TradingBook\Dashboard\Api\Model;

class Asset
{
    private string $name;
    private string $symbol;
    private string $externalReference;
    private AssetImage $image;

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getSymbol(): string
    {
        return $this->symbol;
    }

    /**
     * @param string $symbol
     */
    public function setSymbol(string $symbol): void
    {
        $this->symbol = $symbol;
    }

    /**
     * @return string
     */
    public function getExternalReference(): string
    {
        return $this->externalReference;
    }

    /**
     * @param string $externalReference
     */
    public function setExternalReference(string $externalReference): void
    {
        $this->externalReference = $externalReference;
    }

    /**
     * @return AssetImage
     */
    public function getImage(): AssetImage
    {
        return $this->image;
    }

    /**
     * @param AssetImage $image
     */
    public function setImage(AssetImage $image): void
    {
        $this->image = $image;
    }


}
