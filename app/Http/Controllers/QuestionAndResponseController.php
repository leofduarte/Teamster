<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\Questionnaire;
use App\Models\Team;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Support\Facades\Validator;

class QuestionAndResponseController
{
    public function getResponse(Request $request)
    {
        $responses = $request->input('responses');
        $participant_id = $request->input('participant_id');

        $validator = Validator::make($request->all(), [
            'responses.*.question_id' => 'required|integer',
            'responses.*.response' => 'required',
            'participant_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        foreach ($responses as $response) {
            Response::create([
                'response' => $response['response'],
                'question_id' => $response['question_id'],
                'participant_id' => $participant_id,
            ]);
        }

        return response()->json(['message' => 'Responses added successfully'], 201);
    }

    public function addQuestion(Request $request)
    {
        $questions = $request->input('items');
        $questionnaire_id = $request->input('questionnaire_id');

        $validator = Validator::make($request->all(), [
            'items.*.type' => 'required|string',
            'items.*.label' => 'required|string',
            'items.*.placeholder' => 'nullable|string',
            'items.*.tooltip' => 'nullable|string',
            'items.*.description' => 'nullable|string',
            'items.*.options' => 'required_if:items.*.type,radio|array', // Add this line
            'questionnaire_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        foreach ($questions as $question) {
            Question::create([
                'type' => $question['type'],
                'label' => $question['label'],
                'placeholder' => $question['placeholder'] ?? null,
                'tooltip' => $question['tooltip'] ?? null,
                'description' => $question['description'] ?? null,
                'options' => isset($question['options']) ? json_encode($question['options']) : null,
                'questionnaire_id' => $questionnaire_id,
            ]);
        }

        return response()->json(['message' => 'Questions added successfully'], 201);
    }

    public function getQuestion(Request $request)
    {
        $questionnaire_id = $request->input('questionnaire_id');

        $validator = Validator::make($request->all(), [
            'questionnaire_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $questions = Question::where('questionnaire_id', $questionnaire_id)->get();

        return response()->json(['questions' => $questions], 200);
    }

    public function addResponse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'responses.*.question_id' => 'required|integer',
            'responses.*.response' => 'required',
            'participant_id' => 'required|integer',
            'questionnaire_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 400);
        }

        $participant = Participant::find($request->input('participant_id'));
        $questionnaire = Questionnaire::find($request->input('questionnaire_id'));

        if (!$participant || !$questionnaire) {
            return response()->json(['message' => 'Participant or Questionnaire not found'], 404);
        }

        // Check if the participant is part of the team that is allowed to answer the questionnaire
        $teamId = $questionnaire->teams()->first()->id;
        if (!$participant->teams()->where('team_id', $teamId)->exists()) {
            return response()->json(['message' => 'You are not part of the team that is allowed to answer this questionnaire'], 403);
        }

        foreach ($request->input('responses') as $response) {

            $existingResponse = Response::where('question_id', $response['question_id'])
                ->where('participant_id', $participant->id)
                ->first();

            if ($existingResponse) {
                return response()->json(['message' => 'You already submitted a response for this questions'], 400);
            }

            Response::create([
                'response' => $response['response'], // This should be the id of the selected option for radio buttons
                'question_id' => $response['question_id'],
                'participant_id' => $participant->id,
            ]);
        }

        return response()->json(['message' => 'Responses added successfully'], 201);
    }

    public function assignQuestionnaire(Request $request)
    {
        $team_id = $request->input('team_id');
        $questionnaire_id = $request->input('questionnaire_id');

        $validator = Validator::make($request->all(), [
            'team_id' => 'required|integer',
            'questionnaire_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $team = Team::find($team_id);
        $questionnaire = Questionnaire::find($questionnaire_id);

        if (!$team || !$questionnaire) {
            return response()->json([
                'message' => 'Team or Questionnaire not found',
            ], 404);
        }

        $team->questionnaires()->attach($questionnaire_id);

        return response()->json(['message' => 'Questionnaire assigned to team successfully'], 201);
    }
}
