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
     * @param \App\Document $document
     * @return void
     */
    public function created(Document $document)
    {
        //
    }

    /**
     * Handle the document "updated" event.
     *
     * @param \App\Document $document
     * @return void
     */
    public function updated(Document $document)
    {
        //
    }

    /**
     * Handle the document "deleted" event.
     *
     * @param \App\Document $document
     * @return void
     */
    public function deleted(Document $document)
    {
        $document->deleteFile();
    }

    /**
     * Handle the document "restored" event.
     *
     * @param \App\Document $document
     * @return void
     */
    public function restored(Document $document)
    {
        //
    }

    /**
     * Handle the document "force deleted" event.
     *
     * @param \App\Document $document
     * @return void
     */
    public function forceDeleted(Document $document)
    {
        //
    }
}
