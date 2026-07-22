<?php

namespace App\Http\Requests\Prestataire;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePrestataireRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom'          => 'sometimes|string|max:100',
            'prenom'       => 'sometimes|string|max:100',
            'email'        => 'sometimes|email|unique:prestataires,email,' . $this->route('prestataire')->id_prestataire . ',id_prestataire',
            'telephone'    => 'nullable|string|max:20',
            'localisation' => 'nullable|string|max:255',
            'id_categorie' => 'sometimes|exists:categories,id_categorie',
        ];
    }
}
