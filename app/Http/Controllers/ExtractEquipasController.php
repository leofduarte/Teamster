<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Team;

class ExtractEquipasController extends Controller
{
    public function ExtractEquipas(Request $request){
        $teams = Team::with('participants')->get();

        return response()->json($teams);
    }
    
    }