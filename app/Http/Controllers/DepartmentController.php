<?php

namespace App\Http\Controllers;

use App\Models\User;

class DepartmentController extends Controller
{
    public function getDepartments(User $user)
    {
        $departments = $user->departments;

        return response()->json($departments);
    }
}
