<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlanActivity;
use App\Models\Activity;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class PlanActivityController extends Controller
{
    public function SavePlanActivity(Request $request)
    {
        $request->validate([
            'team_id' => 'sometimes',
            'nome' => 'required',
            'dia' => 'required',
            'duracao' => 'required',
            'localizacao' => 'required',
            'objetivos' => 'required|array',
            'observacoes' => 'sometimes',
            'orcamento' => 'required|array', // Assuming this is meant to be 'price' and should not be an array
            'numParticipantes' => 'required', // This might need to be handled differently since there's no direct column for it
        ]);

        $planActivity = new PlanActivity;
        $planActivity->team_id = $request->has('team_id') ? $request->team_id : null;
        $planActivity->name = $request->nome;
        $planActivity->duration = $request->duracao;

        $date = new \DateTime($request->dia);
        $planActivity->date = $date->format('Y-m-d'); // Format to MySQL datetime format

        $planActivity->location = $request->localizacao;
        // Assuming 'objetivos' is JSON or a serialized array, and 'observacoes' is a text field
        $planActivity->objectives = json_encode($request->objetivos);
        $planActivity->observations = $request->observacoes ?? null; // Optional field

        $orcamentoArray = $request->orcamento;
        $planActivity->price = is_array($orcamentoArray) && !empty($orcamentoArray) ? $orcamentoArray[0] : null;

        if (!is_string($planActivity->objectives)) {
            return response()->json(['error' => 'Objectives encoding failed.'], 422);
        }


        // Note: 'numParticipantes' does not have a direct column, you might need to handle it differently
        // For example, storing it in a related table or as part of 'observations' or 'objectives'
        if (!is_string($planActivity->objectives)) {
            return response()->json(['error' => 'Objectives encoding failed.'], 422);
        }

        $planActivity->save();

        return response()->json([
            'message' => 'Plan Activity Created Successfully',
            'data' => $planActivity
        ]);
    }

    public function getPlanActivities()
    {
        $planActivities = PlanActivity::all();
        return response()->json($planActivities);
    }

    public function saveActivity(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'novaAtividade.0' => 'required', // Assuming this is the name of the activity
            'novaAtividade.1' => 'required', // Assuming this is the description of the activity
            'novaAtividade.2' => 'required', // Assuming this is the activities details
            'novaAtividade.3' => 'required', // Assuming this is the schedule of the activity
            'novaAtividade.4' => 'required', // Assuming this is the planner tasks
            'novaAtividade.5' => 'required', // Assuming this is the participant tasks
            'planatividadeid' => 'required|integer', // Assuming this is the plan_activity_id
        ]);

        // Check if the validation fails
        if ($validator->fails()) {
            // Return validation error response
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $validator->errors()->toArray()
            ], 422); // 422 Unprocessable Entity status code
        }

        // If validation passes, proceed to save the activity
        $activity = new Activity;
        $activity->plan_activity_id = $request->input('planatividadeid');
        $activity->name = $request->input('novaAtividade.0'); // Assuming this is the name
        $activity->description = $request->input('novaAtividade.1'); // Assuming this is the description
        $activity->activities = $request->input('novaAtividade.2'); // Assuming this is the activities details
        $activity->schedule = $request->input('novaAtividade.3'); // Assuming this is the schedule
        $activity->planner_tasks = $request->input('novaAtividade.4'); // Assuming this is the planner tasks
        $activity->participant_tasks = $request->input('novaAtividade.5'); // Assuming this is the participant tasks

        $activity->save();

        // Return success response with the saved activity data
        return response()->json([
            'message' => 'Activity Created Successfully',
            'data' => $activity
        ], 201);
    }

    public function getActivities()
    {
        $activities = Activity::orderBy('created_at', 'desc')->get();
        return response()->json($activities);
    }
}
