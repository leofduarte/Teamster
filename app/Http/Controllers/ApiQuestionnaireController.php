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
}
