<?php

namespace App\Policies;

use App\Importer;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ImporterPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        $userRole = $user->role;
        return $userRole->access->importers_index == true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Importer  $importer
     * @return mixed
     */
    public function view(User $user, Importer $importer)
    {
        $userRole = $user->role;
        return $userRole->access->importers_index == true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        $userRole = $user->role;
        return $userRole->access->importers_create == true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Importer  $importer
     * @return mixed
     */
    public function update(User $user, Importer $importer)
    {
        $userRole = $user->role;
        return $userRole->access->importers_update == true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Importer  $importer
     * @return mixed
     */
    public function delete(User $user, Importer $importer)
    {
        $userRole = $user->role;
        return $userRole->access->importers_delete == true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Importer  $importer
     * @return mixed
     */
    public function restore(User $user, Importer $importer)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Importer  $importer
     * @return mixed
     */
    public function forceDelete(User $user, Importer $importer)
    {
        //
    }
}
