<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Team;
use Illuminate\Http\Request;
use App\Models\Questionnaire;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class QuestionnaireController extends Controller
{

    public function addQuestionnaire(Request $request)
    {
        $questionnaire = new Questionnaire();
        $questionnaire->user_id = $request->input('userId');
        $questionnaire->title = $request->input('title');
        $questionnaire->description = $request->input('description');

        $questionnaire->save();

        //add as 3 obrigatórias
        $mandatoryQuestions = Question::where('is_mandatory', 1)->where('questionnaire_id', 1)->get();

        foreach ($mandatoryQuestions as $mandatoryQuestion) {
            $question = new Question();
            $question->questionnaire_id = $questionnaire->id;
            $question->label = $mandatoryQuestion->label;
            $question->options = $mandatoryQuestion->options;
            $question->type = $mandatoryQuestion->type;
            $question->is_mandatory = $mandatoryQuestion->is_mandatory;
            $question->save();
        }
        /*$question = new Question();
        $question->questionnaire_id = $questionnaire->id;
        $question->label = 'Como te sentes em relação a atividades físicas e desporto?';*/

        $questionnaire_id = $questionnaire->id;
        return response()->json([
            'questionnaire_id' => $questionnaire_id,
            'message' => 'Questionnaire added successfully!'
        ]);
    }

    public function getQuestionnaires(Request $request)
    {
        $userId = $request->input('userId');
        $questionnaires = Questionnaire::where('user_id', $userId)->get();
        return response()->json($questionnaires);
    }

    public function deleteQuestionnaire($id)
    {
        $questionnaire = Questionnaire::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$questionnaire) {
            return response()->json([
                'message' => 'No questionnaire found with the provided id and user_id' . ' ' . $id . ' ' . auth()->id()
            ], 404);
        }
        $questionnaire->questions()->delete();

        $questionnaire->delete();

        return response()->json([
            'message' => 'Questionnaire and associated questions deleted successfully!'
        ]);
    }


    public function show($id)
    {
        $questionnaire = Questionnaire::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $questions = Question::where('questionnaire_id', $id)->get();

        foreach ($questions as $question) {
            $question->options = json_decode($question->options);
        }

        return Inertia::render('EditQuestionnaire', ['questionnaire' => $questionnaire, 'questions' => $questions]);
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
