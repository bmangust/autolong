<?php

namespace App;

trait CleaningSpaceTrait
{
    public function cleanSpaceInArrayItems(array $items, bool $withKey = false): array
    {
        $newItems = [];
        foreach ($items as $key => $item) {
            if ($withKey) {
                $newItems[$key] = str_replace(' ', '', $item);
            } else {
                $newItems[] = str_replace(' ', '', $item);
            }
        }
        return $newItems;
    }
}
