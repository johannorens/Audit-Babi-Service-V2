<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_service' => $this->id_service,
            'nom_service' => $this->nom_service,
            'description' => $this->description,
            'tarif' => $this->tarif,
            'photo' => $this->photo_path ? asset($this->photo_path) : null,
            'disponibilite' => $this->disponibilite,
            'id_categorie' => $this->id_categorie,
            'id_prestataire' => $this->id_prestataire,
            'categorie' => new CategorieResource($this->whenLoaded('categorie')),
            'prestataire' => new PrestataireResource($this->whenLoaded('prestataire')),
        ];
    }
}
