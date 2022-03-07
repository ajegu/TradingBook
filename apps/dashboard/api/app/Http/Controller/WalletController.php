<?php

namespace Ajegu\TradingBook\Dashboard\Api\Http\Controller;

use Ajegu\TradingBook\Dashboard\Api\Repository\WalletRepository;
use Illuminate\Http\JsonResponse;

class WalletController
{
    /**
     * @param WalletRepository $walletRepository
     */
    public function __construct(
        private WalletRepository $walletRepository
    ) {}

    /**
     * @return JsonResponse
     */
    public function list(): JsonResponse
    {
        return new JsonResponse(
            $this->walletRepository->findAll()
        );
    }
}
