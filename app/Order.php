<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Product;
use App\OrderItem;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Order extends Model
{
    use TranslateToSnakeCaseTrait;
    use TranslateHtmlCodesToTagsTrait;
    use CleaningSpaceTrait;

    public const SANDBOX_DIRECTORY = '/orders/';
    public const CONTRACT_DIRECTORY = '/orders/';
    public const CHECK_DIRECTORY = '/checks/';
    public const STAMP_DIRECTORY = '/storage/stamps/';
    public const SIGNATURE_DIRECTORY = '/storage/signature/';

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

    public function getOrderItemsQuantity(): int
    {
        $quantity = 0;
        foreach ($this->orderItems as $orderItem) {
            $quantity += $orderItem->quantity;
        }
        return $quantity;
    }

    public function getFullOrderItemsPcsCtnOrCtns(string $pcsCtnOrCtns): int
    {
        if (!preg_match('#^pcsCtn$|^ctns$#', $pcsCtnOrCtns)) {
            throw new HttpException(404, $pcsCtnOrCtns . 'такого параметра нет');
        }
        $quantity = 0;
        foreach ($this->orderItems as $orderItem) {
            if (!is_null($orderItem->pcs_ctn_ctns)) {
                foreach (json_decode($orderItem->pcs_ctn_ctns, true)[$pcsCtnOrCtns] as $pcsCtnOrCtn) {
                    $quantity += $pcsCtnOrCtn;
                }
            }
        }
        return $quantity;
    }

    public function getFullOrderItemsVolume(): int
    {
        $volume = 0;
        foreach ($this->orderItems as $orderItem) {
            if (!is_null($orderItem->meas)) {
                foreach (json_decode($orderItem->meas, true) as $meas) {
                    $volume += array_product($meas);
                }
            }
        }
        return $volume;
    }

    public function getFullOrderItemsWeightNetto(): int
    {
        $weight = 0;
        foreach ($this->orderItems as $orderItem) {
            if (!is_null($orderItem->pcs_ctn_ctns)) {
                foreach (json_decode($orderItem->pcs_ctn_ctns, true)['ctns'] as $ctn) {
                    $weight += $orderItem->countWeightNetto($ctn);
                }
            }
        }
        return $weight;
    }

    public function getFullOrderItemsWeightBrutto(): int
    {
        $weight = 0;
        foreach ($this->orderItems as $orderItem) {
            if (!is_null($orderItem->pcs_ctn_ctns)) {
                foreach (json_decode($orderItem->pcs_ctn_ctns, true)['ctns'] as $ctn) {
                    $weight += $orderItem->countWeightBrutto($ctn);
                }
            }
        }
        return $weight;
    }

    public function getFullBruttoWeight(): int
    {
        $weight = 0;
        foreach ($this->orderItems as $orderItem) {
            $weight += $orderItem->product->weight_brutto;
        }
        return $weight;
    }

    public function getFullNettoWeight(): int
    {
        $weight = 0;
        foreach ($this->orderItems as $orderItem) {
            $weight += $orderItem->product->weight_netto;
        }
        return $weight;
    }

    public function setOrderStatus(string $status, int $city = null, string $arrivalDate = null)
    {
        $statuses = Status::getOrderStatuses();
        if (property_exists($statuses, $status)) {
            $this->status = $status;

            if ((is_null($this->arrival_date) && is_null($this->city_id)) ||
                (!is_null($city) && !is_null($arrivalDate))) {
                $this->city_id = $city;
                $this->arrival_date = $arrivalDate;
            }

            $this->save();
        } else {
            throw new HttpException(404, 'Данного статуса не существует');
        }
    }

    public function setOrderPaymentStatus($status, $paymentAmount = null, $surchargeAmount = null)
    {
        $statuses = Status::getOrderPaymentStatuses();
        $paymentRefunded = Status::getOrderPaymentRefunded();
        if (property_exists($statuses, $status)) {
            if (is_null($paymentAmount) && is_null($surchargeAmount) && $status != $paymentRefunded) {
                $this->status_payment = $status;
                $this->save();
            } else {
                $this->status_payment = $status;
                $this->payment_amount = $paymentAmount;
                $this->surcharge_amount = $surchargeAmount;
                $this->save();
            }
        } else {
            throw new HttpException(404, 'Данного статуса оплаты не существует');
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

        $invoice->order_id = $this->id;
        $invoice->save();

        $invoice = $this->invoice;

        $contractInfo = $this->contract->getInfo();
        $supply = $contractInfo->supply;
        $contractNumber = $contractInfo->name;

        $proformaInfo = $this->proforma->getInfo();
        $proformaStatusPayment = $proformaInfo->statusPayment;
        $proformaNumber = $proformaInfo->proformaNumber;
        $date = Carbon::now()->format('Y/m/d');

        $all = $this->sortArrayAndPushElement([
            'supply' => $supply,
            'proformaNumber' => $proformaNumber,
            'contractNumber' => $contractNumber,
            'proformaStatusPayment' => $proformaStatusPayment,
            'date' => $date
        ]);

        $invoice->saveInfoWithJson($all);
        return true;
    }

    public function generateProforma(): bool
    {
        $proforma = new ProformaDocument();

        $proforma->order_id = $this->id;
        $proforma->save();

        $proforma = $this->proforma;

        $contractInfo = $this->contract->getInfo();
        $supply = $contractInfo->supply;
        $statusPayment = $this->status_payment;
        $contractNumber = $contractInfo->name;
        $date = Carbon::now()->format('Y/m/d');

        $all = $this->sortArrayAndPushElement([
            'supply' => $supply,
            'statusPayment' => $statusPayment,
            'contractNumber' => $contractNumber,
            'proformaNumber' => $proforma->id,
            'date' => $date
        ]);

        $proforma->saveInfoWithJson($all);
        return true;
    }

    public function generateContract(): bool
    {
        $contract = new ContractDocument();

        $contract->order_id = $this->id;
        $contract->save();

        $contract = $this->contract;

        $date = Carbon::now()->format('Y/m/d');
        $contractName = $date . '-' . $contract->id;
        $supply = Supply::fob();

        $all = $this->sortArrayAndPushElement([
            'name' => $contractName,
            'supply' => $supply,
            'date' => $date,
            'directorRu' => null,
            'directorEn' => null,
            'classificationRu' => null,
            'classificationEn' => null,
            'contractEndDate' => null
        ], [
            'requisites' => null,
            'importerStamp' => null,
            'providerStamp' => null,
            'importerSignature' => null
        ]);

        $contract->saveInfoWithJson($all);
        return true;
    }

    public function generateNamePackingListIfNull(string $nameContract)
    {
        if ($this->packing_list_name) {
            $packingListName = $nameContract . '-' . $this->id . ' dated' . Carbon::now()->format('d F Y');
            $this->packing_list_name = $packingListName;
            $this->save();
        }
    }

    public function getProductsHsCode(): array
    {
        $hsCodes = [];
        foreach ($this->orderItems as $item) {
            $hsCodes[] = $item->product->hs_code;
        }
        return $hsCodes;
    }

    public function autogenerateDocumentsIfTheyAreMissing()
    {
        if (!$this->contract()->count()) {
            $this->generateContract();
        }
        if (!$this->proforma()->count()) {
            $this->generateProforma();
        }
        if (!$this->invoice()->count()) {
            $this->generateInvoice();
        }
    }

    public function saveStamp(string $directory, string $name, $image): string
    {
        return Storage::disk('main')
            ->putFileAs($directory, $image, $name . '.' . $image->getClientOriginalExtension());
    }

    public function deletePdfContractFilesStampsOrSignatures(string $name)
    {
        if (!preg_match('#^providerStamp$|^importerStamp$|^importerSignature$|^providerSignature$#', $name)) {
            throw new HttpException(404, $name . 'такого параметра нет');
        }
        try {
            $file = json_decode($this->contract->info, true)[$name];
        } catch (\Exception $e) {
            throw new HttpException(404, 'У данного документа нет данного файла ' . $name);
        }
        Storage::disk('main')->delete($file);
        $array = (array)$this->contract->getInfo();
        unset($array[$name]);
        $this->contract->info = $array;
        $this->contract->save();
    }

    public function checkDataForPackingList(): bool
    {
        foreach ($this->orderItems as $orderItem) {
            if (!is_null($orderItem->pcs_ctn_ctns) && !is_null($orderItem->meas)) {
                continue;
            }
            return false;
        }
        return true;
    }

    public function sortArrayAndPushElement(array $array,array $element = null): array
    {
        krsort($array);
        if (!is_null($element)){
            foreach ($element as $key => $value){
                $array[$key] = $value;
            }
        }
        return $array;
    }
}
