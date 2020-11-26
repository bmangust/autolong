<?php

namespace App\Console;

use App\ExchangeRate;
use App\Http\Resources\ExchangeRateResource;
use App\Mail\NewProducts;
use App\MailTask;
use App\Product;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
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
            $rubToCny = json_decode($response->body())->Valute->CNY->Previous;
            $rubToUsd = json_decode($response->body())->Valute->USD->Previous;
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
            Storage::disk('base')->move($name, '/public/dumps/' . $name);
        })->dailyAt('03:00');

        $schedule->call(function () {
            $mailTask = MailTask::first();
            if (is_null($mailTask)) {
                return true;
            }

            $dispatchTime = date('h:i', strtotime($mailTask->dispatch_time));
            $email = $mailTask->email;
            $nowTime = Carbon::now()->format('h:i');
            if ($dispatchTime == $nowTime) {
                $newProducts = Product::wherePublished(0)->orderByDesc('created_at')->get();
                Mail::to($email)->send(new NewProducts($newProducts));
            }
        })->everyMinute();
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
