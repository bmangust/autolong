<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProviderResource extends JsonResource
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
            'name' => $this->name,
            'nameCompany' => $this->name_company,
            'unscrupulous' => $this->unscrupulous,
            'email' => $this->email,
            'website' => $this->website,
            'phone' => $this->phone,
            'wechat' => $this->wechat,
            'country' => $this->country,
            'manufacturer' => $this->manufacturer,
            'beneficiaryName' => $this->beneficiary_name,
            'beneficiaryAddress' => $this->beneficiary_address,
            'beneficiaryAccountName' => $this->beneficiary_account_name,
            'beneficiaryBankAddress' => $this->beneficiary_bank_address,
            'beneficiaryBankName' => $this->beneficiary_bank_name,
            'beneficiaryBankCode' => $this->beneficiary_bank_code,
            'beneficiarySwiftAddress' => $this->beneficiary_swift_address,
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
