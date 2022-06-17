<?php

namespace App\Console\Commands;

use App\Connections\Sandbox1c;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SyncOzonStocks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ozon:stocks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync stocks with ozon';
    /**
     * @var Client
     */
    private $httpClient;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->httpClient = new Client(['base_uri' => config('ozon.api_url')]);
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $products = $this->getOzonProducts();

        $stocks = Sandbox1c::getProductsStocks($products);

        foreach (array_chunk($stocks, 100) as $stocksBatch) {
            try {
                $response = $this->httpClient->request('POST', 'v1/product/import/stocks', [
                        'headers' => [
                                'Client-Id' => config('ozon.client_id'),
                                'Api-Key' => config('ozon.api_key')
                        ],
                        'json' => [
                                'stocks' => $stocksBatch
                        ]
                ])->getBody()->getContents();

                $this->info($response);
            } catch (ClientException $exception)
            {
                $this->error($exception->getResponse()->getBody()->getContents());
            }
        }

        return 0;
    }

    private function getOzonProducts(): array
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
}
