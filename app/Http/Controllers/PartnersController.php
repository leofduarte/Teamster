<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partners;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class PartnersController extends Controller
{
    public function SavePartners(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'url' => 'sometimes|url',
            'description' => 'sometimes',
            'location' => 'sometimes',
        ]);

        $partners = new Partners;
        $partners->name = $request->name;
        $partners->url = $request->url;
        $partners->description = $request->description;
        $partners->location = $request->location;

        $partners->save();

        return response()->json([
            'message' => 'Partner Created Successfully',
            'data' => $partners
        ]);
    }

    public function getPartners()
    {
        $partners = Partners::all();

        return response()->json([
            'data' => $partners
        ]);
    }

    public function editPartners(Request $request, $id)
    {
        $partners = Partners::find($id);

        if (!$partners) {
            return response()->json([
                'message' => 'Partner not found'
            ], 404);
        }

        $partners->name = $request->name;
        $partners->url = $request->url;
        $partners->description = $request->description;
        $partners->location = $request->location;

        $partners->save();

        return response()->json([
            'message' => 'Partner Updated Successfully',
            'data' => $partners
        ]);
    }

    public function deletePartners($id)
    {
        $partners = Partners::find($id);

        if (!$partners) {
            return response()->json([
                'message' => 'Partner not found'
            ], 404);
        }

        $partners->delete();

        return response()->json([
            'message' => 'Partner Deleted Successfully'
        ]);
    }

}
