<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\Request;
use App\Http\Resources\CatalogWithRelationshipsResource;
use Illuminate\Support\Facades\Validator;
use App\Catalog;

class CatalogController extends Controller
{
    protected function catalogCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
            'max' => 'Поле :attribute должно содержать не более :max символов',
        ];

        $names = [
            'name' => 'название контейнера',
            'file' => 'файл',
            'providerId' => 'поставщик'
        ];
        if (isset($data['file']) && !is_string($data['file'])) {
            return Validator::make($data, [
                'name' => ['required', 'string', 'max:255'],
                'file' => ['mimes:pdf,xlsx,zip'],
                'providerId' => ['required']
            ], $messages, $names);
        }

        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'providerId' => ['required']
        ], $messages, $names);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(CatalogWithRelationshipsResource::collection(Catalog::all()->sortByDesc('updated_at'), 200));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Catalog $catalog
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Catalog $catalog)
    {
        $this->catalogCreateValidator($request->all())->validate();
        $newCatalog = $catalog->create($catalog->dashesToSnakeCase($request->all()));
        Log::$write = false;
        if (is_string($request->input('tags'))) {
            $tags = json_decode($request->input('tags'));
        } else {
            $tags = $request->input('tags');
        }
        $newCatalog->checkAndAddTag($tags);
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $newCatalog->createOrUpdateFile($request->file('file'));
        }
        return response()->json(new CatalogWithRelationshipsResource($newCatalog), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Catalog $catalog
     * @return \Illuminate\Http\Response
     */
    public function show(Catalog $catalog)
    {
        return response()->json(new CatalogWithRelationshipsResource($catalog), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Catalog $catalog
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Catalog $catalog)
    {
        $this->catalogCreateValidator($request->all())->validate();
        $catalog->update($catalog->dashesToSnakeCase($request->all()));
        if (is_string($request->input('tags'))) {
            $tags = json_decode($request->input('tags'));
        } else {
            $tags = $request->input('tags');
        }
        $catalog->checkAndAddTag($tags);
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $catalog->createOrUpdateFile($request->file('file'));
        }
        return response()->json(new CatalogWithRelationshipsResource($catalog), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Catalog $catalog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Catalog $catalog)
    {
        Log::$write = false;
        $catalog->deleteFile();
        Log::$write = true;
        $catalog->delete();
        return response()->json([], 204);
    }

    public function addFile(Request $request, Catalog $catalog)
    {
        $request->validate([
            'file' => 'required|mimes:pdf,xlsx,zip'
        ]);
        if ($request->file('file')->isValid()) {
            $catalog->createOrUpdateFile($request->file('file'));
        }
        return response()->json($catalog->file, 200);
    }
}
