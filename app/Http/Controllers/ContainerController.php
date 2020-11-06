<?php

namespace App\Http\Controllers;

use App\Container;
use App\Document;
use App\Http\Resources\DocumentResource;
use Illuminate\Http\Request;
use App\Http\Resources\ContainerResource;
use Illuminate\Support\Facades\Validator;

class ContainerController extends Controller
{
    protected function containerCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
            'max' => 'Поле :attribute должно содержать не более :max символов',
        ];

        $names = [
            'name' => 'название контейнера',
            'status' => 'статус',
            'city' => 'город',
        ];

        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
        ], $messages, $names);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(ContainerResource::collection(Container::all())->sortByDesc('updated_at'), 200);
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
        $newContainer = $container->create($container->dashesToSnakeCase($request->all()));
        return response()->json(new ContainerResource($newContainer), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Container $container
     * @return void
     */
    public function show(Container $container)
    {
        return response()->json(new ContainerResource($container), 200);
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
        $this->containerCreateValidator($request->all())->validate();
        $container->update($container->dashesToSnakeCase($request->all()));
        return response()->json(new ContainerResource($container), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Container $container
     * @return \Illuminate\Http\Response
     */
    public function destroy(Container $container)
    {
        foreach ($container->documents as $document) {
            $document->delete();
        }
        $container->delete();
        return response()->json([], 204);
    }

    public function saveFile(Request $request, Container $container, Document $document)
    {
        $request->validate([
            'file' => 'required'
        ]);
        $file = $request->file('file');
        $path = Container::SANDBOX_DIRECTORY . $container->id;
        $newDocument = $document->putFileInFolder($file, $path);
        $document->containers()->sync($container->id);
        return response()->json(new DocumentResource($newDocument), 200);
    }
}
