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
                'containersDelete' => $this->containers_delete,
                'containersIndex' => $this->containers_index,

                'catalogsCreate' => $this->catalogs_create,
                'catalogsUpdate' => $this->catalogs_update,
                'catalogsDelete' => $this->catalogs_delete,
                'catalogsIndex' => $this->catalogs_index,

                'productsCreate' => $this->products_create,
                'productsUpdate' => $this->products_update,
                'productsDelete' => $this->products_delete,
                'productsIndex' => $this->products_index,
                'productsNewIndex' => $this->products_new_index,

                'providersCreate' => $this->providers_create,
                'providersUpdate' => $this->providers_update,
                'providersDelete' => $this->providers_delete,
                'providersIndex' => $this->providers_index,

                'importersCreate' => $this->importers_create,
                'importersUpdate' => $this->importers_update,
                'importersDelete' => $this->importers_delete,
                'importersIndex' => $this->importers_index,

                'userRolesCreate' => $this->user_roles_create,
                'userRolesUpdate' => $this->user_roles_update,
                'userRolesDelete' => $this->user_roles_delete,
                'userRolesIndex' => $this->user_roles_index,

                'userCreate' => $this->user_create,
                'userUpdate' => $this->user_update,
                'userDelete' => $this->user_delete,
                'userIndex' => $this->user_index,

                'logsIndex' => $this->logs_index,
                'settingsIndex' => $this->settings_index,
                'compareIndex' => $this->compare_index,

                'createdAt' => strtotime($this->created_at),
                'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
