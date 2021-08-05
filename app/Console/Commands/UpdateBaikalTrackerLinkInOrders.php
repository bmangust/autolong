<?php

namespace App\Console\Commands;

use App\Order;
use Illuminate\Console\Command;

class UpdateBaikalTrackerLinkInOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:update-baikal-tracker-link-in-orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'обновляет url для ссылки baikal во всех заказах';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $orders = Order::whereNotNull('baikal_tracker_link')->get();

        foreach ($orders as $order) {
            parse_str(parse_url($order->baikal_tracker_link, PHP_URL_QUERY), $params);

            if (isset($params['id'])) {
                $order->baikal_tracker_link = Order::BAIKAL_TRACKER_LINK . '?' . http_build_query(['CNum' => $params['id']]);
                $order->save();
            }
        }
    }
}
