<?php

namespace App\Services;

use GuzzleHttp\Client;

class OzonService
{
    /**
     * @var Client
     */
    private $httpClient;

    public function __construct()
    {
        $this->httpClient = new Client(['base_uri' => config('ozon.api_url')]);
    }

    public function getOzonProducts(): array
    {
        $response = json_decode(
                $this->httpClient->request('POST', 'v2/product/list', [
                        'headers' => [
                                'Client-Id' => config('ozon.client_id'),
                                'Api-Key' => config('ozon.api_key')
                        ]
                ])->getBody()->getContents(),
                true
        );

        $products = [];

        foreach ($response['result']['items'] as $item) {
            $products[$item['offer_id']] = $item['product_id'];
        }

        return $products;
    }

    public function updateStocks(array $stocks): string
    {
        return $this->httpClient->request('POST', 'v1/product/import/stocks', [
                'headers' => [
                        'Client-Id' => config('ozon.client_id'),
                        'Api-Key' => config('ozon.api_key')
                ],
                'json' => [
                        'stocks' => $stocks
                ]
        ])->getBody()->getContents();
    }
}
