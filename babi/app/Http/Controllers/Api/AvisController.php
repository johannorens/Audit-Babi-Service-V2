<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Avis\StoreAvisRequest;
use App\Http\Requests\Avis\UpdateAvisRequest;
use App\Http\Resources\AvisResource;
use App\Models\Avis;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    public function index()
    {
        $avis = Avis::with(['utilisateur', 'reservation.service'])->get();
        return AvisResource::collection($avis);
    }

    public function store(StoreAvisRequest $request)
    {
        $avis = Avis::create($request->validated() + [
            'id_utilisateur' => $request->user()->id_utilisateur,
        ]);

        return new AvisResource($avis->load(['utilisateur', 'reservation.service']));
    }

    public function show(Avis $avis)
    {
        return new AvisResource($avis->load(['utilisateur', 'reservation.service']));
    }

    public function update(UpdateAvisRequest $request, Avis $avis)
    {
        $avis->update($request->validated());
        return new AvisResource($avis->load(['utilisateur', 'reservation.service']));
    }

    public function destroy(Avis $avis)
    {
        $avis->delete();
        return response()->json(['message' => 'Avis supprimé avec succès']);
    }

    public function signaler(Request $request, $id)
    {
        $request->validate([
            'motif' => 'required|string|max:255',
        ]);

        $avis = Avis::findOrFail($id);
        $avis->update([
            'signale' => true,
            'motif_signalement' => $request->input('motif'),
            'signale_par' => $request->user()->id_utilisateur,
        ]);

        return new AvisResource($avis->load(['utilisateur', 'reservation.service']));
    }

    public function parService($idService)
    {
        $avis = Avis::with(['utilisateur', 'reservation.service'])
            ->whereHas('reservation', fn ($q) => $q->where('id_service', $idService))
            ->where('signale', false)
            ->get();

        return AvisResource::collection($avis);
    }
}
