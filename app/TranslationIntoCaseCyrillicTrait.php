<?php

namespace App;

trait TranslationIntoCaseCyrillicTrait
{
    public static function translateUcFirstCyrillicAndOtherLc(string $string): string
    {
        $str = mb_strtoupper(mb_substr($string, 0, 1));
        return $str . mb_substr(mb_strtolower($string), 1);
    }
}
