<?php

namespace App\Http\Controllers;

use App\Models\Activity;

class PdfController extends Controller
{
    public function generatePdf($activityId)
    {
        $activity = Activity::find($activityId);

        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        $view = view('pdf', ['activities' => [$activity]]);

        $pdf = app('dompdf.wrapper');
        $pdf->loadHTML($view->render());

        return $pdf->download('activity_'.$activityId.'.pdf');
    }
}

