<?php

namespace App;

trait TranslateHtmlCodesToTagsTrait
{
    public function translateHtmlCodesToTags($text): string
    {
        return htmlspecialchars_decode($text);
    }

    public function cutScriptTagsInText($text): string
    {
        return preg_replace('#<script.*<\/script>#', '', $text);
    }
}
