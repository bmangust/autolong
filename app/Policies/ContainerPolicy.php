<?php

namespace App\Policies;

use App\Container;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContainerPolicy
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
        return $userRole->access->containers_index == true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Container  $container
     * @return mixed
     */
    public function view(User $user, Container $container)
    {
        $userRole = $user->role;
        return $userRole->access->containers_index == true;
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
        return $userRole->access->containers_create == true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Container  $container
     * @return mixed
     */
    public function update(User $user, Container $container)
    {
        $userRole = $user->role;
        return $userRole->access->containers_update == true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Container  $container
     * @return mixed
     */
    public function delete(User $user, Container $container)
    {
        $userRole = $user->role;
        return $userRole->access->containers_delete == true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Container  $container
     * @return mixed
     */
    public function restore(User $user, Container $container)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Container  $container
     * @return mixed
     */
    public function forceDelete(User $user, Container $container)
    {
        //
    }
}
