<?php

namespace App\Http\Controllers;

use App\Container;
use App\Log;
use App\Status;
use Illuminate\Http\Request;
use App\Http\Resources\ContainerWithRelationshipsResource;
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
        return response()->json(ContainerWithRelationshipsResource::collection(Container::all())->sortByDesc('updated_at'), 200);
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
        $container->city = $container->compareOrderCityAndChooseCity($orderIds);
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
}
