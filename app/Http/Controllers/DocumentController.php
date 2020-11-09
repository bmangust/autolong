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
            'file' => 'required|file',
            'name' => 'required|string|min:1|max:255',
        ]);
        $file = $request->file('file');
        if (!$file->isValid()) {
            return response()->json('Ошибка загружаемого файла', 400);
        }

        $path = $model::SANDBOX_DIRECTORY . $model->id;
        $name = $document->getClearName($request->input('name')) . '.' . $file->getClientOriginalExtension();
        if ($document->checkFileInFolder($document->getPathWithParentDirectory($path . '/' . $name))) {
            return response()->json('Файл с таким именем существует', 400);
        }

        $description = $request->input('description');
        $newPath = $document->putFileInFolder($file, $path, $name);
        $newDocument = $model->documents()->create([
            'file' => $newPath,
            'name' => $name,
            'description' => $description
        ]);
        return response()->json(new DocumentResource($newDocument), 200);
    }

    public function update(Request $request, Document $document)
    {
        $request->validate([
            'name' => 'required|string|min:1|max:255',
        ]);
        $name = $document->getClearName($request->input('name'));
        $description = $request->input('description');
        $newName = $document->getNewFileName($name);
        $newPath = str_replace($document->name, $newName, $document->file);
        if ($document->checkFileInFolder($newPath)) {
            return response()->json('Файл с таким именем существует', 400);
        }
        Storage::disk('main')->rename($document->file, $newPath);
        $document->update(['file' => $newPath, 'name' => $newName, 'description' => $description]);
        return response()->json(new DocumentResource($document), 200);
    }
}
