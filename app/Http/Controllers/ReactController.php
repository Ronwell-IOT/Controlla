<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReactController extends Controller
{
    public function show () {
        return view('adminpanel');
    }

}
