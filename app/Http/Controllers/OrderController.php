<?php

namespace App\Http\Controllers;

use App\City;
use App\Container;
use App\ContractDocument;
use App\Http\Resources\ContainerWithRelationshipsResource;
use App\Http\Resources\OrderWithRelationshipsResource;
use App\Http\Resources\ProductResource;
use App\Importer;
use App\Log;
use App\Order;
use App\OrderItem;
use App\Product;
use App\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Connections\Sandbox1c;
use App\Events\OrderEvent;

class OrderController extends Controller
{
    protected function orderCreateValidator(array $data)
    {
        $messages = [
                'required' => 'Поле :attribute обязательно для заполнения.',
                'max' => 'Поле :attribute должно содержать не более :max символов',
        ];

        $names = [
                'name' => 'название',
                'providerId' => 'поставщик',
        ];

        return Validator::make($data, [
                'name' => ['required', 'string', 'max:255'],
                'providerId' => ['required', 'integer'],
        ], $messages, $names);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $orders = Order::with([
                'orderItems.product',
                'provider.country',
                'sandboxFiles',
                'container.orders',
                'city'
        ])->orderByDesc('created_at')->get();
        return response()->json(OrderWithRelationshipsResource::collection($orders), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        
        $this->orderCreateValidator($request->all())->validate();
        $order = new Order();
        $order->name = $request->input('name');
        $order->provider_id = $request->input('providerId');
        if ($request->has('cargo')) {
            $order->cargo = $request->input('cargo');
        }
        $order->status = array_keys(get_object_vars(Status::getOrderStatuses()), 'Создан')[0];
        $order->status_payment = array_keys(get_object_vars(Status::getOrderPaymentStatuses()), 'Ожидает оплаты')[0];
        $order->save();
        if ($request->has('items') && is_array($request->input('items'))) {
            $order->addOrderItems($request->input('items'));
        }
        Log::$write = false;
        $order->updateWeight();
        $order->generateContract();
        $order->generateProforma();
        $order->generateInvoice();

        event(new OrderEvent($order->name, 'create'));

        return response()->json(new OrderWithRelationshipsResource($order), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Order $order
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Order $order)
    {
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Order $order
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
                'city' => 'required',
                'arrivalDate' => 'required',
                'name' => 'required|string|max:255',
                'providerId' => 'required|integer',
        ]);
        $order->name = $request->input('name');
        $order->provider_id = $request->input('providerId');

        if ($order->container_id != $request->input('containerId')) {
            $order->cargo = $request->input('cargo');
            $newContainer = Container::find($request->input('containerId'));
            if ($newContainer) {
                if ($newContainer->checkCargoOrders()) {
                    if ($order->cargo) {
                        $order->container_id = $request->input('containerId');
                    } else {
                        throw new HttpException(400, 'Вы не можете перенести данный заказ в контейнер №' . $newContainer->name . ' состоящий из заказов карго.');
                    }
                } elseif (!$order->cargo) {
                    $order->container_id = $request->input('containerId');
                } else {
                    throw new HttpException(400, 'Вы не можете перенести данный заказ карго в контейнер №' . $newContainer->name . '. Данный контейнер состоит из не карго заказов.');
                }
            } else {
                $order->container_id = $request->input('containerId');
            }
        } else {
            $oldContainer = $order->container;
            if ($oldContainer) {
                $containerIsCargo = $oldContainer->checkCargoOrders();
                if (!$containerIsCargo && $request->input('cargo')) {
                    throw new HttpException(400, 'Вы не можете присвоить статус карго этому заказу в данном контейнере.');
                }
                if ($containerIsCargo && !$request->input('cargo')) {
                    throw new HttpException(400, 'Вы не можете убрать статус карго у этого заказа в данном контейнере.');

                }
            }
            $order->cargo = $request->input('cargo');
        }
        $city = City::firstOrCreate([
                'name' => City::translateUcFirstCyrillicAndOtherLcWhenStingHaveManyWords($request->input('city'))
        ]);
        $order->city_id = $city->id;
        $order->arrival_date = $request->input('arrivalDate');
        $order->save();
        $order->refresh();
        event(new OrderEvent($order->name, 'update'));
        if ($request->has('items') && is_array($request->input('items'))) {
            $order->addOrderItems($request->input('items'));
        }
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([], 204);
    }

