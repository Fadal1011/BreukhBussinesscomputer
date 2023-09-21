<?php

namespace App\Http\Controllers;

use App\Models\Succursales;
use App\Http\Requests\StoreSuccursalesRequest;
use App\Http\Requests\UpdateSuccursalesRequest;

class SuccursalesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSuccursalesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSuccursalesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Succursales  $succursales
     * @return \Illuminate\Http\Response
     */
    public function show(Succursales $succursales)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Succursales  $succursales
     * @return \Illuminate\Http\Response
     */
    public function edit(Succursales $succursales)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSuccursalesRequest  $request
     * @param  \App\Models\Succursales  $succursales
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSuccursalesRequest $request, Succursales $succursales)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Succursales  $succursales
     * @return \Illuminate\Http\Response
     */
    public function destroy(Succursales $succursales)
    {
        //
    }
}
