<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Broadcaster
    |--------------------------------------------------------------------------
    |
    | This option controls the default broadcaster that will be used by the
    | framework when an event needs to be broadcast. You may set this to
    | any of the connections defined in the "connections" array below.
    |
    | Supported: "pusher", "redis", "log", "null"
    |
    */

    'default' => env('BROADCAST_DRIVER', 'null'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Connections
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the broadcast connections that will be used
    | to broadcast events to other systems or over websockets. Samples of
    | each available type of connection are provided inside this array.
    |
    */

    'connections' => [

        'pusher' => [
            'driver' => 'pusher',
            'key' => env('PUSHER_APP_KEY'),
            'secret' => env('PUSHER_APP_SECRET'),
            'app_id' => env('PUSHER_APP_ID'),
            'options' => [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true,
                // useTLS=true and pusher-php-server=v7.2 throws error when sending to pusher:
                // "Argument 4 passed to Pusher\\Pusher::trigger() must be of the type array, null given"
                // solution: downgrage to pusher-php-server=v4.1

                // if cannot connect to Pusher when useTLS=true and pusher-php-server=v4.1
                // this is a possible solution (does not work in my enviroment)
                // 'useTLS' => true,
                // 'scheme' => 'https',
                // 'curl_options' => [
                //     CURLOPT_SSL_VERIFYHOST => 0,
                //     CURLOPT_SSL_VERIFYPEER => 0,
                // ],

                // another solution is try to upgrade Laravel to 8.29.0 (did not try this)
                // https://stackoverflow.com/questions/66662044/laravel-websocket-with-pusher-error-when-making-post-request
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],

        'log' => [
            'driver' => 'log',
        ],

        'null' => [
            'driver' => 'null',
        ],

    ],

];
