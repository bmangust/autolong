<?php

namespace App;

trait CleaningSpaceTrait
{
    public function cleanSpaceInArrayItems(array $items) : array
    {
        $newItems = [];
        foreach ($items as $item) {
           $newItems[] = str_replace(' ', '', $item);
        }
        return $newItems;
    }
}
