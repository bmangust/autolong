<?php

namespace App\Console;

use App\Console\Commands\SyncOzonStocks;
use App\Dump;
use App\ExchangeRate;
use App\Http\Resources\ExchangeRateResource;
use App\MailTask;
use App\Notifications\NewProductsNotification;
use App\Order;
use App\Product;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Spatie\DbDumper\Databases\MySql;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function (ExchangeRate $exchangeRate) {
            $response = Http::get(ExchangeRate::CRBF_DAILY_RATE_JSON);
            $percentageModulBank = ExchangeRate::PERCENTAGE_MODULBANK / 100;
            $rubToCny = json_decode($response->body())->Valute->CNY->Previous / json_decode($response->body())->Valute->CNY->Nominal;
            $rubToUsd = json_decode($response->body())->Valute->USD->Previous / json_decode($response->body())->Valute->USD->Nominal;
            $rubToCnyModulBank = $rubToCny + $rubToCny * $percentageModulBank;
            $rubToUsdModulBank = $rubToUsd + $rubToUsd * $percentageModulBank;
            $cnyToUsdModulBank = round($rubToCnyModulBank / $rubToUsdModulBank, 8);
            $lattesCourse = $exchangeRate->lastCourse();
            if (is_null($lattesCourse) || $lattesCourse->rub != $rubToCnyModulBank || $lattesCourse->usd != $cnyToUsdModulBank) {
                $infoToFile = $exchangeRate->create(['rub' => $rubToCnyModulBank, 'usd' => $cnyToUsdModulBank]);
                Storage::disk('resources')
                        ->put(ExchangeRate::FILE_INFO_COURSE, json_encode(new ExchangeRateResource($infoToFile)));
            }
        })->dailyAt('10:00');

        $schedule->call(function () {
            $name = Carbon::now()->format('d-m-Y') . '-dump.sql';
            MySql::create()
                    ->setDbName(env('DB_DATABASE'))
                    ->setUserName(env('DB_USERNAME'))
                    ->setPassword(env('DB_PASSWORD'))
                    ->dumpToFile($name);

            $year = Carbon::now()->format('Y');
            $month = Carbon::now()->format('m');
            $path = '/dumps/' . $year . '/' . $month . '/' . $name;

            Storage::disk('base')->move($name, 'public' . $path); //проблема с драйвером
            Dump::create([
                    'path' => $path
            ]);
        })->dailyAt('03:00');

        $schedule->call(function () {
            $mailTask = MailTask::first();
            if (is_null($mailTask)) {
                return true;
            }

            $dispatchTime = date('H:i', strtotime($mailTask->dispatch_time));
            $email = $mailTask->email;
            $nowTime = Carbon::now()->format('H:i');
            if ($dispatchTime == $nowTime) {
                $newProducts = Product::wherePublished(0)->orderByDesc('created_at')->get();
                if (count($newProducts) > 0) {
                    if (!$mailTask->notify_weekend && Carbon::now()->isWeekend()) {
                        return true;
                    }
                    Notification::route('mail', $email)->notify(new NewProductsNotification($newProducts));
                }
            }
        })->everyMinute();

        $schedule->call(function () {
            $orders = Order::whereNotNull('baikal_tracker_link')->get();
            foreach ($orders as $order) {
                $parsingInfo = Order::parseBaikalLinkById($order->baikal_tracker_link);
                $approximateDate = Order::parseApproximateDate($order->baikal_tracker_link);
                $order->update([
                        'baikal_tracker_history' => $parsingInfo
                ]);
                if ($approximateDate) {
                    $order->updateArrivalDateInContainer($approximateDate);
                }
            }
        })->hourly();

        $schedule->command(SyncOzonStocks::class)->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
