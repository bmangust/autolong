<?php

namespace App\Http\Controllers;

use App\Document;
use App\Http\Resources\DocumentResource;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function destroy(Document $document)
    {
        $document->delete();
        return response()->json([], 204);
    }

    public function saveFile(Request $request, $model, Document $document)
    {
        $request->validate([
            'file' => 'required'
        ]);
        $file = $request->file('file');
        $path = $model::SANDBOX_DIRECTORY . $model->id;
        $name = $document->getUniqueFileName($file);
        $newPath = $document->putFileInFolder($file, $path, $name);
        $newDocument = $model->documents()->create([
            'file' => $newPath,
            'name' => $name
        ]);
        return response()->json(new DocumentResource($newDocument), 200);
    }
}
