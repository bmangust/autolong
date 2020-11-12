<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProformaDocument extends Model
{
    use UseInfoWIthJsonInDocumentsTrait;

    public function order()
    {
        return $this->hasOne('App\Order');
    }
}
