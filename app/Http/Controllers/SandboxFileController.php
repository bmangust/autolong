<?php

namespace App\Http\Controllers;

use App\SandboxFile;
use App\Http\Resources\SandboxFileResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SandboxFileController extends Controller
{
    public function destroy(SandboxFile $sandboxFile)
    {
        $sandboxFile->delete();
        return response()->json([], 204);
    }

    public function saveFile(Request $request, $model, SandboxFile $sandboxFile)
    {
        if ($request->input('check')) {
            $request->validate([
                'file' => 'required|file',
            ]);
        } else {
            $request->validate([
                'file' => 'required|file',
                'name' => 'required|string|min:1|max:255',
            ]);
        }
        $file = $request->file('file');
        if (!$file->isValid()) {
            throw new HttpException( 400, 'Ошибка загружаемого файла');
        }

        if ($request->input('check')) {
            $path = $model::CHECK_DIRECTORY . $model->id;
            $name = uniqid('check-', false) . '.' .$file->getClientOriginalExtension();
            $description = 'Чек об оплате';
        } else {
            $path = $model::SANDBOX_DIRECTORY . $model->id;
            $name = $sandboxFile->getClearName($request->input('name')) . '.' . $file->getClientOriginalExtension();
            if ($sandboxFile->checkFileInFolder($sandboxFile->getPathWithParentDirectory($path . '/' . $name))) {
                throw new HttpException( 400, 'Файл с таким именем существует');
            }
            $description = $request->input('description');
        }
        $newPath = $sandboxFile->putFileInFolder($file, $path, $name);
        $newDocument = $model->sandboxFiles()->create([
            'file' => $newPath,
            'name' => $name,
            'description' => $description
        ]);
        return response()->json(new SandboxFileResource($newDocument), 200);
    }

    public function update(Request $request, SandboxFile $sandboxFile)
    {
        $request->validate([
            'name' => 'required|string|min:1|max:255',
        ]);
        $name = $sandboxFile->getClearName($request->input('name'));
        $description = $request->input('description');
        $newName = $sandboxFile->getNewFileName($name);
        if ($sandboxFile->name != $newName) {
            $newPath = str_replace($sandboxFile->name, $newName, $sandboxFile->file);
            if ($sandboxFile->checkFileInFolder($newPath)) {
                return response()->json('Файл с таким именем существует', 400);
            }
            Storage::disk('main')->rename($sandboxFile->file, $newPath);
            $sandboxFile->update(['file' => $newPath, 'name' => $newName, 'description' => $description]);
        } else {
            $sandboxFile->update(['description' => $description]);
        }
        return response()->json(new SandboxFileResource($sandboxFile), 200);
    }
}
