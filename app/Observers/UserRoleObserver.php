<?php

namespace App\Observers;

use App\Http\Resources\UserRoleResource;
use App\Log;
use App\UserRole;

class UserRoleObserver
{
    /**
     * Handle the user role "created" event.
     *
     * @param  \App\UserRole  $userRole
     * @return void
     */
    public function created(UserRole $userRole)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new UserRoleResource($userRole)),
                'model_name' => get_class($userRole)
            ]);
        }
    }

    /**
     * Handle the user role "updated" event.
     *
     * @param  \App\UserRole  $userRole
     * @return void
     */
    public function updated(UserRole $userRole)
    {
        if (Log::$write) {
            $log = new Log();
            $before = $userRole->withoutRelations()->getOriginal();
            $after = $userRole->withoutRelations()->toArray();
            $log->create([
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new UserRoleResource($userRole)),
                'model_name' => get_class($userRole),
                'before' => json_encode(array_diff_assoc($before, $after)),
                'after' => json_encode(array_diff_assoc($after, $before)),
            ]);
        }
    }

    public function deleting(UserRole $userRole)
    {
        $userRole->access()->delete();
    }

    /**
     * Handle the user role "deleted" event.
     *
     * @param  \App\UserRole  $userRole
     * @return void
     */
    public function deleted(UserRole $userRole)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new UserRoleResource($userRole)),
                'model_name' => get_class($userRole)
            ]);
        }
    }

    /**
     * Handle the user role "restored" event.
     *
     * @param  \App\UserRole  $userRole
     * @return void
     */
    public function restored(UserRole $userRole)
    {
        //
    }

    /**
     * Handle the user role "force deleted" event.
     *
     * @param  \App\UserRole  $userRole
     * @return void
     */
    public function forceDeleted(UserRole $userRole)
    {
        //
    }
}
