<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Succursales extends Model
{
    use HasFactory;
    protected $guarded = [];
    public static function mesAmis($id)
    {
        return  DB::table('amis')->where('accepted', 1)
            ->where('from', $id)
            ->orWhere('to', $id)
            ->get();
    }

    public function scopeMyFriends(Builder $builder , $id){

        return  $builder->from('amis')->where('accepted' , 1)
        ->where('from', $id)
        ->orWhere('to', $id)
        ->get();
    }
    public function scopeWait(Builder $builder , $id){

        return  $builder->from('amis')->where(['accepted' => 0 , 'to' => $id]);
    }

    public function scopeOthers(Builder $builder , $id){
        $mesAmis = $this->mesAmis($id)->pluck('id');
        return $builder->from('succursales')->whereNotIn('id' , $mesAmis);
    }
}