    public function changeStatus(Request $request, Order $order)
    {
        $request->validate([
                'status' => 'required',
        ]);
        $status = $request->input('status');
        $statusOrderCreated = array_keys(get_object_vars(Status::getOrderStatuses()), 'Создан')[0];
        $statusOrderConfirmed = array_keys(get_object_vars(Status::getOrderStatuses()), 'Подтвержден')[0];
        if ($status == $statusOrderCreated || $status == $statusOrderConfirmed) {
            $order->setOrderStatus($status);
        } elseif ($request->input('arrivalDate') && $request->input('city')) {
            $city = City::firstOrCreate([
                    'name' => City::translateUcFirstCyrillicAndOtherLcWhenStingHaveManyWords($request->input('city'))
            ]);
            $arrivalDate = $request->input('arrivalDate');
            $order->setOrderStatus($status, $city->id, $arrivalDate);
        } elseif (!is_null($order->city) && !is_null($order->arrival_date)) {
            $order->setOrderStatus($status);
        } else {
            throw new HttpException(400, 'Для данного статуса необходимо указать город и дату.');
        }
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function changeStatusPayment(Request $request, Order $order)
    {
        $request->validate([
                'statusPayment' => 'required',
        ]);
        $status = $request->input('statusPayment');

        $paymentPrepaymentMade = Status::getOrderPaymentPrepaymentMade();
        $paymentPaidInFull = Status::getOrderPaymentPaidInFull();
        $paymentAwaitingRefund = Status::getOrderPaymentAwaitingRefund();
        $paymentRefunded = Status::getOrderPaymentRefunded();

//        if ($request->has('paymentAmount') && $request->has('surchargeAmount')) {
//            if (!is_numeric($request->input('paymentAmount')) && !is_numeric($request->input('surchargeAmount'))) {
//                throw new HttpException(400, 'Переданные данные оплаты не являются числовым типом. Убедитесь, что вы передаете ноль, если вы не хотите вносить информацию об оплате или доплате.');
//            }
//            $paymentAmount = (int)$request->input('paymentAmount');
//            $surchargeAmount = (int)$request->input('surchargeAmount');
//
//            $orderAmount = $order->getOrderSumInCny();
//            $newPaymentAmount = $order->payment_amount + $paymentAmount;
//
//            if ($order->status_payment == $paymentAwaiting || $order->status_payment == $paymentPaidFor) {
//                if ($newPaymentAmount >= $orderAmount) {
//                    $order->setOrderPaymentStatus($paymentPrepaymentMade, $paymentAmount, $surchargeAmount);
//                }
//                if ($newPaymentAmount < $orderAmount) {
//                    $order->setOrderPaymentStatus($paymentPaidFor, $paymentAmount, $surchargeAmount);
//                }
//            }
//            return response()->json(new OrderWithRelationshipsResource($order), 200);
//        }

        switch ($order->status_payment) {
            case $paymentPrepaymentMade:
                if ($status == $paymentAwaitingRefund) {
                    $order->setOrderPaymentStatus($paymentAwaitingRefund);
                } else {
                    $order->setOrderPaymentStatus($paymentPaidInFull);
                }
                break;
            case $paymentAwaitingRefund:
                $order->setOrderPaymentStatus($paymentRefunded);
                break;
            default:
                $order->setOrderPaymentStatus($status);
                break;
        }

        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function addPayment(Request $request, Order $order)
    {
        $request->validate([
                'paymentAmount' => 'required|numeric',
                'paymentType' => 'required'
        ]);
        $paymentAwaiting = Status::getOrderPaymentAwaiting();
        $paymentPrepaymentMade = Status::getOrderPaymentPrepaymentMade();
        $paymentPaidFor = Status::getOrderPaymentPaidFor();

        $paymentAmount = (int)$request->input('paymentAmount');
        $paymentType = $request->input('paymentType');

        $orderAmount = $order->getOrderSumInCny();
        $newPaymentAmount = $order->payment_amount + $paymentAmount;

        if ($order->status_payment == $paymentAwaiting || $order->status_payment == $paymentPaidFor) {
            if ($newPaymentAmount >= $orderAmount) {
                $order->setOrderPaymentStatus($paymentPrepaymentMade, $paymentAmount, $paymentType);
            }
            if ($newPaymentAmount < $orderAmount) {
                $order->setOrderPaymentStatus($paymentPaidFor, $paymentAmount, $paymentType);
            }
        } else {
            $order->setOrderPaymentStatus($order->status_payment, $paymentAmount, $paymentType);
        }

        Log::$write = false;
        $order->updateTotalPaymentsAmountHistory();
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function editPayment(Request $request, Order $order)
    {
        $request->validate([
                'paymentAmount' => 'required|numeric',
                'paymentType' => 'required',
                'id' => 'required',
        ]);
        $paymentAwaiting = Status::getOrderPaymentAwaiting();
        $paymentPrepaymentMade = Status::getOrderPaymentPrepaymentMade();
        $paymentPaidFor = Status::getOrderPaymentPaidFor();

        $paymentAmount = (int)$request->input('paymentAmount');
        $paymentType = $request->input('paymentType');
        $id = $request->input('id');

        $orderAmount = $order->getOrderSumInCny();
        $order->updateBlockInPaymentHistory($id, [
                'paymentAmount' => $paymentAmount,
                'paymentType' => $paymentType
        ]);
        $updatedPaymentAmount = $order->countTotalPaymentAmountHistory(true);

        if ($order->status_payment == $paymentAwaiting || $order->status_payment == $paymentPaidFor) {
            if ($updatedPaymentAmount >= $orderAmount) {
                $order->setOrderPaymentStatus($paymentPrepaymentMade);
            }
            if ($updatedPaymentAmount < $orderAmount) {
                $order->setOrderPaymentStatus($paymentPaidFor);
            }
        }
        Log::$write = false;
        $order->updatePaymentAmount($updatedPaymentAmount);
        $order->updateTotalPaymentsAmountHistory();

        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function deletePayment(Request $request, Order $order)
    {
        $request->validate([
                'id' => 'required',
        ]);
        $id = $request->input('id');
        $order->deleteBlockInPaymentHistory($id);
        $updatedPaymentAmount = $order->countTotalPaymentAmountHistory(true);
        Log::$write = false;
        $order->updatePaymentAmount($updatedPaymentAmount);
        $order->updateTotalPaymentsAmountHistory();
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function setPaymentStatusPaidInfull(Request $request, Order $order)
    {
        $request->validate([
                'isPaidInFull' => 'required'
        ]);
        $isPaidInFull = $request->input('isPaidInFull');
        $paymentPaidInFull = Status::getOrderPaymentPaidInFull();
        $paymentPaidFor = Status::getOrderPaymentPaidFor();

        if ($isPaidInFull) {
            $order->setOrderPaymentStatus($paymentPaidInFull);
        } else {
            $order->setOrderPaymentStatus($paymentPaidFor);
        }
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function checkProductNumberWithUs(Request $request, Order $order)
    {
        $codes = Sandbox1c::getProductsList();
        $codes_result = [];

        foreach($codes as $code => $value) {
	        $codes_result[$value] = $code;
        }

        $request->validate([
                'numbers' => 'required'
        ]);
        $numbers = array_unique($order->cleanSpaceInArrayItems($request->input('numbers')));

        foreach($numbers as $key => $num) {
	    #   $numbers[$key] = $codes_result[$num];
        }

        $unknownProductsKey = 'number';
        $availableAndUnknownProducts = [$unknownProductsKey => []];
        foreach ($numbers as $number) {

            $product = Product::wherePublished(1)->whereAutolongNumber($number);

            if(!$product->exists() && isset($codes_result[$number])) {
                $product = Product::wherePublished(1)->whereAutolongNumber($codes_result[$number]);
            }

            if ($product->exists()) {
                $providerId = $product->first()->provider->id;
                if (array_key_exists($providerId, $availableAndUnknownProducts)) {
                    $availableAndUnknownProducts[$providerId][] = new ProductResource($product->first());
                } else {
                    $availableAndUnknownProducts[$providerId] = array(new ProductResource($product->first()));
                }
            } else {
                $availableAndUnknownProducts[$unknownProductsKey][] = $number;
            }

        }
        return response()->json($availableAndUnknownProducts);
    }

    public function getPdfContract(Order $order)
    {
        if ($order->contract != null) {
            return response()->json($order->contract->getInfo(), 200);
        }
        return response()->json($order->contractActualRows, 200);
    }

    public function generatePdfContract(Request $request, Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;

        if (!is_null($order->contract)) {
            $oldContract = $order->contract->getInfo();
        }

        $stampDirectory = Order::STAMP_DIRECTORY;

        if ($request->hasFile('providerStamp') && $request->file('providerStamp')->isValid()) {
            $request->validate(
                    ['providerStamp' => 'file|mimes:png,jpg,jpeg']
            );
            $providerStamp = $order->saveStamp($stampDirectory, uniqid('stamp-', false), $request->file('providerStamp'));
        } elseif (isset($oldContract->providerStamp)) {
            $providerStamp = $oldContract->providerStamp;
        } else {
            $providerStamp = null;
        }

        if ($request->hasFile('importerStamp') && $request->file('importerStamp')->isValid()) {
            $request->validate(
                    ['importerStamp' => 'file|mimes:png,jpg,jpeg']
            );
            $importerStamp = $order->saveStamp($stampDirectory, uniqid('stamp-', false), $request->file('importerStamp'));
        } elseif (isset($oldContract->importerStamp)) {
            $importerStamp = $oldContract->importerStamp;
        } else {
            $importerStamp = null;
        }

        $signatureDirectory = Order::SIGNATURE_DIRECTORY;

        if ($request->hasFile('importerSignature') && $request->file('importerSignature')->isValid()) {
            $request->validate(
                    ['importerSignature' => 'file|mimes:png,jpg,jpeg']
            );
            $importerSignature = $order->saveStamp($signatureDirectory, uniqid('signature-', false), $request->file('importerSignature'));
        } elseif (isset($oldContract->importerSignature)) {
            $importerSignature = $oldContract->importerSignature;
        } else {
            $importerSignature = null;
        }

        if ($request->hasFile('providerSignature') && $request->file('providerSignature')->isValid()) {
            $request->validate(
                    ['providerSignature' => 'file|mimes:png,jpg,jpeg']
            );
            $providerSignature = $order->saveStamp($signatureDirectory, uniqid('signature-', false), $request->file('providerSignature'));
        } elseif (isset($oldContract->providerSignature)) {
            $providerSignature = $oldContract->providerSignature;
        } else {
            $providerSignature = null;
        }

        if (!$order->contract()->count() || is_null($order->contract->info)) {
            $order->generateContract();
        }
        if (!$order->proforma()->count() || is_null($order->proforma->info)) {
            $order->generateProforma();
        }
        if (!$order->invoice()->count() || is_null($order->invoice->info)) {
            $order->generateInvoice();
        }
        if (!$order->account()->count() || is_null($order->account->info)) {
            $order->generateAccount();
        }

        $all = $request->except([
                'providerStamp',
                'importerStamp',
                'importerSignature',
                'providerSignature'
        ]);
        $all['providerStamp'] = $providerStamp;
        $all['importerStamp'] = $importerStamp;
        $all['importerSignature'] = $importerSignature;
        $all['providerSignature'] = $providerSignature;

        $all = $order->checkActualIfNotThenChangeContract($all);
        if (!is_null($order->contract)) {
            $order->contract->saveInfoWithJson($all);
            $contract = (array)$order->contract->getInfo();
        } else {
            $contract = ContractDocument::whereOrderId($order->id)->first();
            $contract->saveInfoWithJson($all);
        }

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.contract', [
                'importer' => $importer,
                'provider' => $provider,
                'order' => $order,
                'contract' => $contract,
        ]);
        return $newPdf->download();
    }

    public function getPdfProforma(Order $order)
    {
        if ($order->proforma != null) {
            return response()->json($order->proforma->getInfo());
        }
        return response()->json($order->proformaActualRows, 200);
    }

    public function generatePdfProforma(Request $request, Order $order)
    {
        $request->validate([
                '*' => 'max:255',
        ]);
        $importer = Importer::first();
        $provider = $order->provider;

        if (!$order->contract()->count() || is_null($order->contract->info)) {
            $order->generateContract();
        }
        if (!$order->proforma()->count() || is_null($order->proforma->info)) {
            $order->generateProforma();
        }
        if (!$order->invoice()->count() || is_null($order->invoice->info)) {
            $order->generateInvoice();
        }
        if (!$order->account()->count() || is_null($order->account->info)) {
            $order->generateAccount();
        }

        $all = $order->checkActualIfNotThenChangeProforma($request->all());

        $order->proforma->saveInfoWithJson($all);
        $proforma = $order->proforma->getInfo();
        $contract = $order->contract->getInfo();

        $date = $proforma->date ?? null;
        $contractNumber = $proforma->contractNumber ?? null;
        $proformaNumber = $proforma->proformaNumber ?? null;

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.proforma', [
                'order' => $order,
                'supply' => $proforma->supply,
                'proforma' => $proforma,
                'importer' => $importer,
                'provider' => $provider,
                'contractNumber' => $contractNumber,
                'proformaNumber' => $proformaNumber,
                'contract' => $contract->name,
                'orderItems' => $order->orderItems()->with('product')->get(),
                'statusPayment' => $proforma->statusPayment,
                'date' => $date
        ]);
        return $newPdf->download();
    }

    public function getPdfInvoice(Order $order)
    {
        if ($order->invoice != null) {
            return response()->json($order->invoice->getInfo());
        }
        return response()->json($order->invoiceActualRows, 200);
    }

    public function generatePdfInvoice(Request $request, Order $order)
    {
        $request->validate([
                '*' => 'max:255',
        ]);
        $importer = Importer::first();
        $provider = $order->provider;

        if (!$order->contract()->count() || is_null($order->contract->info)) {
            $order->generateContract();
        }
        if (!$order->proforma()->count() || is_null($order->proforma->info)) {
            $order->generateProforma();
        }
        if (!$order->invoice()->count() || is_null($order->invoice->info)) {
            $order->generateInvoice();
        }
        if (!$order->account()->count() || is_null($order->account->info)) {
            $order->generateAccount();
        }

        $all = $order->checkActualIfNotThenChangeInvoice($request->all());

        $order->invoice->saveInfoWithJson($all);
        $invoice = (array)$order->invoice->getInfo();
        $contract = (array)$order->contract->getInfo();

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.invoice', [
                'order' => $order,
                'importer' => $importer,
                'provider' => $provider,
                'orderItems' => $order->orderItems()->with('product')->get(),
                'invoice' => $invoice,
                'contract' => $contract
        ]);
        return $newPdf->download();
    }

