<?php

namespace App\Http\Controllers;

use App\Container;
use App\Log;
use App\Status;
use Illuminate\Http\Request;
use App\Http\Resources\ContainerWithRelationshipsResource;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

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
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function index()
    {
        $containers = Container::with([
                'orders.city',
                'orders.container',
                'orders.orderItems.product',
                'city',
                'sandboxFiles'])->orderByDesc('updated_at')->get();
        return response()->json(ContainerWithRelationshipsResource::collection($containers), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Container $container
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, Container $container)
    {
        $this->containerCreateValidator($request->all())->validate();
        $orderIds = $request->input('orders');
        if (empty($orderIds)) {
            throw new HttpException(400, 'Передаваемое значение пустое.');
        }
        if (!$container->checkCargoOrdersById($orderIds)) {
            throw new HttpException(400, 'Заказы в контейнере должны быть с одинаковыми статусами.');
        }

//        Когда появится идентификатор
//        if ($request->has('identifier')) {
//            $containerByIdentifier = Container::getByIdentifier($request->input('identifier'));
//            if ($containerByIdentifier) {
//                $containerByIdentifier->addOrders($orderIds);
//                return response()->json('Данный идентификатор ' . $request->input('identifier') . ' найден у контейнера №' . $containerByIdentifier->id . '. Товары успешно добавлены в данный контейнер.', 201);
//            }
//            $container->identifier = $request->input('orders');
//        }

        $container->name = $request->input('name');
        $container->status = array_keys(get_object_vars(Status::getContainerStatuses()), 'Собирается')[0];
        $container->quantity_order_items = $container->getQuantityOrderItems($orderIds);
        $city = $container->compareOrderCityAndChooseCity($orderIds);
        $container->city_id = $city;
        $container->save();
        Log::$write = false;
        $container->addOrders($orderIds);
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Container $container)
    {
        $request->validate([
                'name' => 'required',
        ]);
        $container->update([
                'name' => $request->input('name'),
                'arrival_date' => $request->input('arrivalDate'),
                'release_date' => $request->input('releaseDate')
        ]);
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

        $containerStatus = head((array)Status::getContainerStatuses()->$status);
        $orderStatuses = (array)Status::getOrderStatuses();
        if (in_array($containerStatus, $orderStatuses)) {
            $orderStatus = head(array_keys($orderStatuses, $containerStatus));
            $container->changeStatusInOrders($orderStatus);
        }
        return response()->json(new ContainerWithRelationshipsResource($container), 200);
    }
}
