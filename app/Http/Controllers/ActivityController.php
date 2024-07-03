<?php

namespace App\Http\Controllers;

use App\Models\Activity;
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

        foreach ($participants as $participant) {
            //send email to participant
            dd($planActivity, $activity);


        }

        return Inertia::render('SendInvite', [
            'activity' => $activity,
            'planActivity' => $planActivity
        ]);
    }
}