    public function generatePdfPackingList(Request $request, Order $order)
    {
        if (!$request->input('old')) {
            $orderItemsInfo = $request->except('old');
            foreach ($orderItemsInfo as $key => $info) {
                $orderItem = OrderItem::findOrFail($key);
                $pcsCtnCtns = array_merge([], ['pcsCtn' => $info['pcsCtn']], ['ctns' => $info['ctns']]);
                $orderItem->pcs_ctn_ctns = json_encode($pcsCtnCtns);
                $orderItem->meas = json_encode($info['meas']);
                $orderItem->save();
            }
        }

        $importer = Importer::first();
        $provider = $order->provider;
        $orderItems = $order->orderItems()->with('product')->get();
        if ($order->contract && isset($order->contract->getInfo()->name)) {
            $contract = $order->contract->getInfo();
            $order->generateNamePackingListIfNull($contract->name);
        } else {
            $contract = '';
        }

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.packing-list', [
                'order' => $order,
                'importer' => $importer,
                'provider' => $provider,
                'orderItems' => $orderItems,
                'contract' => $contract
        ])->setPaper('a4', 'landscape');
        return $newPdf->download();
    }

    public function getMarkingList(Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;
        $hsCodes = $order->getProductsHsCode();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.marking', [
                'order' => $order,
                'importer' => $importer,
                'provider' => $provider,
                'hsCodes' => $hsCodes,
        ]);
        return $newPdf->download();
    }

    public function getPdfAccount(Order $order)
    {
        if ($order->account && $order->account->info) {
            return response()->json($order->account->getInfo());
        }
        return response()->json($order->accountActualRows, 200);
    }

    public function generatePdfAccount(Request $request, Order $order)
    {
        $request->validate([
                '*' => 'max:255',
        ]);
        $importer = Importer::first();
        $provider = $order->provider;

        if (!is_null($order->account)) {
            $oldAccount = $order->account->getInfo();
        }

        $stampDirectory = Order::STAMP_DIRECTORY;

        if ($request->hasFile('importerStamp') && $request->file('importerStamp')->isValid()) {
            $request->validate(
                    ['importerStamp' => 'file|mimes:png,jpg,jpeg']
            );
            $importerStamp = $order->saveStamp($stampDirectory, uniqid('stamp-', false), $request->file('importerStamp'));
        } elseif (isset($oldAccount->importerStamp)) {
            $importerStamp = $oldAccount->importerStamp;
        } else {
            $importerStamp = null;
        }

        $signatureDirectory = Order::SIGNATURE_DIRECTORY;

        if ($request->hasFile('importerSignature') && $request->file('importerSignature')->isValid()) {
            $request->validate(
                    ['importerSignature' => 'file|mimes:png,jpg,jpeg']
            );
            $importerSignature = $order->saveStamp($signatureDirectory, uniqid('signature-', false), $request->file('importerSignature'));
        } elseif (isset($oldAccount->importerSignature)) {
            $importerSignature = $oldAccount->importerSignature;
        } else {
            $importerSignature = null;
        }

        if (!$order->contract()->count() || is_null($order->contract->info)) {
            $order->generateContract();
        }
        if (!$order->proforma()->count() || is_null($order->proforma->info)) {
            $order->generateProforma();
        }
        if (!$order->invoice()->count() || is_null($order->invoice->info)) {
            $order->generateInvoice();
        }
        if (!$order->account()->count() || is_null($order->account->info)) {
            $order->generateAccount();
        }

        $all = $request->except([
                'importerSignature',
                'importerStamp'
        ]);
        $all['importerSignature'] = $importerSignature;
        $all['importerStamp'] = $importerStamp;

        $all = $order->checkActualIfNotThenChangeAccount($all);

        $order->account->saveInfoWithJson($all);
        $account = $order->account->getInfo();
        $contract = $order->contract->getInfo();

        $date = $account->date ?? null;
        $contractNumber = $account->contractNumber ?? null;
        $accountNumber = $account->accountNumber ?? null;

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.account', [
                'account' => $account,
                'order' => $order,
                'supply' => $account->supply,
                'importer' => $importer,
                'provider' => $provider,
                'contractNumber' => $contractNumber,
                'accountNumber' => $accountNumber,
                'contract' => $contract->name,
                'orderItems' => $order->orderItems()->with('product')->get(),
                'statusPayment' => $account->statusPayment,
                'date' => $date
        ]);
        return $newPdf->download();
    }

    public function deletePdfContractProviderStamp(Order $order)
    {
        $order->deletePdfFilesStampsOrSignatures('providerStamp', 'contract');
        return response()->json([], 204);
    }

    public function deletePdfContractImporterStamp(Order $order)
    {
        $order->deletePdfFilesStampsOrSignatures('importerStamp', 'contract');
        return response()->json([], 204);
    }

    public function deletePdfContractImporterSignature(Order $order)
    {
        $order->deletePdfFilesStampsOrSignatures('importerSignature', 'contract');
        return response()->json([], 204);
    }

    public function deletePdfContractProviderSignature(Order $order)
    {
        $order->deletePdfFilesStampsOrSignatures('providerSignature', 'contract');
        return response()->json([], 204);
    }

    public function deletePdfAccountImporterSignature(Order $order)
    {
        $order->deletePdfFilesStampsOrSignatures('importerSignature', 'account');
        return response()->json([], 204);
    }

    public function deletePdfAccountImporterStamp(Order $order)
    {
        $order->deletePdfFilesStampsOrSignatures('importerStamp', 'account');
        return response()->json([], 204);
    }

    public function indexUnapplied()
    {
        $unappliedOrders = Order::all()->where('container_id', '=', null)
                ->where('status', '!=', array_keys(get_object_vars(Status::getOrderStatuses()), 'Создан')[0])
                ->sortByDesc('updated_at');
        return response()->json(OrderWithRelationshipsResource::collection($unappliedOrders), 200);
    }

    public function checkBaikalStatus(Request $request, Order $order)
    {
        $request->validate([
                'baikalId' => 'required'
        ]);
        $baikalLink = Order::getBaikalLink($request->input('baikalId'));
        $parsingInfo = Order::parseBaikalLinkById($baikalLink);
        $approximateDate = Order::parseApproximateDate($baikalLink);
        $order->update([
                'baikal_tracker_link' => $baikalLink,
                'baikal_tracker_history' => $parsingInfo
        ]);

        if ($approximateDate) {
            $order->updateArrivalDateInContainer($approximateDate);
        }
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function deleteBaikalStatus(Order $order)
    {
        $order->update([
                'baikal_tracker_link' => null,
                'baikal_tracker_history' => null
        ]);
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function setPrices(Request $request, Order $order)
    {
        $request->validate([
                'deliveryPrice' => 'numeric',
                'refusalAmount' => 'numeric',
                'paymentHistory' => 'array',
                'customsAmount' => 'numeric',
                'orderingAmount' => 'numeric',
        ]);
        $newRequest = $order->cleanSpaceInArrayItems($request->except('paymentHistory'), true);

        Log::$write = false;
        $newTotalPaymentHistoryRub = 0;
        foreach ($request->input('paymentHistory') as $value) {
            if (isset($value['id'], $value['paymentAmountRub'])) {
                $order->updateBlockInPaymentHistory($value['id'], [
                        'paymentAmountRub' => $value['paymentAmountRub']
                ]);
                $newTotalPaymentHistoryRub += $value['paymentAmountRub'];
            }
        }
        Log::$write = true;

        $order->update([
                'refusal_amount' => $newRequest['refusalAmount'],
                'customs_amount' => $newRequest['customsAmount'],
                'ordering_amount' => $newRequest['orderingAmount'],
                'total_payment_history_rub' => $newTotalPaymentHistoryRub
        ]);

        $container = $order->container;
        if ($order->container->delivery_price != $newRequest['deliveryPrice']) {
            $container->update([
                    'delivery_price' => $newRequest['deliveryPrice']
            ]);
        }
        return response()->json(new ContainerWithRelationshipsResource($container), 200);
    }
}
