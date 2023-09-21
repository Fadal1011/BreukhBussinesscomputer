<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Caracteristique;
use App\Models\Produit;
use App\Models\Succursales;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Succursales::factory(10)->create();
        Caracteristique::factory(10)->create([
            "valeurs"=>"toto,tutu,titi,tata"
        ]);
        $tab =["toto","tutu","titi","tata","tete"];
        Produit::factory(1000)->create()->each(function($pr) use($tab) {
            DB::table('produit_caracteristiques')->insert([
                "produit_id"=>$pr->id,
                "caracteristique_id"=> random_int(1,10),
                "valeur"=>$tab[random_int(0,4)]
            ]);
        });
        for($i=1 ;$i<10; $i++)
        {
            $n=random_int(100,200);
            for($j=1 ;$j<$n; $j++){
                $prix=random_int(1500,5000);

                DB::table('succursales_produits')->insert([
                    "succursales_id"=>$i,
                    "produit_id"=>$j,
                    "prix"=>$prix,
                    "prix_gros"=>$prix-random_int(500,1500),
                    "quantite"=>random_int(0,10)
                ]);
            }


        }
    }
}
