<?php

use App\Models\Caracteristique;
use App\Models\Produit;
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
        Schema::create('produit_caracteristiques', function (Blueprint $table) {
            $table->id();
            $table->string('valeur');
            $table->Text('description')->nullable();
            $table->foreignIdFor(Produit::class)->constrained();
            $table->foreignIdFor(Caracteristique::class)->constrained();
            $table->timestamps();
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
