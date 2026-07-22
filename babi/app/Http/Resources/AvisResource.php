<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AvisResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_avis' => $this->id_avis,
            'note' => $this->note,
            'commentaire' => $this->commentaire,
            'date_avis' => $this->date_avis,
            'signale' => $this->signale,
            'motif_signalement' => $this->motif_signalement,
            'utilisateur' => new UtilisateurResource($this->whenLoaded('utilisateur')),
            'reservation' => new ReservationResource($this->whenLoaded('reservation')),
        ];
    }
}
