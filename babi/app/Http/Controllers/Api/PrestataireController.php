<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Prestataire\StorePrestataireRequest;
use App\Http\Requests\Prestataire\UpdatePrestataireRequest;
use App\Http\Resources\PrestataireResource;
use App\Models\Prestataire;

class PrestataireController extends Controller
{
    public function index()
    {
        $prestataires = Prestataire::with(['categorie', 'services'])->get();
        return PrestataireResource::collection($prestataires);
    }

    public function store(StorePrestataireRequest $request)
    {
        $prestataire = Prestataire::create($request->validated());
        return new PrestataireResource($prestataire->load(['categorie', 'services']));
    }

    public function show(Prestataire $prestataire)
    {
        return new PrestataireResource($prestataire->load(['categorie', 'services']));
    }

    public function update(UpdatePrestataireRequest $request, Prestataire $prestataire)
    {
        $prestataire->update($request->validated());
        return new PrestataireResource($prestataire->load(['categorie', 'services']));
    }

    public function destroy(Prestataire $prestataire)
    {
        $prestataire->delete();
        return response()->json(['message' => 'Prestataire supprimé avec succès']);
    }
}
