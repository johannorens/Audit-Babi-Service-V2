<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Categorie\StoreCategorieRequest;
use App\Http\Requests\Categorie\UpdateCategorieRequest;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::with('services')->get();
        return CategorieResource::collection($categories);
    }

    public function store(StoreCategorieRequest $request)
    {
        $categorie = Categorie::create($request->validated());
        return new CategorieResource($categorie);
    }

    public function show(Categorie $categorie)
    {
        return new CategorieResource($categorie->load('services'));
    }

    public function update(UpdateCategorieRequest $request, Categorie $categorie)
    {
        $categorie->update($request->validated());
        return new CategorieResource($categorie);
    }

    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return response()->json(['message' => 'Catégorie supprimée avec succès']);
    }
}
