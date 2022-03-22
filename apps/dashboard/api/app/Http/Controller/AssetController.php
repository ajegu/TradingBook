<?php

namespace Ajegu\TradingBook\Dashboard\Api\Http\Controller;

use Ajegu\DdbAccess\Exception\DDBAccessException;
use Ajegu\TradingBook\Dashboard\Api\Repository\AssetRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Serializer;

class AssetController extends Controller
{
    /**
     * @param AssetRepository $assetRepository
     * @param Serializer $serializer
     */
    public function __construct(
        private AssetRepository $assetRepository,
        private Serializer $serializer
    ) {}

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws DDBAccessException
     * @throws ExceptionInterface
     * @throws ValidationException
     */
    public function list(Request $request): JsonResponse
    {
        $rules = [
            'cursor' => 'string',
            'pageSize' => 'int',
            'symbol' => 'string'
        ];

        $requestData = $this->validate($request, $rules);

        $assetList = $this->assetRepository->findAll(
            $requestData['cursor'] ?? null,
            $requestData['pageSize'] ?? 20,
            $requestData['symbol'] ?? null
        );

        return new JsonResponse(
            $this->serializer->normalize($assetList)
        );
    }
}
