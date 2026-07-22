<?php

namespace App\Http\Requests\Prestataire;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePrestataireRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom'          => 'required|string|max:100',
            'prenom'       => 'required|string|max:100',
            'email'        => 'required|email|unique:prestataires',
            'telephone'    => 'nullable|string|max:20',
            'localisation' => 'nullable|string|max:255',
            'id_categorie' => 'required|exists:categories,id_categorie',
        ];
    }
}
