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

    public function cutScriptTagsInText(string $text): string
    {
       return preg_replace('#<script.*<\/script>#', '', $text);
    }
}
