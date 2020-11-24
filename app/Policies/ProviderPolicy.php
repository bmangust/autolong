<?php

namespace App\Policies;

use App\Provider;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProviderPolicy
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
        return $userRole->access->providers_index == true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Provider  $provider
     * @return mixed
     */
    public function view(User $user, Provider $provider)
    {
        $userRole = $user->role;
        return $userRole->access->providers_index == true;
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
        return $userRole->access->providers_create == true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Provider  $provider
     * @return mixed
     */
    public function update(User $user, Provider $provider)
    {
        $userRole = $user->role;
        return $userRole->access->providers_update == true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Provider  $provider
     * @return mixed
     */
    public function delete(User $user, Provider $provider)
    {
        $userRole = $user->role;
        return $userRole->access->providers_delete == true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Provider  $provider
     * @return mixed
     */
    public function restore(User $user, Provider $provider)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Provider  $provider
     * @return mixed
     */
    public function forceDelete(User $user, Provider $provider)
    {
        //
    }
}
