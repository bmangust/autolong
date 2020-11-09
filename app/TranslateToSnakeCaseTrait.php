<?php

namespace App;

use Illuminate\Support\Str;

trait TranslateToSnakeCaseTrait
{
    public function dashesToSnakeCase($request)
    {
        if (!is_array($request)) {
            return $request;
        }
        $newRequest = [];
        foreach ($request as $key => $value) {
            $newRequest[Str::snake($key)] = $value;
        }
        return $newRequest;
    }
}
