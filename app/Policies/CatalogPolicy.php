<?php

namespace App\Policies;

use App\Catalog;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CatalogPolicy
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
        return $userRole->access->catalogs_index == true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Catalog  $catalog
     * @return mixed
     */
    public function view(User $user, Catalog $catalog)
    {
        $userRole = $user->role;
        return $userRole->access->catalogs_index == true;
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
        return $userRole->access->catalogs_create == true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Catalog  $catalog
     * @return mixed
     */
    public function update(User $user, Catalog $catalog)
    {
        $userRole = $user->role;
        return $userRole->access->catalogs_update == true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Catalog  $catalog
     * @return mixed
     */
    public function delete(User $user, Catalog $catalog)
    {
        $userRole = $user->role;
        return $userRole->access->catalogs_delete == true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Catalog  $catalog
     * @return mixed
     */
    public function restore(User $user, Catalog $catalog)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Catalog  $catalog
     * @return mixed
     */
    public function forceDelete(User $user, Catalog $catalog)
    {
        //
    }
}
