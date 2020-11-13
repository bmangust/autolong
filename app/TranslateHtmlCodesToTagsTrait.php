<?php

namespace App;

trait TranslateHtmlCodesToTagsTrait
{
    public function translateHtmlCodesToTags(string $text): string
    {
        $string = strtr($text, [
            '&lt;' => '<',
            '&gt;' => '>',
            '&quot;' => '"'
        ]);
        return $string;
    }
}
