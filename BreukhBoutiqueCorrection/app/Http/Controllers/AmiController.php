<?php

namespace App\Http\Controllers;

use App\Models\Ami;
use App\Http\Requests\StoreAmiRequest;
use App\Http\Requests\UpdateAmiRequest;
use App\Models\Succursales;

class AmiController extends Controller
{
    public function listeSuccursalesFriends($id){
        return Succursales::mesAmis($id);
    }
    public function listeSuccursalesOthers($id){
           return Succursales::others($id)->get();
    }
    public function listeSuccursalesWait($id){
           return Succursales::Wait($id)->get();
    }
}
