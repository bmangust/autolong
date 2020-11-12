<?php

namespace App;

trait UseInfoWIthJsonInDocumentsTrait
{
    public function saveInfoWithJson($info)
    {
        $this->info = json_encode($info);
        $this->save();
    }

    public function getInfo()
    {
        return json_decode($this->info);
    }
}
