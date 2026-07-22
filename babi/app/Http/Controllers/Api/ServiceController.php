<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\StoreServiceRequest;
use App\Http\Requests\Service\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('categorie')->get();
        return ServiceResource::collection($services);
    }
    public function store(StoreServiceRequest $request)
    {
        $service = Service::create($request->validated());
        return new ServiceResource($service);
    }
    public function show(Service $service)
    {
        return new ServiceResource($service->load('categorie'));
    }
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $service->update($request->validated());
        return new ServiceResource($service);
    }
    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['message' => 'Service supprimé avec succès']);
    }
}
