<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StoreReservationRequest;
use App\Http\Requests\Reservation\UpdateReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with(['utilisateur', 'service', 'avis']);

        if ($request->user()->role !== 'admin') {
            $query->where('id_utilisateur', $request->user()->id_utilisateur);
        }

        return ReservationResource::collection($query->get());
    }

    public function store(StoreReservationRequest $request)
    {
        $reservation = Reservation::create([
            ...$request->validated(),
            'id_utilisateur' => $request->user()->id_utilisateur,
        ]);

        return new ReservationResource($reservation->load(['utilisateur', 'service']));
    }

    public function show(Request $request, Reservation $reservation)
    {
        $this->authorizeOwnerOrAdmin($request, $reservation);

        return new ReservationResource($reservation->load(['utilisateur', 'service', 'avis']));
    }

    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        $this->authorizeOwnerOrAdmin($request, $reservation);

        $reservation->update($request->validated());
        return new ReservationResource($reservation->load(['utilisateur', 'service']));
    }

    public function destroy(Request $request, Reservation $reservation)
    {
        $this->authorizeOwnerOrAdmin($request, $reservation);

        $reservation->delete();
        return response()->json(['message' => 'Réservation supprimée avec succès']);
    }

    private function authorizeOwnerOrAdmin(Request $request, Reservation $reservation): void
    {
        if ($request->user()->role !== 'admin'
            && $reservation->id_utilisateur !== $request->user()->id_utilisateur) {
            abort(403, "Vous n'êtes pas autorisé à accéder à cette réservation.");
        }
    }
}
