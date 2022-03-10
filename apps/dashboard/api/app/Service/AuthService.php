<?php

namespace Ajegu\TradingBook\Dashboard\Api\Service;

use Ajegu\TradingBook\Dashboard\Api\Model\User;
use Exception;
use GuzzleHttp\Client;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;

class AuthService
{
    /**
     * @param string $cognitoJwksUrl
     * @param LoggerInterface $logger
     */
    public function __construct(
        private string $cognitoJwksUrl,
        private LoggerInterface $logger
    ) {}

    /**
     * @param string|null $token
     * @return User|null
     * @throws
     */
    public function verify(?string $token): ?User
    {
        if ($token) {

            // Get the public keys
            $client = new Client();
            try {
                $response = $client->get($this->cognitoJwksUrl);
            } catch (GuzzleException $exception) {
                $this->logger->error('An error is happened to retrieve the JWKS file.', [
                    'exception' => $exception->getMessage()
                ]);

                return null;
            }

            if ($response->getStatusCode() !== Response::HTTP_OK) {
                $this->logger->error('The JWKS file can not be found.', [
                    'statusCode' => $response->getStatusCode()
                ]);
                return null;
            }

            $jwks = json_decode((string)$response->getBody(), true);

            try {
                $claim = (array) JWT::decode($token, JWK::parseKeySet($jwks));
            } catch (Exception) {
                return null;
            }

            return new User($claim);
        }

        return null;
    }
}
