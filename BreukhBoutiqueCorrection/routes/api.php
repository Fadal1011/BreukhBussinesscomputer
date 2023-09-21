<?php

use App\Http\Controllers\AmiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\ProduitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/succursales/{id}/search/{code}', [ProduitController::class, 'search']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    // Route::get('/succursales/{id}/search/{code}', [ProduitController::class, 'search']);

    Route::controller(AmiController::class)->prefix('/succursales/{id}/')->group(function () {
        Route::get('friends',  'listeSuccursalesFriends');
        Route::get('others',  'listeSuccursalesOthers');
        Route::get('wait',  'listeSuccursalesWait');
    });
});
Route::post('commande',[CommandeController::class,'store']);
