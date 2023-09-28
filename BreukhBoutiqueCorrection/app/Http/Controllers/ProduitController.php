<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Http\Resources\ProduitResource;
use App\Models\Succursales;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ProduitController extends Controller
{
    public function search(string $id, string $code)
    {


        $limit = request()->query('limit');

        $produit = Produit::where("code", $code)->first();
        if (!$produit) {
            return response(["message" => "code introuvable"], Response::HTTP_NOT_FOUND);
        }
        $hisProduit = DB::table('succursales_produits')->where(['succursales_id' => $id, "produit_id" => $produit->id])->where('quantite', '>', 0)->first();
        if (!$hisProduit) {
            $ids = Succursales::myFriends($id)->map(function ($a) {
                return $a->id;
            });

            // $produit = Produit::with(['succursales' => function ($q) use ($ids, $limit) {
            //     $q->whereIn('succursale_id', $ids)->where('quantite', ">", 0)->orderBy('prix_gros', "asc")
            //         ->when($limit, fn ($q) => $q->limit($limit));
            // }, 'caracteristiques'])->where('code', $code)->first();

            $produit = Produit::quantitePositive($ids,$limit , $code)->first();
            return ProduitResource::make($produit);
        }
        $produit = Produit::with(['succursales' => function ($q) use ($id) {
            $q->where('succursales_id', $id);
        }, 'caracteristiques'])->where('code', $code)->first();
        return ProduitResource::make($produit);
    }




    // public function store(StoreProduitRequest $request){
    //     $produit = Produit::create([
    //         "libelle"=>$request->libelle,
    //         "code"=>$request->code,
    //         "photo"=>$request->photo,
    //         "marque_id"=>$request->marque_id,
    //         "categorie_id"=>$request->categorie_id,
    //     ]);

    //     $produit_succursales =  DB::table("succursales_produits")->insert([
    //         "prix_gros"=>$request->prix - 1000,
    //         "prix"=>$request->prix,
    //         "quantite"=>$request->quantite,
    //         "produit_id"=>$produit->id,
    //         "succursales_id"=>$request->succursales_id,
    //    ]);


    //     $caracteristiques = $request->produit_caracteristiques;
    //     $caracteristiqueWithProduit = [];

    //     if ($caracteristiques !== null) {
    //         foreach ($caracteristiques as $caracteristique) {
    //             $caracteristique_id = $caracteristique['caracteristique_id'];
    //             $valeur = $caracteristique['valeur'];
    //             $unite = $caracteristique['unite'];
    //             $caracteristiqueWithProduit[$caracteristique_id] = ['valeur' => $valeur,'unite' => $unite];
    //         }

    //         $produit->caracteristiques()->attach($caracteristiqueWithProduit);
    //     }

    //     $response = [
    //         "produit" => $produit,
    //         "produit_succursales" => $produit_succursales,
    //         "caracteristiques" => $caracteristiques
    //     ];

    //     return response()->json($response);

    // }

    public function store(StoreProduitRequest $request)
    {
        $succursaleId = $request->succursales_id;
        $caracteristiques = $request->produit_caracteristiques;

        // Recherche d'un produit existant avec les mêmes caractéristiques dans la succursale
        $existingProduit = Produit::whereHas('succursales', function ($query) use ($succursaleId) {
            $query->where('succursales_id', $succursaleId);
        })->where('libelle', $request->libelle)->first();


        if ($existingProduit) {
            // Le produit existe déjà, mise à jour de la quantité
            $existingSuccursaleProduit = DB::table('succursales_produits')
                ->where('produit_id', $existingProduit->id)
                ->where('succursales_id', $succursaleId)
                ->where('prix_gros',$existingProduit->prix_gros)
                ->first();

            if ($existingSuccursaleProduit) {
                DB::table('succursales_produits')
                    ->where('id', $existingSuccursaleProduit->id)
                    ->increment('quantite', $request->quantite);
            } else {
                // Le produit existe dans une autre succursale, créer une nouvelle entrée dans la succursale actuelle
                DB::table('succursales_produits')->insert([
                    "prix_gros" => $request->prix - 1000,
                    "prix" => $request->prix,
                    "quantite" => $request->quantite,
                    "produit_id" => $existingProduit->id,
                    "succursales_id" => $succursaleId,
                ]);
            }

            $response = [
                "produit" => $existingProduit,
                "produit_succursales" => $existingSuccursaleProduit,
                "caracteristiques" => $caracteristiques
            ];
        } else {
            // Le produit n'existe pas, création d'un nouveau produit
            $produit = Produit::create([
                "libelle" => $request->libelle,
                "code" => $request->code,
                "photo" => $request->photo,
                "marque_id" => $request->marque_id,
                "categorie_id" => $request->categorie_id,
            ]);

            $produitSuccursale = DB::table('succursales_produits')->insert([
                "prix_gros" => $request->prix - 1000,
                "prix" => $request->prix,
                "quantite" => $request->quantite,
                "produit_id" => $produit->id,
                "succursales_id" => $request->succursales_id,
            ]);

            $response = [
                "produit" => $produit,
                "produit_succursales" => $produitSuccursale,
                "caracteristiques" => $caracteristiques
            ];
        }

        return response()->json($response);
    }
}
