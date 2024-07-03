<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\User;

class DepartmentController extends Controller
{
    public function getDepartments(User $user)
    {
        $departments = $user->departments;

        return response()->json($departments);
    }

    public function addDepartment(Request $request, User $user)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Create a new department
        $department = new Department;
        $department->name = $request->name;
        $department->save();

        // Attach the department to the user
        $user->departments()->attach($department->id);

        return response()->json($department);
    }
}
