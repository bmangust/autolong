<?php

namespace App\Http\Controllers;

use App\Importer;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Resources\ImporterWithRelationshipsResource;

class ImporterController extends Controller
{
    protected function importerCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
            'max' => 'Поле :attribute должно содержать не более :max символов',
        ];

        $names = [
            'nameRu' => 'Имя кириллецей',
            'nameEn' => 'Имя латиницей',
            'phone' => 'телефон',
            'address' => 'адрес',
        ];

        return Validator::make($data, [
            'nameRu' => ['required', 'string', 'max:255'],
            'nameEn' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string'],
            'address' => ['required', 'string', 'max:255'],
        ], $messages, $names);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(ImporterWithRelationshipsResource::collection(Importer::all()), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, Importer $importer)
    {
        $this->importerCreateValidator($request->all())->validate();
        $newImporter = $importer->create($importer->dashesToSnakeCase($request->all()));
        return response()->json(new ImporterWithRelationshipsResource($newImporter), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Importer $importer
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Importer $importer)
    {
        return response()->json(new ImporterWithRelationshipsResource($importer), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Importer $importer
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Importer $importer)
    {
        $this->importerCreateValidator($request->all())->validate();
        $importer->update($importer->dashesToSnakeCase($request->all()));
        return response()->json(new ImporterWithRelationshipsResource($importer), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Importer $importer
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Importer $importer)
    {
        $importer->delete();
        return response()->json([], 204);
    }
}
