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

    public function addUpdateQuestion(Request $request)
    {
        $newQuestions = $request->input('items');
        $questionnaire_id = $request->input('questionnaire_id');

        foreach ($newQuestions as &$newQuestion) {
            if ($newQuestion['type'] === 'radio' && isset($newQuestion['options']) && is_string($newQuestion['options'])) {
                $newQuestion['options'] = json_decode($newQuestion['options'], true);
            }
        }
        unset($newQuestion);

        $validator = Validator::make($request->all(), [
            'items.*.type' => 'required|string',
            'items.*.label' => 'required|string',
            'items.*.placeholder' => 'nullable|string',
            'items.*.tooltip' => 'nullable|string',
            'items.*.description' => 'nullable|string',
            'items.*.options' => 'required_if:items.*.type,radio|array',
            'questionnaire_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $existingQuestions = Question::where('questionnaire_id', $questionnaire_id)->get();

        foreach ($existingQuestions as $existingQuestion) {
            $found = false;
            foreach ($newQuestions as $index => $newQuestion) {
                if ($existingQuestion->id == $newQuestion['id']) {
                    $found = true;
                    if ($existingQuestion->isDirty()) {
                        $existingQuestion->update($newQuestion);
                    }
                    unset($newQuestions[$index]);
                    break;
                }
            }
            if (!$found) {
                $existingQuestion->delete();
            }
        }

        foreach ($newQuestions as $newQuestion) {
            Question::create([
                'type' => $newQuestion['type'],
                'label' => $newQuestion['label'],
                'placeholder' => $newQuestion['placeholder'] ?? null,
                'tooltip' => $newQuestion['tooltip'] ?? null,
                'description' => $newQuestion['description'] ?? null,
                'options' => isset($newQuestion['options']) && !empty($newQuestion['options']) ? json_encode($newQuestion['options']) : null,
                'questionnaire_id' => $questionnaire_id,

            ]);
        }

        return response()->json(['message' => 'Questions updated successfully'], 201);
    }

    public function addQuestion(Request $request)
    {
        $questions = $request->input('items');
        $questionnaire_id = $request->input('questionnaire_id');
        $is_mandatory = $request->input('is_mandatory');

        $validator = Validator::make($request->all(), [
            'items.*.type' => 'required|string',
            'items.*.label' => 'required|string',
            'items.*.placeholder' => 'nullable|string',
            'items.*.tooltip' => 'nullable|string',
            'items.*.description' => 'nullable|string',
            'items.*.options' => 'required_if:items.*.type,radio|array',
            'items.*.is_mandatory' => 'required|boolean', // Add this line
            'questionnaire_id' => 'required|integer',
            'is_mandatory' => 'required|boolean',
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
                'options' => isset($question['options']) && !empty($question['options']) ? json_encode($question['options']) : null,
                'questionnaire_id' => $questionnaire_id,
                'is_mandatory' => $question['is_mandatory'], // Add this line
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

        $team = $questionnaire->teams()->first();
        if ($team) {
            $teamId = $team->id;
        } else {
            return response()->json(['message' => 'No teams associated with this questionnaire'], 404);
        }

        foreach ($request->input('responses') as $response) {

            $existingResponse = Response::where('question_id', $response['question_id'])
                ->where('participant_id', $participant->id)
                ->first();

            if ($existingResponse) {
                return response()->json(['message' => 'You already submitted a response for this questions'], 400);
            }

            Response::create([
                'response' => $response['response'],
                'question_id' => $response['question_id'],
                'participant_id' => $participant->id,
            ]);
        }

        return response()->json(['message' => 'Responses added successfully'], 201);
    }


}
