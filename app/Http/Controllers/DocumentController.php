<?php

namespace App\Http\Controllers;

use App\Document;

class DocumentController extends Controller
{
    public function destroy(Document $document)
    {
        $document->deleteFile();
        $document->delete();
        return response()->json([], 204);
    }
}
