<?php

namespace App\Http\Requests\Reservation;

use App\Models\Reservation;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpdateReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date_reservation'  => 'sometimes|date',
            'heure_reservation' => 'sometimes|date_format:H:i',
            'statut'            => 'sometimes|in:en_attente,confirmee,annulee,terminee',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if (!$this->hasAny(['date_reservation', 'heure_reservation'])) {
                return;
            }

            $reservation = $this->route('reservation');
            if (!$reservation) {
                return;
            }

            $creneauPris = Reservation::where('id_service', $reservation->id_service)
                ->where('date_reservation', $this->input('date_reservation', $reservation->date_reservation))
                ->where('heure_reservation', $this->input('heure_reservation', $reservation->heure_reservation))
                ->where('id_reservation', '!=', $reservation->id_reservation)
                ->whereNotIn('statut', ['annulee'])
                ->exists();

            if ($creneauPris) {
                $validator->errors()->add('id_service', "Ce créneau n'est plus disponible pour ce service.");
            }
        });
    }
}
