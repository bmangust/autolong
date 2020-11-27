<?php

namespace App;

trait TranslationIntoCaseCyrillicTrait
{
    public static function translateUcFirstCyrillicAndOtherLc(string $string): string
    {
        $str = mb_strtoupper(mb_substr($string, 0, 1));
        return $str . mb_strtolower(mb_substr($string, 1));
    }

    public static function translateUcFirstCyrillicAndOtherLcWhenStingHaveManyWords(string $string): string
    {
        $delimiter = self::checkDelimiterSpaceOrHyphen($string);
        if (!empty($delimiter)){
            $arrayString = explode($delimiter, $string);
        }

        if (isset($arrayString)) {
            $arrayNewWords = [];
            foreach ($arrayString as $word) {
                $subDelimiter = self::checkDelimiterSpaceOrHyphen($word);

                if (!empty($subDelimiter)) {
                    $arrayString = explode($subDelimiter, $word);
                    $arrayNewSubWords = [];

                    foreach ($arrayString as $subWord) {
                        $arrayNewSubWords[] = self::translateUcFirstCyrillicAndOtherLc($subWord);
                    }
                    $arrayNewWords[] = implode($subDelimiter, $arrayNewSubWords);
                } else {
                    $arrayNewWords[] = self::translateUcFirstCyrillicAndOtherLc($word);
                }
            }
            return implode($delimiter, $arrayNewWords);
        }

        return self::translateUcFirstCyrillicAndOtherLc($string);
    }

    public static function checkDelimiterSpaceOrHyphen (string $string): string
    {
        if (strpos($string, '-')) {
            return '-';
        }
        if(strpos($string, ' ')) {
            return ' ';
        }
        return '';
    }
}
