<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
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
    public const BAIKAL_TRACKER_LINK = 'https://baikalasia.ru/tracker.php';

    protected $fillable = [
            'name',
            'provider_id',
            'baikal_tracker_link',
            'baikal_tracker_history',
            'refusal_amount',
            'payment_amount',
            'customs_amount',
            'ordering_amount',
            'payment_amount_rub',
            'weight_brutto',
            'weight_netto',
            'total_payment_history',
            'total_payment_history_rub',
            'payment_history'
    ];

    private const PAYMENT_AMOUNT_INFO_BLOCK = [
            'id' => null,
            'paymentAmount' => null,
            'paymentAmountRub' => null,
            'paymentType' => null,
            'createdAt' => null,
            'updatedAt' => null
    ];

    public const PARSING_CONTENT = [
            'date' => null,
            'text' => null
    ];

    public $contractActualRows = [
            'name' => null,
            'supply' => null,
            'date' => null,
            'directorRu' => null,
            'directorEn' => null,
            'classificationRu' => null,
            'classificationEn' => null,
            'contractEndDate' => null
    ];

    public $proformaActualRows = [
            'supply' => null,
            'statusPayment' => null,
            'contractNumber' => null,
            'proformaNumber' => null,
            'date' => null
    ];

    public $invoiceActualRows = [
            'paymentTerms' => null,
            'contractNumber' => null,
            'proformaStatusPayment' => null,
            'additionalField' => null,
            'date' => null
    ];

    public $accountActualRows = [
            'supply' => null,
            'statusPayment' => null,
            'contractNumber' => null,
            'accountNumber' => null,
            'date' => null
    ];

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

    public function account()
    {
        return $this->hasOne('App\AccountDocument');
    }

    public function setPaymentHistoryAttribute($value)
    {
        $this->attributes['payment_history'] = json_encode($value);
    }

    public function setBaikalTrackerHistoryAttribute($value)
    {
        $this->attributes['baikal_tracker_history'] = json_encode($value);
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

    public function countPaymentAmount($paymentAmount): int
    {
        if (is_numeric($paymentAmount)) {
            return $this->payment_amount + $paymentAmount;
        }
        return $this->payment_amount;
    }

    public function updatePaymentAmount(int $paymentAmount): void
    {
        $this->update(['payment_amount' => $paymentAmount]);
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

    public function setOrderPaymentStatus($status, $paymentAmount = null, $paymentType = null)
    {
        $statuses = Status::getOrderPaymentStatuses();
        $paymentRefunded = Status::getOrderPaymentRefunded();
        if (property_exists($statuses, $status)) {
            if (is_null($paymentAmount) && is_null($paymentType) && $status != $paymentRefunded) {
                $this->status_payment = $status;
                $this->save();
            } else {
                if ($paymentAmount != 0) {
                    $oldPaymentHistory = json_decode($this->payment_history, true);
                    $oldPaymentHistory[] = $this->createInfoPaymentAmountBlock($paymentAmount, $paymentType);
                    $this->payment_history = $oldPaymentHistory;
                    $this->payment_amount = $this->countPaymentAmount($paymentAmount);
                }
                $this->status_payment = $status;
                $this->save();
            }
        } else {
            throw new HttpException(404, 'Данного статуса оплаты не существует');
        }
    }

    public function createInfoPaymentAmountBlock(int $paymentAmount, string $type): array
    {
        $block = self::PAYMENT_AMOUNT_INFO_BLOCK;
        $block['id'] = uniqid('', true);
        $block['paymentAmount'] = $paymentAmount;
        $block['paymentType'] = $type;
        $block['paymentAmountRub'] = 0;
        $block['createdAt'] = strtotime(Carbon::now()->format('d.m.Y'));
        $block['updatedAt'] = strtotime(Carbon::now()->format('d.m.Y'));
        return $block;
    }


    /**
     * Обновляем конкретный блок в истории оплаты
     * @param string $id
     * @param array $attributes
     */
    public function updateBlockInPaymentHistory(string $id, array $attributes): void
    {
        $paymentHistory = json_decode($this->payment_history, true);
        $find = false;
        if ($paymentHistory) {
            foreach ($paymentHistory as $key => $block) {
                if ($block['id'] == $id && !$find) {
                    foreach ($attributes as $index => $value) {
                        if (isset($paymentHistory[$key][$index])) {
                            $paymentHistory[$key][$index] = $value;
                        } else {
                            throw new HttpException(500, 'Неизвестный индекс ' . $index .' в блоке истории заказа');
                        }
                        $paymentHistory[$key]['updatedAt'] = strtotime(Carbon::now()->format('d.m.Y'));
                    }
                    $find = true;
                    break;
                }
            }
            if (!$find) {
                throw new HttpException(404, 'Такого блока не существует');
            }
            $this->update([
                    'payment_history' => $paymentHistory
            ]);
        }
    }

    /**
     * Удаление блока оплаты из истории
     * @param string $id
     */
    public function deleteBlockInPaymentHistory(string $id): void
    {
        $paymentHistory = json_decode($this->payment_history, true);
        $find = false;
        if ($paymentHistory) {
            foreach ($paymentHistory as $key => $block) {
                if ($block['id'] == $id && !$find) {
                    unset($paymentHistory[$key]);
                    $find = true;
                    break;
                }
            }
            if (!$find) {
                throw new HttpException(404, 'Такого блока не существует');
            }
            $this->update([
                    'payment_history' => $paymentHistory
            ]);
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

    public function generateAccount(): bool
    {
        $account = new AccountDocument();

        $account->order_id = $this->id;
        $account->save();

        $account = $this->account;

        if (!is_null($this->contract)) {
            $contractInfo = $this->contract->getInfo();
        } else {
            $contractInfo = ContractDocument::whereOrderId($this->id)->first()->getInfo();
        }

        $supply = $contractInfo->supply;
        $statusPayment = $this->status_payment;
        $contractNumber = $contractInfo->name;
        $date = Carbon::now()->format('Y/m/d');

        $account->saveInfoWithJson([
                'supply' => $supply,
                'statusPayment' => $statusPayment,
                'contractNumber' => $contractNumber,
                'accountNumber' => $account->id,
                'date' => $date
        ]);
        return true;
    }

    public function generateInvoice(): bool
    {
        $invoice = new InvoiceDocument();

        $invoice->order_id = $this->id;
        $invoice->save();

        $invoice = $this->invoice;

        if (!is_null($this->contract)) {
            $contractInfo = $this->contract->getInfo();
        } else {
            $contractInfo = ContractDocument::whereOrderId($this->id)->first()->getInfo();
        }
        $contractNumber = $contractInfo->name;

        $proformaInfo = $this->proforma->getInfo();
        $proformaStatusPayment = $proformaInfo->statusPayment;

        $paymentTerms = $contractInfo->supply . ' by proforma invoice ' . $proformaInfo->proformaNumber . ' dated ' . Carbon::now()->format('Y/m/d');

        $invoice->saveInfoWithJson([
                'paymentTerms' => $paymentTerms,
                'contractNumber' => $contractNumber,
                'proformaStatusPayment' => $proformaStatusPayment,
        ]);
        return true;
    }

    public function generateProforma(): bool
    {
        $proforma = new ProformaDocument();

        $proforma->order_id = $this->id;
        $proforma->save();

        $proforma = $this->proforma;

        if (!is_null($this->contract)) {
            $contractInfo = $this->contract->getInfo();
        } else {
            $contractInfo = ContractDocument::whereOrderId($this->id)->first()->getInfo();
        }

        $supply = $contractInfo->supply;
        $statusPayment = $this->status_payment;
        $contractNumber = $contractInfo->name;
        $date = Carbon::now()->format('Y/m/d');

        $proforma->saveInfoWithJson([
                'supply' => $supply,
                'statusPayment' => $statusPayment,
                'contractNumber' => $contractNumber,
                'proformaNumber' => $proforma->id,
                'date' => $date
        ]);
        return true;
    }

    public function generateContract(): bool
    {
        $contract = new ContractDocument();

        $orderId = $this->id;
        $contract->order_id = $orderId;
        $contract->save();

        $contract = ContractDocument::whereOrderId($orderId)->first();

        $date = Carbon::now()->format('Y/m/d');
        $contractName = $date . '-' . $contract->id;
        $supply = Supply::fob();

        $contract->saveInfoWithJson([
                'name' => $contractName,
                'supply' => $supply,
                'date' => $date,
                'directorRu' => null,
                'directorEn' => null,
                'classificationRu' => null,
                'classificationEn' => null,
                'contractEndDate' => null,
                'requisites' => null,
                'importerStamp' => null,
                'providerStamp' => null,
                'importerSignature' => null,
                'providerSignature' => null
        ]);
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

    public function saveStamp(string $directory, string $name, $image): string
    {
        return Storage::disk('main')
                ->putFileAs($directory, $image, $name . '.' . $image->getClientOriginalExtension());
    }

    public function deletePdfFilesStampsOrSignatures(string $name, string $relation)
    {
        if (!preg_match('#^providerStamp$|^importerStamp$|^importerSignature$|^providerSignature$#', $name)) {
            throw new HttpException(404, $name . 'такого параметра нет');
        }
        if (!method_exists($this, $relation)) {
            throw new HttpException(404, $relation . 'такого метода нет');
        }
        try {
            $info = $this->$relation->info;
        } catch (\Exception $e) {
            throw new HttpException(404, 'Нет такого отношения ' . $name);
        }
        try {
            $file = json_decode($info, true)[$name];
        } catch (\Exception $e) {
            throw new HttpException(404, 'У данного документа нет данного файла ' . $name);
        }
        Storage::disk('main')->delete($file);
        $array = (array)$this->$relation->getInfo();
        unset($array[$name]);
        $this->$relation->info = $array;
        $this->$relation->save();
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

    public function checkActualIfNotThenChangeContract(array $contractData): array
    {
        $actual = array_diff_key($this->contractActualRows, $contractData);
        if (count($actual) > 0) {
            foreach ($actual as $key => $value) {
                $contractData = [$key => $value] + $contractData;
            }
        }
        return $contractData;
    }

    public function checkActualIfNotThenChangeProforma(array $proformaData): array
    {
        $actual = array_diff_key($this->proformaActualRows, $proformaData);
        if (count($actual) > 0) {
            foreach ($actual as $key => $value) {
                $proformaData = [$key => $value] + $proformaData;
            }
        }
        return $proformaData;
    }

    public function checkActualIfNotThenChangeInvoice(array $invoiceData): array
    {
        $actual = array_diff_key($this->invoiceActualRows, $invoiceData);
        if (count($actual) > 0) {
            foreach ($actual as $key => $value) {
                $invoiceData = [$key => $value] + $invoiceData;
            }
        }
        return $invoiceData;
    }

    public function checkActualIfNotThenChangeAccount(array $accountData): array
    {
        $actual = array_diff_key($this->accountActualRows, $accountData);
        if (count($actual) > 0) {
            foreach ($actual as $key => $value) {
                $accountData = [$key => $value] + $accountData;
            }
        }
        return $accountData;
    }

    public static function getBaikalLink(string $baikalId): string
    {
        return self::BAIKAL_TRACKER_LINK . '?' . http_build_query(['id' => $baikalId]);
    }

    public static function parseBaikalLinkById(string $link): array
    {
        try {
            $parse = file_get_contents($link);
        } catch (HttpException $exception) {
            throw new HttpException(404, 'Ошибка, нет актуальной ссылки для этого идентификатора. Попробуйте позже, либо введите другой идентификатор.');
        }
        preg_match_all('#<td[^>]*>(.*?)</td>#is', $parse, $matches);
        $history = [];
        $content = self::PARSING_CONTENT;
        foreach (array_slice($matches[1], 0) as $item) {
            if (strtotime($item)) {
                $content['date'] = $item;
            } else {
                $content['text'] = $item;
            }
            if (!is_null($content['date']) && !is_null($content['text'])) {
                $history[] = $content;
                $content = self::PARSING_CONTENT;
            }
        }
        return $history;
    }

    public static function parseApproximateDate(string $link)
    {
        try {
            $parse = file_get_contents($link);
        } catch (HttpException $exception) {
            throw new HttpException(404, 'Ошибка, нет актуальной ссылки для этого идентификатора. Попробуйте позже, либо введите другой идентификатор.');
        }
        preg_match_all('#<br>(.*?)<table[^>]*>#is', $parse, $matches);
        if (!empty($matches[1])) {
            $date = trim($matches[1][0]);
            preg_match('#\d{2,4}([-/.])\d{2}([-/.])\d{2,4}#', $date, $searchingDate);
            if (!empty($searchingDate)) {
                    return $searchingDate[0];

            }
            return null;
        }
    }

    public function getBaikalId()
    {
        $url = $this->baikal_tracker_link;
        if ($url) {
            $parts = parse_url($url);
            if (!empty($parts['query'])) {
                parse_str($parts['query'], $query);
                return $query['id'];
            }
        }
        return false;
    }

    public function updateArrivalDateInContainer(string $date): bool
    {
        $container = $this->container;
        $baikalId = $this->getBaikalId();
        if (strtotime($date)) {
            $date = Carbon::createFromDate($date)->format('Y-m-d');
            if ($container &&
                    $baikalId &&
                    $container->identifier == $baikalId &&
                    $container->arrival_date != $date)
            {
                $container->arrival_date = $date;
                $container->save();
                return true;
            }
        }
        return false;
    }

    public function updateWeight(): void
    {
        $orderItems = $this->orderItems()->with('product')->get();
        $weightBrutto = 0;
        $weightNetto = 0;
        foreach ($orderItems as $item) {
            $weightBrutto += $item->fullWeightBruttoOrderItem();
            $weightNetto += $item->fullWeightNettoOrderItem();
        }
        $this->update([
                'weight_brutto' => $weightBrutto,
                'weight_netto' => $weightNetto
        ]);
    }

    public function countTotalPaymentAmountHistory(bool $refresh = false): int
    {
        if ($refresh) {
            $this->refresh();
        }
        $historyPayments = json_decode($this->payment_history, true);
        $sum = 0;
        if ($historyPayments) {
            foreach ($historyPayments as $historyPayment) {
                $sum += $historyPayment['paymentAmount'];
            }
        }
        return $sum;
    }

    public function countTotalPaymentAmountRubHistory(): int
    {
        $historyPayments = json_decode($this->payment_history, true);
        $sum = 0;
        if ($historyPayments) {
            foreach ($historyPayments as $historyPayment) {
                $sum += $historyPayment['paymentAmountRub'];
            }
        }
        return $sum;
    }

    public function updateTotalPaymentsAmountHistory()
    {
        $this->update([
                'total_payment_history' => $this->countTotalPaymentAmountHistory(),
                'total_payment_history_rub' => $this->countTotalPaymentAmountRubHistory()
        ]);
    }
}
