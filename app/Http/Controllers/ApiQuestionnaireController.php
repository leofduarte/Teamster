<?php

namespace App\Http\Controllers;

use App\Services\OpenAIClient;
use Illuminate\Http\Request;


class ApiQuestionnaireController extends Controller
{
    public function ApiCheckbox(Request $request)
    {
        $data = $request->all();

        $openAIClient = new OpenAIClient();
        $response = $openAIClient->generateCheckboxQuestion($data);

        return $response;
    }
    public function ApiRadio(Request $request)
    {
        $data = $request->all();

        $openAIClient = new OpenAIClient();
        $response = $openAIClient->generateRadioQuestion($data);

        return $response;
    }
    public function ApiText(Request $request)
    {
        $data = $request->all();

        $openAIClient = new OpenAIClient();
        $response = $openAIClient->generateTextQuestion($data);

        return $response;
    }
}
