<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produit extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded = [];

    public function succursales():BelongsToMany{
        return $this->belongsToMany(Succursales::class,'succursales_produits')->withPivot('quantite','prix','prix_gros');
    }
    public function caracteristiques():BelongsToMany{
        return $this->belongsToMany(Caracteristique::class,'produit_caracteristiques')->withPivot('valeur','description');
    }

    public function scopeQuantitePositive(Builder $builder , $ids , $limit , $code):Builder {
       return  $builder->with(['succursales' => function ($q) use ($ids, $limit) {
            $q->whereIn('succursales_id', $ids)->where('quantite', ">", 0)->orderBy('prix_gros', "asc")
                ->when($limit, fn ($q) => $q->limit($limit));
        }, 'caracteristiques'])->where('code', $code);
    }
}
