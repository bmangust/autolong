<?php

namespace App\Observers;

use App\SandboxFile;
use Illuminate\Database\Eloquent\Concerns\HasEvents;

class SandboxFileObserver
{
    use HasEvents;

    /**
     * Handle the document "created" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function created(SandboxFile $sandboxFile)
    {
        //
    }

    /**
     * Handle the document "updated" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function updated(SandboxFile $sandboxFile)
    {
        //
    }

    /**
     * Handle the document "deleted" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function deleted(SandboxFile $sandboxFile)
    {
        $sandboxFile->deleteFile();
    }

    /**
     * Handle the document "restored" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function restored(SandboxFile $sandboxFile)
    {
        //
    }

    /**
     * Handle the document "force deleted" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function forceDeleted(SandboxFile $sandboxFile)
    {
        //
    }
}
