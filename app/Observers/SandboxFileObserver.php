<?php

namespace App\Observers;

use App\SandboxFile;

class SandboxFileObserver
{
    /**
     * Handle the sandbox file "created" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function created(SandboxFile $sandboxFile)
    {
        //
    }

    /**
     * Handle the sandbox file "updated" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function updated(SandboxFile $sandboxFile)
    {
        //
    }

    /**
     * Handle the sandbox file "deleted" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function deleted(SandboxFile $sandboxFile)
    {
        $sandboxFile->deleteFile();
    }

    /**
     * Handle the sandbox file "restored" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function restored(SandboxFile $sandboxFile)
    {
        //
    }

    /**
     * Handle the sandbox file "force deleted" event.
     *
     * @param \App\SandboxFile $sandboxFile
     * @return void
     */
    public function forceDeleted(SandboxFile $sandboxFile)
    {
        //
    }
}
