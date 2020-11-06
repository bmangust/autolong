<?php

namespace App\Observers;

use App\Document;
use Illuminate\Database\Eloquent\Concerns\HasEvents;

class DocumentObserver
{
    use HasEvents;
    /**
     * Handle the document "created" event.
     *
     * @param  \App\Document  $document
     * @return void
     */
    public function created(Document $document)
    {
        //
    }

    /**
     * Handle the document "updated" event.
     *
     * @param  \App\Document  $document
     * @return void
     */
    public function updated(Document $document)
    {
        //
    }

    /**
     * Handle the document "deleted" event.
     *
     * @param  \App\Document  $document
     * @return void
     */
    public function deleted(Document $document)
    {
        switch ($document) {
            case $document->catalogs()->exists():
                $document->deleteFile();
                $document->catalogs()->detach();
                break;
            case $document->containers()->exists():
                $document->deleteFile();
                $document->containers()->detach();
                break;
            case $document->importers()->exists():
                $document->deleteFile();
                $document->importers()->detach();
                break;
            case $document->orders()->exists():
                $document->deleteFile();
                $document->orders()->detach();
                break;
            case $document->products()->exists():
                $document->deleteFile();
                $document->products()->detach();
                break;
            case $document->providers()->exists():
                $document->deleteFile();
                $document->providers()->detach();
                break;
        }
    }

    /**
     * Handle the document "restored" event.
     *
     * @param  \App\Document  $document
     * @return void
     */
    public function restored(Document $document)
    {
        //
    }

    /**
     * Handle the document "force deleted" event.
     *
     * @param  \App\Document  $document
     * @return void
     */
    public function forceDeleted(Document $document)
    {
        //
    }
}
