<?php

use App\Models\Produit;
use App\Models\Succursales;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('succursales_produits', function (Blueprint $table) {
            $table->id();
            $table->integer('prix');
            $table->integer('prix_gros')->nullable();
            $table->integer('quantite');
            $table->Text('description')->nullable();
            $table->foreignIdFor(Succursales::class)->constrained();
            $table->foreignIdFor(Produit::class)->constrained();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
