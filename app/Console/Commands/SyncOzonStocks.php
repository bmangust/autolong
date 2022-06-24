<?php

namespace App\Console\Commands;

use App\Connections\Sandbox1c;
use App\Services\OzonService;
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
     * @var OzonService
     */
    private $ozonService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(OzonService $ozonService)
    {
        parent::__construct();

        $this->ozonService = $ozonService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $products = app(OzonService::class)->getOzonProducts();

        $stocks = Sandbox1c::getProductsStocks($products);

        foreach (array_chunk($stocks, 100) as $stocksBatch) {
            try {
                $this->info(
                        $this->ozonService->updateStocks($stocksBatch)
                );
            } catch (ClientException $exception)
            {
                $this->error($exception->getResponse()->getBody()->getContents());
            }
        }

        return 0;
    }
}
