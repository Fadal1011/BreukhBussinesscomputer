<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProduitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id"=>$this->id,
            "libelle"=>$this->libelle,
            "code"=>$this->code,
            "succursales"=>SuccursaleResource::collection($this->succursales),
            "caracteristiques" =>CaracteristiqueResource::collection($this->caracteristiques)
        ];
    }
}
