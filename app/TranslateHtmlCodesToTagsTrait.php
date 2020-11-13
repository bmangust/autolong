<?php

namespace App;

trait TranslateHtmlCodesToTagsTrait
{
    public function translateHtmlCodesToTags(string $text): string
    {
        return htmlspecialchars_decode($text);
    }

    public function cutScriptTagsInText(string $text): string
    {
       return preg_replace('#<script.*<\/script>#', '', $text);
    }
}
