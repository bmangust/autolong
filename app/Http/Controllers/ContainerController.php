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
        $container->name = $request->input('name');
        $container->status = array_keys(get_object_vars(Status::getContainerStatuses()), 'Создан')[0];
        $orderIds = $request->input('orders');
        $container->quantity_order_items = $container->getQuantityOrderItems($orderIds);
        $container->save();
        $container->addOrders($orderIds);
        Log::$write = false;
        $container->name = $container->id;
        $this->save();
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
