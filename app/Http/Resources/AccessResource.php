<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AccessResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,

            'ordersCreate' => $this->orders_create,
            'ordersUpdate' => $this->orders_update,
            'ordersShowCargo' => $this->orders_show_cargo,
            'ordersDelete' => $this->orders_delete,
            'ordersIndex' => $this->orders_index,

            'containersCreate' => $this->containers_create,
            'containersUpdate' => $this->containers_update,
            'containersShow' => $this->containers_show,
            'containersDelete' => $this->containers_delete,
            'containersIndex' => $this->containers_index,

            'catalogsCreate' => $this->catalogs_create,
            'catalogsUpdate' => $this->catalogs_update,
            'catalogsShow' => $this->catalogs_show,
            'catalogsDelete' => $this->catalogs_delete,
            'catalogsIndex' => $this->catalogs_index,

            'productsCreate' => $this->products_create,
            'productsUpdate' => $this->products_update,
            'productsShow' => $this->products_show,
            'productsDelete' => $this->products_delete,
            'productsIndex' => $this->products_index,

            'providersCreate' => $this->providers_create,
            'providersUpdate' => $this->providers_update,
            'providersShow' => $this->providers_show,
            'providersDelete' => $this->providers_delete,
            'providersIndex' => $this->providers_index,

            'importersCreate' => $this->importers_create,
            'importersUpdate' => $this->importers_update,
            'importersShow' => $this->importers_show,
            'importersDelete' => $this->importers_delete,
            'importersIndex' => $this->importers_index,

            'userRolesCreate' => $this->user_roles_create,
            'userRolesUpdate' => $this->user_roles_update,
            'userRolesShow' => $this->user_roles_show,
            'userRolesDelete' => $this->user_roles_delete,
            'userRolesIndex' => $this->user_roles_index,

            'userCreate' => $this->user_create,
            'userUpdate' => $this->user_update,
            'userShow' => $this->user_show,
            'userDelete' => $this->user_delete,
            'userIndex' => $this->user_index,

            'logsIndex' => $this->logs_index,
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
