<?php

namespace App\Http\Controllers;

use App\Mail\ActivityInvite;
use App\Models\Activity;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function show($id)
    {
        $activity = Activity::find($id);
        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        return Inertia::render('Activity', [
            'activity' => $activity
        ]);
    }

    public function deleteActivity($id)
    {
        $activity = Activity::find($id);
        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        $activity->delete();

        return response()->json(['message' => 'Activity deleted successfully']);
    }


    public function redoActivity($activity_id)
    {
        $activity = Activity::find($activity_id);
        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        $planActivity = $activity->planActivity;
        if (!$planActivity) {
            return response()->json(['message' => 'PlanActivity not found'], 404);
        }

    //    dd($planActivity);

        return Inertia::render('Plan_activity', [
            'activity' => $activity,
            'planActivity' => $planActivity
        ]);
    }

    public function sendInvite($activity_id)
    {
        $activity = Activity::find($activity_id);
        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }
        $planActivity = $activity->planActivity;
        if (!$planActivity) {
            return response()->json(['message' => 'PlanActivity not found'], 404);
        }

        $participants = $activity->planActivity->team->participants;
        $errors = [];

        foreach ($participants as $participant) {
            try {
                Mail::to($participant->email)->send(new ActivityInvite($activity));
            } catch (\Exception $e) {
                // Store the error message for later use
                $errors[] = 'Failed to send invite to ' . $participant->email . ': ' . $e->getMessage();
            }
        }

        return Inertia::render('SendInvite', [
            'activity' => $activity,
            'planActivity' => $planActivity,
            'errors' => $errors
        ]);
    }
}
