<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date_reservation' => $this->date_reservation,
            'heure_reservation' => $this->heure_reservation,
            'statut' => $this->statut,
            'montant_total' => $this->montant_total,
            'utilisateur' => new UtilisateurResource($this->whenLoaded('utilisateur')),
            'service' => new ServiceResource($this->whenLoaded('service')),
            'avis' => new AvisResource($this->whenLoaded('avis')),
        ];
    }
}
