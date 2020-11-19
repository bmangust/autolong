<?php

namespace App\Http\Controllers;

use App\Container;
use App\Importer;
use App\Log;
use App\Order;
use App\OrderItem;
use App\Status;
use Illuminate\Http\Request;
use App\Http\Resources\ContainerWithRelationshipsResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Validator;

class ContainerController extends Controller
{
    protected function containerCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
        ];

        $names = [
            'orders' => 'заказы',
        ];

        return Validator::make($data, [
            'orders' => ['required'],
        ], $messages, $names);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(ContainerWithRelationshipsResource::collection(Container::all()->sortByDesc('updated_at'), 200));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Container $container
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Container $container)
    {
        $this->containerCreateValidator($request->all())->validate();
        $container->name = $request->input('name');
        $container->status = array_keys(get_object_vars(Status::getContainerStatuses()), 'Собирается')[0];
        $orderIds = $request->input('orders');
        $container->quantity_order_items = $container->getQuantityOrderItems($orderIds);
        $city = $container->compareOrderCityAndChooseCity($orderIds);
        $container->city_id = $city;
        $container->save();
        $container->addOrders($orderIds);
        Log::$write = false;
        $container->name = $container->id;
        $container->save();
        return response()->json(new ContainerWithRelationshipsResource($container), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Container $container
     * @return void
     */
    public function show(Container $container)
    {
        return response()->json(new ContainerWithRelationshipsResource($container), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Container $container
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Container $container)
    {
        $container->update($container->dashesToSnakeCase($request->all()));
        return response()->json(new ContainerWithRelationshipsResource($container), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Container $container
     * @return \Illuminate\Http\Response
     */
    public function destroy(Container $container)
    {
        $container->delete();
        return response()->json([], 204);
    }

    public function changeStatus(Request $request, Container $container)
    {
        $request->validate([
            'status' => 'required'
        ]);
        $status = $request->input('status');
        $container->setContainerStatus($status);

        $containerStatus = head((array) Status::getContainerStatuses()->$status);
        $orderStatuses = (array) Status::getOrderStatuses();
        if (in_array($containerStatus, $orderStatuses)) {
            $orderStatus = head(array_keys($orderStatuses, $containerStatus));
            $container->changeStatusInOrders($orderStatus);
        }
        return response()->json(new ContainerWithRelationshipsResource($container), 200);
    }

    public function generatePdfPackingList(Request $request, Order $order)
    {
        $orderItemsInfo = $request->all();
        foreach ($orderItemsInfo as $key => $info) {
            $orderItem = OrderItem::findOrFail($key);
            $orderItem->pcs_ctn_ctns = json_encode($info['PcsCtnCtns']);
            $orderItem->meas = json_encode($info['meas']);
            $orderItem->save();
        }

        $importer = Importer::first();
        $provider = $order->provider;
        $orderItems = $order->orderItems;
        if ($order->contract) {
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
        ]);
        return $newPdf->download();
    }

    public function getMarkingList(Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;
        $hsCodes = $order->getProductsHsCode();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.packing-list', [
            'order' => $order,
            'importer' => $importer,
            'provider' => $provider,
            'hsCodes' => $hsCodes,
        ]);
        return $newPdf->download();
    }
}
