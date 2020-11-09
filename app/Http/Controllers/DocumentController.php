<?php

namespace App\Http\Controllers;

use App\Document;
use App\Http\Resources\DocumentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function update(Request $request, Document $document)
    {
        $request->validate([
            'name' => 'required|string|min:1|max:255',
            'description' => 'required'
        ]);
        $name = $request->input('name');
        $description = $request->input('description');
        $newName = $document->getNewFileName($name);
        $newPath = str_replace($document->name, $newName, $document->file);
        if (!Storage::disk('main')->exists($newPath)) {
            Storage::disk('main')->rename($document->file, $newPath);
            $document->update(['name' => $newName, 'description' => $description, 'file' => $newPath]);
            return response()->json(new DocumentResource($document), 200);
        }
        return response()->json('Такое имя уже существует', 404);
    }
}
