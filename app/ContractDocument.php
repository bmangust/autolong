<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ContractDocument extends Model
{
    use UseInfoWIthJsonInDocumentsTrait;

    public function order()
    {
        return $this->hasOne('App\Order');
    }
}
