<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Product;
use App\OrderItem;
use Illuminate\Support\Facades\App;

class Order extends Model
{
    use TranslateToSnakeCaseTrait;
    use CleaningSpaceTrait;

    public const SANDBOX_DIRECTORY = '/orders/';
    public const CONTRACT_DIRECTORY = '/orders/';

    protected $fillable = ['name', 'provider_id'];

    public function provider()
    {
        return $this->belongsTo('App\Provider');
    }

    public function orderItems()
    {
        return $this->hasMany('App\OrderItem');
    }

    public function sandboxFiles()
    {
        return $this->morphMany('App\SandboxFile', 'sandbox_filed');
    }

    public function container()
    {
        return $this->belongsTo('App\Container');
    }

    public function city()
    {
        return $this->belongsTo('App\City');
    }

    public function contract()
    {
        return $this->hasOne('App\ContractDocument');
    }

    public function invoice()
    {
        return $this->hasOne('App\InvoiceDocument');
    }

    public function proforma()
    {
        return $this->hasOne('App\ProformaDocument');
    }

    public function addOrderItems($items)
    {
        if ($this->orderItems()->count()) {
            $this->orderItems()->delete();
        }
        $exchangeRate = new ExchangeRate();
        foreach ($items as $item) {
            $orderItem = new OrderItem();
            $product = Product::findOrFail($item['id']);
            $orderItem->product_id = $product->id;
            $orderItem->order_id = $this->id;
            $orderItem->quantity = $item['quantity'];
            $priceCny = $item['price']['cny'];
            $orderItem->price_cny = $priceCny;
            $orderItem->price_rub = $exchangeRate->lastCourse()->rub * $priceCny;
            $orderItem->price_usd = $exchangeRate->lastCourse()->usd * $priceCny;
            $orderItem->save();
            if ($orderItem->price_cny != $product->price_cny) {
                $product->changePrices($orderItem->price_cny);
            }
        }
    }

    public function getOrderSumInCny()
    {
        $sum = 0;
        foreach ($this->orderItems as $orderItem) {
            $sum += $orderItem->getSumInCny();
        }
        return $sum;
    }

    public function getOrderSumInRub()
    {
        $sum = 0;
        foreach ($this->orderItems as $orderItem) {
            $sum += $orderItem->getSumInRub();
        }
        return $sum;
    }

    public function getOrderSumInUsd()
    {
        $sum = 0;
        foreach ($this->orderItems as $orderItem) {
            $sum += $orderItem->getSumInUsd();
        }
        return $sum;
    }

    public function getOrderItemsQuantity()
    {
        $quantity = 0;
        foreach ($this->orderItems as $orderItem) {
            $quantity += $orderItem->quantity;
        }
        return $quantity;
    }

    public function setOrderStatus(string $status, int $city = null, string $arrivalDate = null)
    {
        $statuses = Status::getOrderStatuses();
        if (property_exists($statuses, $status)) {
            $this->city_id = $city;
            $this->arrival_date = $arrivalDate;
            $this->status = $status;
            $this->save();
        } else {
            return response()->json('Данного статуса не существует', 404);
        }
    }

    public function setOrderPaymentStatus($status)
    {
        $statuses = Status::getOrderPaymentStatuses();
        if (property_exists($statuses, $status)) {
            $this->status_payment = $status;
            $this->save();
        } else {
            return response()->json('Данного статуса оплаты не существует', 404);
        }
    }

    public function checkActualDate(string $date): bool
    {
        $nowDay = Carbon::now()->toDateString();
        if ($nowDay > $date) {
            return false;
        }
        return true;
    }

    public function generateInvoice(): bool
    {
        $invoice = new InvoiceDocument();
        $importer = Importer::first();
        $provider = $this->provider;

        $invoice->order_id = $this->id;
        $invoice->save();

        $invoice = $this->invoice;

        $contractInfo = $this->contract->getInfo();
        $supply = $contractInfo->supply;
        $contractNumber = $contractInfo->name;

        $proformaInfo = $this->proforma->getInfo();
        $proformaStatusPayment = $proformaInfo->statusPayment;
        $proformaNumber = $proformaInfo->proformaNumber;

        $invoice->saveInfoWithJson([
            'supply' => $supply,
            'provider' => $provider,
            'importer' => $importer,
            'proformaNumber' => $proformaNumber,
            'contractNumber' => $contractNumber,
            'proformaStatusPayment' => $proformaStatusPayment,
        ]);
        return true;
    }

    public function generateProforma(): bool
    {
        $proforma = new ProformaDocument();
        $provider = $this->provider;
        $importer = Importer::first();

        $proforma->order_id = $this->id;
        $proforma->save();

        $proforma = $this->proforma;

        $contractInfo = $this->contract->getInfo();
        $supply = $contractInfo->supply;
        $statusPayment = $this->status_payment;
        $contractNumber = $contractInfo->name;

        $proforma->saveInfoWithJson([
            'supply' => $supply,
            'importer' => $importer,
            'provider' => $provider,
            'statusPayment' => $statusPayment,
            'contractNumber' => $contractNumber,
            'proformaNumber' => $proforma->id,
        ]);
        return true;
    }

    public function generateContract(): bool
    {
        $contract = new ContractDocument();
        $importer = Importer::first();
        $provider = $this->provider;

        $contract->order_id = $this->id;
        $contract->save();

        $contract = $this->contract;

        $date = Carbon::now()->format('Y/m/d');
        $contractName = $date . '-' . $contract->id;
        $supply = Supply::fob();
        $contract->saveInfoWithJson([
            'importer' => $importer,
            'provider' => $provider,
            'name' => $contractName,
            'supply' => $supply,
            'date' => $date,
            'orderPrice' => $this->getOrderSumInCny(),
        ]);
        return true;
    }
}
