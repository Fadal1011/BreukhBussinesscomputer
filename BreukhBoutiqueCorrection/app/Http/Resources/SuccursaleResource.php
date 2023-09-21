<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SuccursaleResource extends JsonResource
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
            "nom"=>$this->nom,
            "adresse"=>$this->adresse,
            "telephone"=>$this->telephone,
            "prix"=>$this->pivot->prix,
            "prix_gros"=>$this->pivot->prix_gros,
            "quantite"=>$this->pivot->quantite,
            "succursale_produit_id"=>$this->id,


        ];
    }
}
