<?php

namespace App;

trait TranslateHtmlCodesToTagsTrait
{
    public function translateHtmlCodesToTags(string $text): string
    {
        return $string = strtr($text, [
            '&lt;' => '<',
            '&gt;' => '>',
            '&quot;' => '"'
        ]);
    }
}
