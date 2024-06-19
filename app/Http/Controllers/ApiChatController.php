<?php

namespace App\Http\Controllers;

use App\Services\OpenAIClient;
use Illuminate\Http\Request;


class ApiChatController extends Controller
{
    public function ChatActivityPlanning(Request $request)
    {
        $data = $request->all();

        $openAIClient = new OpenAIClient();
        $response = $openAIClient->generateText($data);


        return $response;
    }


}
